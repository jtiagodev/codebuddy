import _ from "lodash";
import { writeBoardToFireBase, boardsRef } from "./firebase";

export const runCameraRecognition = () => {
  var arrayOfOldCodes = []; // IDs only

  // register a callback function with the TopCode library
  window.TopCodes.setVideoFrameCallback("video-canvas", function(jsonString) {
    let writeToDatabase = false;

    // convert the JSON string to an object
    var json = JSON.parse(jsonString);
    // get the list of topcodes from the JSON object
    var topcodes = json.topcodes;

    //////////////////////////////////////// TIA CODE START /////////////////////
    /////////////////////////////////////////////////////////////////////////////
    // console.log(topcodes);

    if (topcodes.length === 0) {
      arrayOfOldCodes = []; // resets to none
      console.log("NOTHING FOUND");
    } else {
      // TOGGLE WRITE TO DATABASE
      if (
        _.find(topcodes, function(topcode) {
          return topcode.code === 557;
        })
      ) {
        writeToDatabase = true;
      }

      var arrayOfNewCodes = [];
      _.forEach(topcodes, function(code) {
        arrayOfNewCodes.push(code.code);
      });

      var differenceArray = _.difference(arrayOfNewCodes, arrayOfOldCodes);
      _.forEach(differenceArray, function(newCode) {
        // console.log(newCode);
      });

      if (differenceArray.length > 0) {
        runComputation(topcodes, writeToDatabase);
      }

      // TIA: Updates array with new value read
      arrayOfOldCodes = arrayOfNewCodes;
    }

    // obtain a drawing context from the <canvas>
    var ctx = document.querySelector("#video-canvas").getContext("2d");
    // draw a circle over the top of each TopCode
    ctx.fillStyle = "rgba(123, 239, 178, 0.5)"; // very translucent red
    for (let i = 0; i < topcodes.length; i++) {
      ctx.beginPath();
      ctx.arc(
        topcodes[i].x,
        topcodes[i].y,
        topcodes[i].radius,
        0,
        Math.PI * 2,
        true
      );
      ctx.fill();
    }
  });
};

