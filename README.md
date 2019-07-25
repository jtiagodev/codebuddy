# CodeBuddy

Current version 1.0, feel free to contribute by creating a pull request :rocket:

## Introduction 

Learning programming is becoming an important part in children's education and it should also be available for visually impaired children. Teachers and educators should explore new ways of teaching programming principles to children

## System Installation (v1.0)

1. While on the __terminal__, run the Node Package Manager Installer on each component of the project to install dependencies

`cd/client`  
`npm run install`  
`npm run start`  

`cd/meta`  
`npm run install`  
`npm run start`  

`cd/server`  
`npm run install`  
`npm run start`  

2. You can now access CodeBuddy here [localhost:3000](http://localhost:3000)
3. You can access CodeBuddy's Metadata Support here [localhost:1337](http://localhost:1337)
*NOTE: you should register here first [localhost:1337/admin](http://localhost:1337/admin)*
4. The LocalServer is available at [localhost:3001](http://localhost:3001)

## System Usage

1. Print TopCodes (Tangible Object Placement Codes) which are available [here](http://users.eecs.northwestern.edu/~mhorn/topcodes/topcodes.pdf)
2. (Optional) Connect to your computer one of the supported Robots, eg. WonderWorks DASH
3. When properly configured this system works with any type of grid system/size
   1. For early versions, we recommend using a 6x6 Double LEGO grid and attach a camera as centered as possible (as shown on the paper)
   2. Follow the paper to setup the already available block coonfiguration with specific codes attached to it 
4. Once the System is installed and running
   1. System will only start once you identify yourself __my name is (your_name)__
5. Either turn on map recognition and recognize custom board or choose/build a board through the Metadata config
   1. System validates board, recognizes each block including start position and direction and goal
   2. Board is saved in metadata database
6. Once you have a list of commands to execute, turn on commands execution
   1. System validates list of commands (simply excludes any invalid blocks)
   2. System also converts list of commands to interface with other systems (eg, another work Group)
   3. Saves commands to database either when the camera detects the "save" block or when you order via voice command
7. System auto computes solution for current selected board & game mode (__not yet implemented__)
   1. Adds feedback in form of additional actions (__not yet implemented__)
   2. Displays on screen the result of commands list. Green mean success, red mean stop/failure (eg, ordered Robot to move towards wall)
8. Tells local system to execute solution computation (using selected Robot on the GUI)

## Achitecture

### Solution Overview
![Overview](https://i.ibb.co/SnxFKXW/codebuddy-solution-overview.png)
### Remove Server
![RemoteServer](https://i.ibb.co/YTw3LBc/codebuddy-remote.png)
### Local Server
![LocalServer](https://i.ibb.co/3SBXLgD/codebuddy-local.png)
### Client / GUI
![Client](https://i.ibb.co/NFzy8gG/codebuddy-client.png)

## Roadmap

:computer: __Client__  
- [x] Initial GUI
- [x] Voice Recognition Module
- [x] Logic Layer built with RegEx Patterns
- [x] Voice Synthesis Module
- [x] Board Recognition Module
- [x] Commands Recognition Module
:computer: __Meta__  
- [x] Accessible Metadata Configuration
:computer: __Remote (Server)__  
- [x] Save Map and Commands History to Realtime Database
- [ ] Result Computation Module
:computer: __Local (Server)__  
- [x] Result Execution Interface
- [ ] Robot Execution Interface (Python)
- [ ] Robot Execution Scripts: WonderWorks Dash
- [ ] ChatBot Integration to replace RegEx Patterns *(in progress)*
- [ ] Further Integration with more Robots from WonderWorks, LEGO, etc.
- [ ] User Accounts and Analytics (Gamification)
:computer: __CLI__  
- [ ] CodeBuddy's Command Line Interface for project bootstrap

## Credits

Paper available at (coming soon)  
Project developed by __Catarina Silvas__, __Daniel São Pedro__ && __João Tiago__  
*Advanced Interaction Techniques, Master in Computer Science (__Professor Luís Carriço && Professor Tiago Guerreiro__)*
*Faculty of Sciences of the University of Lisbon*  
*LaSIGE - Large Scale Systems Laboratory*  
*2019*  

## License

CodeBuddy is distributed under [Apache 2.0 License](https://github.com/jtiagodev/codebuddy/blob/master/LICENSE)
