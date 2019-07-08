import Firebase from "firebase";
import { speak } from "./speechSyntesis";

var firebaseConfig = {
  apiKey: "AIzaSyAb7JgKMF8U7E2AE2UF_2N-W_uYNaSr2vg",
  authDomain: "tia-fcul.firebaseapp.com",
  databaseURL: "https://tia-fcul.firebaseio.com",
  projectId: "tia-fcul",
  storageBucket: "",
  messagingSenderId: "598954883166",
  appId: "1:598954883166:web:7ddb451cf4d53b20"
};

// Initialize Firebase
Firebase.initializeApp(firebaseConfig);

var dbRef = Firebase.database().ref();
export const commandsRef = dbRef.child("commands");
export const boardsRef = dbRef.child("boards");

export const writeCommandToFireBase = (commands, commandsRef) => {
  var newEntry = {
    executedOn: new Date().getTime(),
    commandList: commands
  };
  commandsRef.push(newEntry, () => {
    speak("Commands Written in Database");
  });
};

export const writeBoardToFireBase = (board, boardsRef) => {
  var newEntry = {
    savedOn: new Date().getTime(),
    board
  };
  boardsRef.push(newEntry, () => {
    speak("New Board Written in Database");
  });
};