// 6             (6,6)
// /\ . . . . . .
//  |. . . . . .
//  |. . . . . .
//  |. . . . . .
//  |. . . . . .
// (1,1) ------ > 6
function runComputation(arrayTopCodes, writeToDatabase) {
  var cancelExecution = false;

  var codeDictionary = {
    // BOARD CONFIGURATION
    31: { description: "Top Left Boundary" },
    47: { description: "Top Right Boundary" },
    55: { description: "Bottom Left Boundary" },
    59: { description: "Bottom Right Boundary" },
    61: { description: "Wall" },
    79: { description: "Door" },
    87: { description: "Water" },
    // GAME MODES
    91: { description: "Start" },
    93: { description: "Goal" },
    103: { description: "Points" },
    107: { description: "Path" },
    // MOVEMENTS
    109: { description: "Move" },
    115: { description: "Swim" },
    117: { description: "Open" },
    121: { description: "Turn Left" },
    143: { description: "Turn Right" },
    151: { description: "Turn Back" },
    // ACTIONS
    155: { description: "Repeat" },
    157: { description: "Stop" },
    171: { description: "If" },
    173: { description: "Then" },
    179: { description: "Else" },
    // ENCAPSULATED FUNCTIONS
    181: { description: "If Wall Found Then Turn Left" },
    185: { description: "If Wall Found Then Turn Right" },
    199: { description: "If Water Found Then Swim" },
    203: { description: "If Door Found Then Open" },
    // RESULT FEEDBACK
    205: { description: "Success" },
    211: { description: "Failure" },
    // DASH ROBOT SPECIFIC
    213: { description: "Rotate 360º" },
    217: { description: "Voice Interesting" },
    // NUMBERS
    341: { description: "One Time" },
    345: { description: "Two Times" },
    355: { description: "Three Times" },
    357: { description: "Four Times" },
    361: { description: "Five Times" }
  };

  // CAVEAT reversed X axis markers
  var topLeftCode = 31;
  var topRightCode = 47;
  var bottomLeftCode = 55;
  var bottomRightCode = 59;
  var gridConfigurationSize = 6; // 6x6

  function extractVertixTopCodesRef(arrayTopCodes) {
    var indexForTopLeftCode = _.findIndex(arrayTopCodes, function(topcode) {
      return topcode.code == topLeftCode;
    });
    var indexForTopRightCode = _.findIndex(arrayTopCodes, function(topcode) {
      return topcode.code == topRightCode;
    });
    var indexForBottomLeftCode = _.findIndex(arrayTopCodes, function(topcode) {
      return topcode.code == bottomLeftCode;
    });
    var indexForBottomRightCode = _.findIndex(arrayTopCodes, function(topcode) {
      return topcode.code == bottomRightCode;
    });

    if (
      indexForTopLeftCode === -1 ||
      indexForTopRightCode === -1 ||
      indexForBottomLeftCode === -1 ||
      indexForBottomRightCode === -1
    ) {
      cancelExecution = true;
    }

    return {
      topLeftCodeRef: arrayTopCodes[indexForTopLeftCode],
      topRightCodeRef: arrayTopCodes[indexForTopRightCode],
      bottomLeftCodeRef: arrayTopCodes[indexForBottomLeftCode],
      bottomRightCodeRef: arrayTopCodes[indexForBottomRightCode]
    };
  }

  function calculatePositionOfObject(
    avgSpaceBetweenBoardCells,
    offSetX,
    offSetY,
    topCodeObject
  ) {
    var xCoordinate = (offSetX - topCodeObject.x) / avgSpaceBetweenBoardCells;
    var yCoordinate = (offSetY - topCodeObject.y) / avgSpaceBetweenBoardCells;

    return {
      x: convertCalculatedCoordinateToRoundNumber(xCoordinate) + 1,
      y: convertCalculatedCoordinateToRoundNumber(yCoordinate) + 1
    };
  }

  function calculateXandYOffset(codeRef) {
    return {
      x: (codeRef.topLeftCodeRef.x + codeRef.bottomLeftCodeRef.x) / 2,
      y: (codeRef.bottomLeftCodeRef.y + codeRef.bottomRightCodeRef.y) / 2
    };
  }

  function calculateAvgDistance(arrayTopCodes) {
    var distanceBetweenEdges = {
      topLeftAndTopRight: codeRef.topLeftCodeRef.x - codeRef.topRightCodeRef.x,
      topRightBottomRight:
        codeRef.bottomRightCodeRef.y - codeRef.topRightCodeRef.y,
      bottomRightBottomLeft:
        codeRef.bottomLeftCodeRef.x - codeRef.bottomRightCodeRef.x,
      bottomLeftTopLeft: codeRef.bottomLeftCodeRef.y - codeRef.topLeftCodeRef.y
    };

    return (
      (distanceBetweenEdges.topLeftAndTopRight +
        distanceBetweenEdges.topRightBottomRight +
        distanceBetweenEdges.bottomRightBottomLeft +
        distanceBetweenEdges.bottomLeftTopLeft) /
      ((gridConfigurationSize - 1) * 4)
    );
  }

  // Vertices
  var codeRef = extractVertixTopCodesRef(arrayTopCodes);
  if (cancelExecution) {
    return -1;
  }
  // Helper Values for Caluclating Positions
  var offSets = calculateXandYOffset(codeRef); // equivalents to (0,0)
  var avgSpaceBetweenBoardCells = calculateAvgDistance(arrayTopCodes);
  // Calculation

  function identifyPiecesPresentOnBoard() {
    var identifiedPiecesOnBoard = [];

    _.forEach(arrayTopCodes, function(topCode, i) {
      var positions = calculatePositionOfObject(
        avgSpaceBetweenBoardCells,
        offSets.x,
        offSets.y,
        topCode
      );
      identifiedPiecesOnBoard.push(positions);
      identifiedPiecesOnBoard[identifiedPiecesOnBoard.length - 1].code =
        topCode.code;
      identifiedPiecesOnBoard[
        identifiedPiecesOnBoard.length - 1
      ].type = translateCodeIntoType(topCode.code, codeDictionary);
    });
    return identifiedPiecesOnBoard;
  }

  function translateCodeIntoType(codeNumber, codeDictionary = codeDictionary) {
    if (codeDictionary[codeNumber]) {
      return codeDictionary[codeNumber].description;
    } else {
      return "Code Unknown";
    }
  }

  function convertCalculatedCoordinateToRoundNumber(coordinateCalculated) {
    return Math.round(coordinateCalculated);
  }

  function convertCodeDescriptionIntoASCII(codeDescription) {
    switch (codeDescription) {
      case "Wall": // wall
        return "x";
        break;
      case "Water":
        return "S";
        break;
      case "Door":
        return "[]";
        break;
      case "Code Unknown":
        return "?";
        break;
      case "Empty":
        return ".";
        break;
      default:
        // empty space
        return "X";
        break;
    }
  }

  function calculateVirtualBoard(
    identifiedPiecesOnBoard,
    gridConfigurationSize
  ) {
    var virtualBoard = [];

    for (var i = 1; i <= gridConfigurationSize; i++) {
      var newLine = [];
      virtualBoard.unshift(newLine);
      for (var j = 1; j <= gridConfigurationSize; j++) {
        var currentX = j;
        var currentY = i;

        // Finds the element within the identifiedPieces
        var indexOfPieceIdentifiedOnPosition = _.findIndex(
          identifiedPiecesOnBoard,
          function(piece) {
            return piece.x == currentX && piece.y == currentY;
          }
        );
        var pieceIdentifiedOnPosition =
          identifiedPiecesOnBoard[indexOfPieceIdentifiedOnPosition];

        // Adds Empty if nothing found
        if (pieceIdentifiedOnPosition === undefined) {
          var emptyObject = {
            x: currentX,
            y: currentY,
            code: 0,
            type: "Empty"
          };
          virtualBoard[0].push(emptyObject); // adds a new Cell
        } else {
          virtualBoard[0].push(pieceIdentifiedOnPosition); // adds a new Cell
        }
      }
    }

    return virtualBoard;
  }

  var identifiedPiecesOnBoard = identifyPiecesPresentOnBoard();
  var virtualBoard = calculateVirtualBoard(
    identifiedPiecesOnBoard,
    gridConfigurationSize
  );

  if (writeToDatabase) {
    writeBoardToFireBase(virtualBoard, boardsRef);
  }

  printVirtualBoard(virtualBoard);

  function printVirtualBoard(virtualBoard) {
    _.forEach(virtualBoard, function(line) {
      var lineArray = [];
      _.forEach(line, function(identifiedObject) {
        lineArray.push(convertCodeDescriptionIntoASCII(identifiedObject.type));
      });
      console.log(lineArray);
    });
  }
}
