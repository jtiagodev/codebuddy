export const voiceCommandsRegex = {
  //robotNickname: /(codi)|(kodi)|(buddy)|(cody)|(robot)/,
  readSolution: /.*(what is|read) (this|the)?( )?(solution|sequence).*/,
  whatIsThis: /.*(what is|what's) (this|that).*/,
  computeSequence: /.*(compute|check|verify) (solution|sequence).*/,
  recognizeBoard: /.*(recognize) (board|map).*/,
  recognizeSolution: /.*(recognize) (solution|sequence).*/,
  executeSolution: /.*(go|start|execute) (solution|sequence) (codi|kodi|buddy|cody|robot).*/,
  saveMapToDatabase: /.*(save|send) (map|board).*/,
  saveSolutionToDatabase: /.*(save|send) (solution|sequence).*/,
  thankYou: /.*(thank you)|(thanks).*/,
  whoAreYou: /.*(who are you).*/,
  hi: /.*(hello|hi|hey) (codi|kodi|buddy|cody|robot).*/,
  nameReply: /.*(my name is).*/
};

export const anglesDirections = {
  north: 3.0,
  south1: 0.0,
  south2: 6.0,
  west: 4.5,
  east: 1.5
};

export const codeDictionary = {
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

export const validSolutionCommands = {
  109: "Move",
  121: "Turn Left",
  143: "Turn Right",
  151: "Turn Back",
  115: "Swim",
  117: "Open",
  155: "Repeat",
  157: "Stop",
  171: "If",
  173: "Then",
  179: "Else"
};

export const systemStatus = {
  1: "Recognizing Board",
  2: "Recognizing Commands",
  3: "Computing Solution",
  4: "Executing"
};
