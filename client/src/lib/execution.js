import axios from "axios";

export const executeRobot = async (
  appActions,
  identifiedCommands = [],
  gameMode = "Maze"
) => {
  let command = `python robotsInterfaceScript.py ${gameMode} ${identifiedCommands}`;
  appActions.setExecuted(command);

  try {
    return await axios.post("http://localhost:3001/execute", {
      command
    });
  } catch (error) {
    console.error(error);
  }
};
