const appActions = dispatch => {
  const setVoiceLastcommandDetected = lastCommandIdentified => {
    dispatch({
      type: "SET_VOICE_LASTCOMMANDDETECTED",
      lastCommandIdentified
    });
  };

  const setVoiceCommandAccuracy = lastCommandAccuracy => {
    dispatch({
      type: "SET_VOICE_LASTCOMMANDACCURACY",
      lastCommandAccuracy
    });
  };

  const setSystemVoiceStatus = voice => {
    dispatch({
      type: "SET_SYSTEM_VOICE",
      voice
    });
  };

  const setVoiceStatisticsSuccess = () => {
    dispatch({
      type: "SET_VOICE_STATISTICS_SUCCESS"
    });
  };

  const setVoiceStatisticsFailure = () => {
    dispatch({
      type: "SET_VOICE_STATISTICS_FAILURE"
    });
  };

  const setUsername = userName => {
    dispatch({
      type: "SET_USERNAME",
      userName
    });
  };

  const setStatus = status => {
    dispatch({
      type: "SET_STATUS",
      status
    });
  };

  const setSystemCameraStatus = camera => {
    dispatch({
      type: "SET_SYSTEM_CAMERA",
      camera
    });
  };

  const setSystemRobotStatus = robot => {
    dispatch({
      type: "SET_SYSTEM_ROBOT",
      robot
    });
  };

  const setConfigBoardSelected = boardSelected => {
    dispatch({
      type: "SET_CONFIG_BOARDSELECTED",
      boardSelected
    });
  };

  const setConfigRobotSelected = robotSelected => {
    dispatch({
      type: "SET_CONFIG_ROBOTSELECTED",
      robotSelected
    });
  };

  const setConfigBoardSize = boardSize => {
    dispatch({
      type: "SET_CONFIG_BOARDSIZE",
      boardSize
    });
  };

  const setConfigAvailableVoiceCommands = availableVoiceCommands => {
    dispatch({
      type: "SET_CONFIG_AVAILABLEVOICECOMMANDS",
      availableVoiceCommands
    });
  };

  const setVideoIdentifiedBoard = identifiedBoard => {
    dispatch({
      type: "SET_VIDEO_IDENTIFIEDBOARD",
      identifiedBoard
    });
  };

  const setVideoIdentifiedCommands = identifiedCommands => {
    dispatch({
      type: "SET_VIDEO_IDENTIFIEDCOMMANDS",
      identifiedCommands
    });
  };

  const setVideoCommandsInterfaceGroup1 = commandsInterfaceGroup1 => {
    dispatch({
      type: "SET_VIDEO_COMMANDSINTERFACEGROUP1",
      commandsInterfaceGroup1
    });
  };

  const setExecuted = executed => {
    dispatch({
      type: "SET_EXECUTED",
      executed
    });
  };

  const setVideoIdentifiedCommandsAsStrings = identifiedCommmandsAsStrings => {
    dispatch({
      type: "SET_VIDEO_IDENTIFIEDCOMMANDS_STRINGS",
      identifiedCommmandsAsStrings
    });
  };

  return {
    setExecuted,
    setVoiceLastcommandDetected,
    setVoiceCommandAccuracy,
    setSystemVoiceStatus,
    setVoiceStatisticsSuccess,
    setVoiceStatisticsFailure,
    setUsername,
    setStatus,
    setSystemCameraStatus,
    setSystemRobotStatus,
    setConfigBoardSelected,
    setConfigRobotSelected,
    setConfigBoardSize,
    setConfigAvailableVoiceCommands,
    setVideoIdentifiedBoard,
    setVideoIdentifiedCommands,
    setVideoIdentifiedCommandsAsStrings,
    setVideoCommandsInterfaceGroup1
  };
};

export default appActions;
