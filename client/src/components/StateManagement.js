import React, { createContext, useContext, useReducer } from "react";

export const StateContext = createContext();
export const StateProvider = ({ reducer, initialState, children }) => (
  <StateContext.Provider value={useReducer(reducer, initialState)}>
    {children}
  </StateContext.Provider>
);
export const useStateValue = () => useContext(StateContext);

export const initialState = {
  userName: "friend",
  status: "Initializing",
  system: {
    voice: "OFFLINE", // Listening | Processing
    camera: "OFFLINE", // Recognizing Board, Recognizing Commands, Offline
    robot: "OFFLINE" // Executing | Ready | Offline
  },
  config: {
    gameMode: {
      1: "Maze"
    },
    boardSelected: {},
    robotSelected: {
      name: "WonderWorks DASH",
      compatibleCommands: {}
    },
    boardSize: 6,
    availableVoiceCommands: {
      1: {
        command: "Read Commands",
        format: "(what is|read) (this|the)? (solution|sequence)"
      },
      2: {
        command: "What is This Block?",
        format: "(what is|what's) (this|that)"
      },
      3: {
        command: "Compute Commands",
        format: "(compute|check|verify) (solution|sequence)"
      },
      4: {
        command: "Recognize Board",
        format: "(recognize) (board|map)"
      },
      5: {
        command: "Recognize Commands",
        format: "(recognize) (solution|sequence)"
      },
      6: {
        command: "Execute Commands",
        format:
          "(go|start|execute) (solution|sequence) (codi|kodi|buddy|cody|robot)"
      },
      7: {
        command: "Save Board to Database",
        format: "(save|send) (map|board)"
      },
      8: {
        command: "Save Board to Database",
        format: "(save|send) (map|board)"
      },
      9: {
        command: "Save Board to Database",
        format: "(save|send) (solution|sequence)"
      }
    }
  },
  voice: {
    lastCommandIdentified: "",
    lastCommandAccuracy: "",
    statistics: {
      recognized: 0,
      unrecognized: 0
    }
  },
  video: {
    identifiedBoard: [],
    identifiedCommands: [],
    commandsInterfaceGroup1: ""
  }
};

export const reducer = (state, action) => {
  switch (action.type) {
    case "SET_USERNAME":
      return {
        ...state,
        userName: action.userName
      };

    case "SET_STATUS":
      return {
        ...state,
        status: action.status
      };

    case "SET_SYSTEM_VOICE":
      return {
        ...state,
        system: { ...state.system, voice: action.voice }
      };

    case "SET_SYSTEM_CAMERA":
      return {
        ...state,
        system: { ...state.system, camera: action.camera }
      };

    case "SET_SYSTEM_ROBOT":
      return {
        ...state,
        system: { ...state.system, robot: action.robot }
      };

    case "SET_CONFIG_BOARDSELECTED":
      return {
        ...state,
        config: { ...state.config, boardSelected: action.boardSelected }
      };

    case "SET_CONFIG_ROBOTSELECTED":
      return {
        ...state,
        config: { ...state.config, robotSelected: action.robotSelected }
      };

    case "SET_CONFIG_BOARDSIZE":
      return {
        ...state,
        config: { ...state.config, boardSize: action.boardSize }
      };

    case "SET_CONFIG_AVAILABLEVOICECOMMANDS":
      return {
        ...state,
        config: {
          ...state.config,
          availableVoiceCommands: action.availableVoiceCommands
        }
      };

    case "SET_VOICE_LASTCOMMANDDETECTED":
      return {
        ...state,
        voice: {
          ...state.voice,
          lastCommandDetected: action.lastCommandDetected
        }
      };

    case "SET_VOICE_LASTCOMMANDACCURACY":
      return {
        ...state,
        voice: {
          ...state.voice,
          lastCommandAccuracy: action.lastCommandAccuracy
        }
      };

    case "SET_VOICE_STATISTICS":
      return {
        ...state,
        voice: { ...state.voice, statistics: action.statistics }
      };

    case "SET_VIDEO_IDENTIFIEDBOARD":
      return {
        ...state,
        video: {
          ...state.video,
          identifiedBoard: action.identifiedBoard
        }
      };

    case "SET_VIDEO_IDENTIFIEDCOMMANDS":
      return {
        ...state,
        video: {
          ...state.video,
          identifiedCommands: action.identifiedCommands
        }
      };

    case "SET_VIDEO_COMMANDSINTERFACEGROUP1":
      return {
        ...state,
        video: {
          ...state.video,
          commandsInterfaceGroup1: action.commandsInterfaceGroup1
        }
      };

    default:
      return state;
  }
};
