# Microwebopolis #

Microwebopolis is an HTML5 port of Micropolis, the original city simulator game. [Play the Demo Now!](http://microwebopolis.googlecode.com/svn/trunk/gameCompiled.html)

## Status ##

![http://microwebopolis.googlecode.com/svn/trunk/project_site/screenshots/000.png](http://microwebopolis.googlecode.com/svn/trunk/project_site/screenshots/000.png)

The port is not currently what you would call a game. Right now rendering works well as does terrain generation. All map editing features have been implemented, and the simulation features have been started. Game saving and loading also works correctly.

After a lot of research and thought I have come to the conclusion that I do not want to implement the original Micropolis city simulation rules. They were very much a reflection of the political views of the author and the technological limitations under which the game was developed. I have no strong political views nor does this project have such strict technical limitations. Therefore I am going to develop a new city simulation method and can continue with this project.

## Development Road Map ##

| **Milestone** | **Progress** |
|:--------------|:-------------|
| Map Editing   | 100%         |
| Map Rendering | 80%          |
| City Simulation | 5%           |
| User Interface | 15%          |
| Game Features | 15%          |

I am currently working on the city simulation. Once that is well underway the final Map Editing and Map Rendering features will be completed.

## Origin and History ##

This project is based on (but is not actually a fork of) the open-source version of Micropolis for the One Laptop Per Child project, also hosted on Google Code: http://code.google.com/p/micropolis/

Micropolis is actually based on the original source code to Maxis's city simulator.

There is a webish version of Micropolis already: http://micropolisonline.com/lps/micropolis/micropolis/micropolis_en-US.lzx?lzt=swf&lzr=swf10 This is actually a flash front-end for the Python GUI developed for the One Laptop per Child project. It has some issues which made it unplayable for me, which is why I started this project.