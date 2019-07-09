import _ from "lodash";
import { writeBoardToFireBase, boardsRef } from "./firebase";
import { codeDictionary, anglesDirections } from "./codi";
import { speak } from "./speechSyntesis";

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
      speak("Nothing found");
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

  // CAVEAT reversed X axis markers
  var topLeftCode = 31;
  var topRightCode = 47;
  var bottomLeftCode = 55;
  var bottomRightCode = 59;
  var robotCode = 91;
  var goalCode = 93;

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
    var indexForRobotStartCode = _.findIndex(arrayTopCodes, function(topcode) {
      return topcode.code === robotCode;
    });
    var indexForGoalCode = _.findIndex(arrayTopCodes, function(topcode) {
      return topcode.code === goalCode;
    });

    if (
      indexForTopLeftCode === -1 ||
      indexForTopRightCode === -1 ||
      indexForBottomLeftCode === -1 ||
      indexForBottomRightCode === -1 ||
      indexForRobotStartCode === -1 ||
      indexForGoalCode === -1
    ) {
      cancelExecution = true;
    }

    return {
      topLeftCodeRef: arrayTopCodes[indexForTopLeftCode],
      topRightCodeRef: arrayTopCodes[indexForTopRightCode],
      bottomLeftCodeRef: arrayTopCodes[indexForBottomLeftCode],
      bottomRightCodeRef: arrayTopCodes[indexForBottomRightCode],
      robotStartCodeRef: arrayTopCodes[indexForRobotStartCode],
      goalCodeRef: arrayTopCodes[indexForGoalCode]
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
    speak("Missing pieces");
    return -1;
  }

  // Check Direction of Start
  const directionForStart = checkStartDirection(codeRef.robotStartCodeRef);
  console.log(directionForStart);

  function checkStartDirection(startCode) {
    let result = {
      north: 10,
      south1: 10,
      south2: 10,
      west: 10,
      east: 10
    };

    _.forEach(anglesDirections, (v, k) => {
      result[k] = Math.abs(startCode.angle - v);
    });

    const minDifferenceToResult = _.min(_.values(result));
    let startDirection = "unrecognized";

    _.forEach(result, (v, k) => {
      if (v === minDifferenceToResult) {
        startDirection = k;
      }
    });

    return startDirection;
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
        // corners
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
  speak("Valid board found");

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
