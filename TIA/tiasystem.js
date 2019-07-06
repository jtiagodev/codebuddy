function runCameraRecognition() {
  var arrayOfOldCodes = []; // IDs only

  // register a callback function with the TopCode library
  TopCodes.setVideoFrameCallback("video-canvas", function(jsonString) {
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
      var arrayOfNewCodes = [];
      _.forEach(topcodes, function(code) {
        arrayOfNewCodes.push(code.code);
      });

      var differenceArray = _.difference(arrayOfNewCodes, arrayOfOldCodes);
      _.forEach(differenceArray, function(newCode) {
        console.log(newCode);
      });

      if (differenceArray.length > 0) {
        runComputation(topcodes);
      }

      // TIA: Updates array with new value read
      arrayOfOldCodes = arrayOfNewCodes;
    }

    // obtain a drawing context from the <canvas>
    var ctx = document.querySelector("#video-canvas").getContext("2d");
    // draw a circle over the top of each TopCode
    ctx.fillStyle = "rgba(255, 0, 0, 0.3)"; // very translucent red
    for (i = 0; i < topcodes.length; i++) {
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
}

// 6             (6,6)
// /\ . . . . . .
//  |. . . . . .
//  |. . . . . .
//  |. . . . . .
//  |. . . . . .
// (1,1) ------ > 6
function runComputation(arrayTopCodes) {
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
    157: { description: "Number" },
    167: { description: "Stop" },
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
    217: { description: "Voice Interesting" }
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
  // Helper Values for Caluclating Positions
  var offSets = calculateXandYOffset(codeRef); // equivalents to (0,0)
  var avgSpaceBetweenBoardCells = calculateAvgDistance(arrayTopCodes);
  // Calculation

  function identifyPiecesPresentOnBoard() {
    var identifiedPiecesOnBoard = {};

    _.forEach(arrayTopCodes, function(topCode, i) {
      var positions = calculatePositionOfObject(
        avgSpaceBetweenBoardCells,
        offSets.x,
        offSets.y,
        topCode
      );
      identifiedPiecesOnBoard[i] = positions;
      identifiedPiecesOnBoard[i].code = topCode.code;
      identifiedPiecesOnBoard[i].type = translateCodeIntoType(
        topCode.code,
        codeDictionary
      );
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

  function calculateVirtualBoard(identifiedPiecesOnBoard) {
    return [];
  }

  console.log(identifyPiecesPresentOnBoard());
}

runCameraRecognition();
