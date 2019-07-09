export const voiceCommandsRegex = {
  1: "read sequence",
  2: "what is this",
  3: "compute solution",
  4: "recognize board",
  5: "recognize sequence",
  6: "execute solution"
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
