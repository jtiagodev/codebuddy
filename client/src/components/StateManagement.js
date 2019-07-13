import React, { createContext, useContext, useReducer } from "react";

export const StateContext = createContext();
export const StateProvider = ({ reducer, initialState, children }) => (
  <StateContext.Provider value={useReducer(reducer, initialState)}>
    {children}
  </StateContext.Provider>
);
export const useStateValue = () => useContext(StateContext);

export const initialState = {
  theme: { primary: "green" },
  status: { system: "online", voice: "online", video: "online" }
};

export const reducer = (state, action) => {
  switch (action.type) {
    case "changeTheme":
      return {
        ...state,
        theme: action.newTheme
      };

    case "changeVoiceStatus":
      return {
        ...state,
        system: action.newVoiceStatus
      };

    default:
      return state;
  }
};
