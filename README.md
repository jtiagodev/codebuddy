# CodeBuddy

Current version 1.0, feel free to contribute by creating a pull request :rocket:

## Introduction 

Learning programming is becoming an important part in children's education and it should also be available for visually impaired children. Teachers and educators should explore new ways of teaching programming principles to children

## System Installation (v1.0)

* __PRE-REQUISITE__: you need ![Node.js](https://nodejs.org/), ![git](https://git-scm.com/downloads) and ![Python](https://www.python.org/) installed on your computer

1. Download the project from github

`git clone https://github.com/jtiagodev/codebuddy.git`

2. Run the Node Package Manager Installer on each component of the project to install dependencies

`cd/client`  
`npm run install`  
`npm run start`  

`cd/meta`  
`npm run install`  
`npm run start`  

`cd/server`  
`npm run install`  
`npm run start`  

3. Add your Environment Variables, create a __.env__ file under /client, /meta and /server
4. Access the application:
   1. Access CodeBuddy's GUI here [localhost:3000](http://localhost:3000)
   2. Access CodeBuddy's Metadata Support here [localhost:1337](http://localhost:1337)
   3. Local Server is available at [localhost:3001](http://localhost:3001)

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
### Client / GUI
![Client](https://i.ibb.co/NFzy8gG/codebuddy-client.png)
### Remote Server
![RemoteServer](https://i.ibb.co/YTw3LBc/codebuddy-remote.png)
### Local Server
![LocalServer](https://i.ibb.co/3SBXLgD/codebuddy-local.png)

## Roadmap
- __Client__  
- [x] Initial GUI
- [x] Voice Recognition Module
- [x] Logic Layer built with RegEx Patterns
- [x] Voice Synthesis Module
- [x] Board Recognition Module
- [x] Commands Recognition Module  
- __Meta__  
- [x] Accessible Metadata Configuration  
- __Remote (Server)__  
- [x] Save Map and Commands History to Realtime Database
- [ ] Result Computation Module  
- __Local (Server)__  
- [x] Result Execution Interface
- [ ] Robot Execution Interface (Python)
- [ ] Robot Execution Scripts: WonderWorks Dash
- [ ] ChatBot Integration to replace RegEx Patterns *(in progress)*
- [ ] Further Integration with more Robots from WonderWorks, LEGO, etc.
- [ ] User Accounts and Analytics (Gamification)  
- __CLI__  
- [ ] CodeBuddy's Command Line Interface for project bootstrap

## Credits

Paper available ![here](https://github.com/jtiagodev/codebuddy/blob/master/paper.pdf)
Project developed by __Catarina Fitas__, __Daniel São Pedro__ && __João Tiago__  
*Advanced Interaction Techniques, Master in Computer Science (__Professor Luís Carriço && Professor Tiago Guerreiro__)*  
*Faculty of Sciences of the University of Lisbon*  
*LaSIGE - Large Scale Systems Laboratory*  
*2019*  

## License

CodeBuddy is distributed under [Apache 2.0 License](https://github.com/jtiagodev/codebuddy/blob/master/LICENSE)
