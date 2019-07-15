/* eslint-disable */
import { voiceCommandsRegex } from "./codi";
import { speak } from "./speechSyntesis";
import { runCameraRecognition as mapRecognition } from "../lib/maprecognition";
import { runCameraRecognition as solutionRecognition } from "../lib/solutionrecognition";
import { executeRobot } from "../lib/execution";

export const startSpeechFunction = (
  appActions,
  userName,
  identifiedCommands
) => {
  // Import Web Speech API
  let SpeechRecognition =
    window.SpeechRecognition || window.webkitSpeechRecognition;
  let SpeechGrammarList =
    window.SpeechGrammarList || window.webkitSpeechGrammarList;
  let SpeechRecognitionEvent =
    window.SpeechRecognitionEvent || window.webkitSpeechRecognitionEvent;

  // API
  let grammar =
    "#JSGF V1.0; grammar phrase; public <phrase> = save | send | compute | recognize | execute | solution | sequence | commands | board | map | codi | database";
  let recognition = new SpeechRecognition();
  let speechRecognitionList = new SpeechGrammarList();
  speechRecognitionList.addFromString(grammar, 1);
  recognition.grammars = speechRecognitionList;
  recognition.lang = "en-US";
  recognition.interimResults = false;
  recognition.maxAlternatives = 1;
  recognition.start();

  recognition.onresult = function(event) {
    appActions.setSystemVoiceStatus("listening...");

    // The SpeechRecognitionEvent results property returns a SpeechRecognitionResultList object
    // The SpeechRecognitionResultList object contains SpeechRecognitionResult objects.
    // It has a getter so it can be accessed like an array
    // The first [0] returns the SpeechRecognitionResult at position 0.
    // Each SpeechRecognitionResult object contains SpeechRecognitionAlternative objects that contain individual results.
    // These also have getters so they can be accessed like arrays.
    // The second [0] returns the SpeechRecognitionAlternative at position 0.
    // We then return the transcript property of the SpeechRecognitionAlternative object
    let speechResult = event.results[0][0].transcript.toLowerCase();
    let confidenceResult = Math.round(event.results[0][0].confidence * 100);

    appActions.setVoiceLastcommandDetected(speechResult);
    appActions.setVoiceCommandAccuracy(confidenceResult);

    if (speechResult.toLowerCase().match(voiceCommandsRegex.readSolution)) {
      speak("Reading Solution....");

      appActions.setVoiceStatisticsSuccess();
    } else if (
      speechResult.toLowerCase().match(voiceCommandsRegex.whatIsThis)
    ) {
      speak("This is... well i haven't been coded for identifying that yet");

      appActions.setVoiceStatisticsSuccess();
    } else if (
      speechResult.toLowerCase().match(voiceCommandsRegex.computeSequence)
    ) {
      speak("Computing Commands...");

      appActions.setVoiceStatisticsSuccess();
    } else if (
      speechResult.toLowerCase().match(voiceCommandsRegex.recognizeBoard)
    ) {
      speak("Recognizing Board");

      appActions.setVoiceStatisticsSuccess();

      mapRecognition(appActions);
    } else if (
      speechResult.toLowerCase().match(voiceCommandsRegex.recognizeSolution)
    ) {
      speak("Recognizing Commands");

      appActions.setVoiceStatisticsSuccess();

      solutionRecognition(appActions);
    } else if (
      speechResult.toLowerCase().match(voiceCommandsRegex.executeSolution)
    ) {
      speak("Executing Commands");

      appActions.setVoiceStatisticsSuccess();

      executeRobot(appActions, identifiedCommands, (gameMode = "Maze"));
    } else if (speechResult.toLowerCase().match(voiceCommandsRegex.thankYou)) {
      speak(`You are welcome ${userName}!`);

      appActions.setVoiceStatisticsSuccess();
    } else if (speechResult.toLowerCase().match(voiceCommandsRegex.whoAreYou)) {
      let phrases = [
        "I'm a cybernetic organism and i'm here to kill John Connor",
        "My real name is TRON..."
      ];
      speak(phrases[Math.round(Math.random())]);
      appActions.setVoiceStatisticsSuccess();
    } else if (
      speechResult.toLowerCase().match(voiceCommandsRegex.saveMapToDatabase)
    ) {
      speak(`Saving Map to Database, ${userName}`);

      appActions.setVoiceStatisticsSuccess();
    } else if (
      speechResult
        .toLowerCase()
        .match(voiceCommandsRegex.saveSolutionToDatabase)
    ) {
      speak(`Saving Commands to Database, ${userName}`);

      appActions.setVoiceStatisticsSuccess();
    } else {
      appActions.setVoiceStatisticsFailure();
    }
  };

  recognition.onspeechend = function() {};

  recognition.onerror = function(event) {};

  recognition.onaudiostart = function(event) {
    //Fired when the user agent has started to capture audio.
    ////console.log("SpeechRecognition.onaudiostart");
  };

  recognition.onaudioend = function(event) {
    //Fired when the user agent has finished capturing audio.
    ////console.log("SpeechRecognition.onaudioend");
  };

  recognition.onend = function(event) {
    //Fired when the speech recognition service has disconnected.
    ////console.log("SpeechRecognition.onend");

    appActions.setSystemVoiceStatus("listening...");
    // Emulates Continuous Speech Recognition
    recognition.stop();
    recognition.start();
  };

  recognition.onnomatch = function(event) {
    //Fired when the speech recognition service returns a final result with no significant recognition. This may involve some degree of recognition, which doesn't meet or exceed the confidence threshold.
    ////console.log("SpeechRecognition.onnomatch");
  };

  recognition.onsoundstart = function(event) {
    //Fired when any sound — recognisable speech or not — has been detected.
    ////console.log("SpeechRecognition.onsoundstart");
  };

  recognition.onsoundend = function(event) {
    //Fired when any sound — recognisable speech or not — has stopped being detected.
    ////console.log("SpeechRecognition.onsoundend");
  };

  recognition.onspeechstart = function(event) {
    //Fired when sound that is recognised by the speech recognition service as speech has been detected.
    ////console.log("SpeechRecognition.onspeechstart");
    // let voiceStatus = document.querySelector(".voice-status");
    appActions.setSystemVoiceStatus("processing...");
  };
  recognition.onstart = function(event) {
    //Fired when the speech recognition service has begun listening to incoming audio with intent to recognize grammars associated with the current SpeechRecognition.
    ////console.log("SpeechRecognition.onstart");
  };
};

