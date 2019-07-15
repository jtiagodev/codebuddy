import _ from "lodash";
import { speak } from "./speechSyntesis";
import { writeCommandToFireBase, commandsRef } from "./firebase";
import { codeDictionary } from "./codi";

// var solutionDetectedText = document.querySelector(".solution-detected");
// var sutionDetectedTextv2 = document.querySelector(".solution-detected-v2");
// var solutionDetectedG1 = document.querySelector(".solution-g1");

export const runCameraRecognition = (appActions, userName = "friend") => {
  var arrayOfOldCodes = []; // IDs only
  var nothingFoundBefore = false;

  // register a callback function with the TopCode library
  window.TopCodes.setVideoFrameCallback("video-canvas", function(jsonString) {
    // convert the JSON string to an object
    var json = JSON.parse(jsonString);
    // get the list of topcodes from the JSON object
    var topcodes = json.topcodes;

    //////////////////////////////////////// TIA CODE START /////////////////////
    /////////////////////////////////////////////////////////////////////////////
    // console.log(topcodes);

    if (topcodes.length === 0) {
      arrayOfOldCodes = []; // resets to none
      if (nothingFoundBefore) {
      } else {
        speak("Nothing found");
        nothingFoundBefore = true;
      }
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
    for (var i = 0; i < topcodes.length; i++) {
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

function runComputation(arrayTopCodes) {
  var solutionArray = detectSolution(arrayTopCodes);
  let solutionDetectedComponent = document.querySelector(".solution-detected");
  solutionDetectedComponent.textContent = arrayOfObjectsToArrayOfCodes(
    solutionArray
  );
  let solutionDetectedComponentv2 = document.querySelector(
    ".solution-detected-v2"
  );
  solutionDetectedComponentv2.textContent = arrayOfObjectsToArrayOfStrings(
    solutionArray
  );
  var solutionForGroup1 = interfaceWithGroup1(solutionArray);
  var lastCommand = solutionForGroup1[solutionForGroup1.length - 1];
  if (lastCommand === "WRITE") {
    solutionForGroup1.pop();
    writeCommandToFireBase(solutionForGroup1, commandsRef);
  }
  let solutionDetectedG1 = document.querySelector(".solution-g1");
  solutionDetectedG1.textContent = solutionForGroup1;
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
    109: "frente,",
    121: "esquerda,",
    143: "direita,",
    151: "tras,",
    155: "<repeat-",
    157: ">,",
    341: "1,",
    345: "2,",
    355: "3,",
    357: "4,",
    361: "5,",
    557: "WRITE"
  };

  var interfaceResponse = [];
  _.forEach(arrayOfObjects, function(code) {
    if (supportedCommands[code.code]) {
      interfaceResponse.push(supportedCommands[code.code]);
    }
  });

  return interfaceResponse;
}
