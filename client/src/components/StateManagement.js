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
  status: "Initializing...",
  system: {
    voice: "OFFLINE", // Listening | Processing
    camera: "OFFLINE", // Recognizing Board, Recognizing Commands, Offline
    robot: "OFFLINE" // Executing | Ready | Offline
  },
  executed: "",
  config: {
    gameMode: "Maze",
    boardSelected: {},
    robotSelected: {
      name: "WonderWorks DASH",
      compatibleCommands: {}
    },
    boardSize: 6,
    availableVoiceCommands: [
      {
        command: "Read Commands",
        format: "(what is|read) (this|the)? (solution|sequence)"
      },
      {
        command: "What is This Block?",
        format: "(what is|what's) (this|that)"
      },
      {
        command: "Compute Commands",
        format: "(compute|check|verify) (solution|sequence)"
      },
      {
        command: "Recognize Board",
        format: "(recognize) (board|map)"
      },
      {
        command: "Recognize Commands",
        format: "(recognize) (solution|sequence)"
      },
      {
        command: "Execute Commands",
        format:
          "(go|start|execute) (solution|sequence) (codi|kodi|buddy|cody|robot)"
      },
      {
        command: "Save Board to Database",
        format: "(save|send) (map|board)"
      },
      {
        command: "Save Board to Database",
        format: "(save|send) (map|board)"
      },
      {
        command: "Save Board to Database",
        format: "(save|send) (solution|sequence)"
      }
    ]
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
    identifiedCommmandsAsStrings: [],
    commandsInterfaceGroup1: "",
    robotStartDirection: ""
  }
};

export const reducer = (state, action) => {
  switch (action.type) {
    case "SET_ROBOT_START_DIRECTION":
      return {
        ...state,
        video: {
          ...state.video,
          robotStartDirection: action.robotStartDirection
        }
      };

    case "SET_EXECUTED":
      return {
        ...state,
        executed: action.executed
      };

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
          lastCommandIdentified: action.lastCommandIdentified
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

    case "SET_VOICE_STATISTICS_SUCCESS":
      return {
        ...state,
        voice: {
          ...state.voice,
          statistics: {
            recognized: state.voice.statistics.recognized + 1,
            unrecognized: state.voice.statistics.unrecognized
          }
        }
      };

    case "SET_VOICE_STATISTICS_FAILURE":
      return {
        ...state,
        voice: {
          ...state.voice,
          statistics: {
            recognized: state.voice.statistics.recognized,
            unrecognized: state.voice.statistics.unrecognized + 1
          }
        }
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
    case "SET_VIDEO_IDENTIFIEDCOMMANDS_STRINGS":
      return {
        ...state,
        video: {
          ...state.video,
          identifiedCommmandsAsStrings: action.identifiedCommmandsAsStrings
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