export const getUsername = () =>
  new Promise((resolve, reject) => {
    // API
    let SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;
    let SpeechGrammarList =
      window.SpeechGrammarList || window.webkitSpeechGrammarList;
    let SpeechRecognitionEvent =
      window.SpeechRecognitionEvent || window.webkitSpeechRecognitionEvent;

    var grammar =
      "#JSGF V1.0; grammar phrase; public <phrase> = my | name | is";
    const recognitionUsername = new SpeechRecognition();
    const speechRecognitionList = new SpeechGrammarList();
    speechRecognitionList.addFromString(grammar, 1);
    recognitionUsername.grammars = speechRecognitionList;
    recognitionUsername.lang = "en-US";
    recognitionUsername.interimResults = false;
    recognitionUsername.maxAlternatives = 1;
    recognitionUsername.start();

    let resultFound = false;

    recognitionUsername.onresult = function(event) {
      //console.log("SpeechRecognition.onresult");

      // The SpeechRecognitionEvent results property returns a SpeechRecognitionResultList object
      // The SpeechRecognitionResultList object contains SpeechRecognitionResult objects.
      // It has a getter so it can be accessed like an array
      // The first [0] returns the SpeechRecognitionResult at position 0.
      // Each SpeechRecognitionResult object contains SpeechRecognitionAlternative objects that contain individual results.
      // These also have getters so they can be accessed like arrays.
      // The second [0] returns the SpeechRecognitionAlternative at position 0.
      // We then return the transcript property of the SpeechRecognitionAlternative object
      let speechResultUsername = event.results[0][0].transcript.toLowerCase();
      // let confidenceResult =
      //   Math.round(event.results[0][0].confidence * 100) / 100;
      //console.log(speechResultUsername);

      if (
        speechResultUsername.toLowerCase().match(voiceCommandsRegex.nameReply)
      ) {
        const speechResults = speechResultUsername.split(" ");
        const nameReply = speechResults[speechResults.length - 1];

        speak(`Hello ${nameReply}`);
        resultFound = true;
        // recognitionUsername.stop();
        resolve(nameReply);
      }
    };

    recognitionUsername.onspeechend = function() {};

    recognitionUsername.onerror = function(event) {
      // reject(event);
    };

    recognitionUsername.onaudiostart = function(event) {
      //Fired when the user agent has started to capture audio.
      //console.log("SpeechRecognition.onaudiostart");
    };

    recognitionUsername.onaudioend = function(event) {
      //Fired when the user agent has finished capturing audio.
      //console.log("SpeechRecognition.onaudioend");
    };

    recognitionUsername.onend = function(event) {
      //Fired when the speech recognition service has disconnected.
      //console.log("SpeechRecognition.onend");
      // let voiceStatus = document.querySelector(".voice-status");
      // voiceStatus.textContent = "Listening...";

      // Emulates Continuous Speech Recognition
      recognitionUsername.stop();
      if (!resultFound) {
        //console.log(resultFound);
        recognitionUsername.start();
      }
    };

    recognitionUsername.onnomatch = function(event) {
      //Fired when the speech recognition service returns a final result with no significant recognition. This may involve some degree of recognition, which doesn't meet or exceed the confidence threshold.
      //console.log("SpeechRecognition.onnomatch");
    };

    recognitionUsername.onsoundstart = function(event) {
      //Fired when any sound — recognisable speech or not — has been detected.
      //console.log("SpeechRecognition.onsoundstart");
    };

    recognitionUsername.onsoundend = function(event) {
      //Fired when any sound — recognisable speech or not — has stopped being detected.
      //console.log("SpeechRecognition.onsoundend");
    };

    recognitionUsername.onspeechstart = function(event) {
      //Fired when sound that is recognised by the speech recognition service as speech has been detected.
      //console.log("SpeechRecognition.onspeechstart");
      // let voiceStatus = document.querySelector(".voice-status");
      // voiceStatus.textContent = "Processing...";
    };
    recognitionUsername.onstart = function(event) {
      //Fired when the speech recognition service has begun listening to incoming audio with intent to recognize grammars associated with the current SpeechRecognition.
      //console.log("SpeechRecognition.onstart");
    };
  });
