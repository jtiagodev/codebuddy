var solutionDetectedText = document.querySelector(".solution-detected");
var solutionDetectedTextv2 = document.querySelector(".solution-detected-v2");
var solutionDetectedG1 = document.querySelector(".solution-g1");

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
      var differenceArray2 = _.difference(arrayOfOldCodes, arrayOfNewCodes);

      _.forEach(differenceArray, function(newCode) {
        console.log(newCode);
      });

      if (differenceArray.length > 0 || differenceArray2.length > 0) {
        runComputation(topcodes);
      }

      // TIA: Updates array with new value read
      arrayOfOldCodes = arrayOfNewCodes;
    }

    // obtain a drawing context from the <canvas>
    var ctx = document.querySelector("#video-canvas").getContext("2d");
    // draw a circle over the top of each TopCode
    ctx.fillStyle = "rgba(123, 239, 178, 0.5)"; // very translucent red
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

function runComputation(arrayTopCodes) {
  var solutionArray = detectSolution(arrayTopCodes);
  solutionDetectedText.textContent = arrayOfObjectsToArrayOfCodes(
    solutionArray
  );
  solutionDetectedTextv2.textContent = arrayOfObjectsToArrayOfStrings(
    solutionArray
  );
  solutionDetectedG1.textContent = interfaceWithGroup1(solutionArray);
}

function detectSolution(arrayTopCodes) {
  return _.orderBy(arrayTopCodes, ["x"], ["asc"]);
}

function arrayOfObjectsToArrayOfCodes(arrayOfObjects) {
  var arrayCodes = [];
  _.forEach(arrayOfObjects, function(code) {
    arrayCodes.push(code.code);
  });
  return arrayCodes;
}

function translateCodeIntoType(codeNumber, codeDictionary = codeDictionary) {
  if (codeDictionary[codeNumber]) {
    return codeDictionary[codeNumber].description;
  } else {
    return "Code Unknown";
  }
}

function arrayOfObjectsToArrayOfStrings(arrayOfObjects) {
  var arrayStrings = [];
  _.forEach(arrayOfObjects, function(code) {
    arrayStrings.push(translateCodeIntoType(code.code, codeDictionary));
  });
  return arrayStrings;
}

function interfaceWithGroup1(arrayOfObjects) {
  var supportedCommands = {
    109: "frente",
    121: "esquerda",
    143: "direita",
    151: "tras"
  };

  var interfaceResponse = [];
  _.forEach(arrayOfObjects, function(code) {
    if (supportedCommands[code.code]) {
      interfaceResponse.push(supportedCommands[code.code]);
    }
  });

  return interfaceResponse;
}

runCameraRecognition();
