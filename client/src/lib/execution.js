import axios from "axios";

export const executeRobot = async () => {
  try {
    return await axios.post("http://localhost:3001/execute", {
      command: "python scriptCatarina.py [23,23,23,23]"
    });
  } catch (error) {
    console.error(error);
  }
};
