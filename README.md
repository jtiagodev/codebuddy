# CodeBuddy (OpenSource)

## Introduction 

Learning programming is becoming an important part in children's education and it should also be available for visually impaired children. Teachers and educators should explore new ways of teaching programming principles to children

## Instructions 

`npm install  
npm run start  `


## Usage

1. Turn on map recognition and recognize custom board
   1. System validates board (includes full recognition, start and goal)
   2. Board is saved in metadata database
2. Turn on solution recognition and build it
   1. System validates solution (excludes invalid blocks)
   2. System also converts colution to interface with Group 1
   3.Saves solution to database
3. System auto computes solution for current selected board & game mode
   1. Adds feedback in form of extra actions
4. Tells local system to execute solution computation (using selected robot)


## Achitecture

### Solution Overview
![Overview](https://i.ibb.co/SnxFKXW/codebuddy-solution-overview.png)

### Solution Overview
![RemoteServer](https://i.ibb.co/YTw3LBc/codebuddy-remote.png)
![LocalServer](https://i.ibb.co/3SBXLgD/codebuddy-local.png)
![Client](https://i.ibb.co/NFzy8gG/codebuddy-client.png)

## Features 

## Roadmap

- [x] Initial GUI
- [x] Voice Recognition Module
- [x] Logic Layer built with RegEx Patterns
- [x] Voice Synthesis Module
- [x] Board Recognition Module
- [x] Commands Recognition Module
- [x] Save Map and Commands History to Realtime Database
- [x] Accessible Metadata Configuration
- [ ] Result Computation Module
- [x] Result Execution Interface
- [ ] Robot Execution Interface (Python)
- [ ] Robot Execution Scripts: WonderWorks Dash
- [ ] Chatbot Integration to replace RegEx Patterns *(in progress)*
- [ ] Further Integration with more Robots from WonderWorks, LEGO, etc.
- [ ] User Accounts and Analytics (Gamification)

## License

CodeBuddy is distributed under [Apache 2.0 License](https://github.com/jtiagodev/codebuddy/blob/master/LICENSE)

## Credits

Paper available at (coming soon)  
Project developed by __Catarina Silvas__, __Daniel São Pedro__ && __João Tiago__  
*Advanced Interaction Techniques, Ms Computer Science*  
*Faculty of Sciences of the University of Lisbon*  
*LaSIGE - Large Scale Systems Laboratory*  
*2019*  


