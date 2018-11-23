# Syl
Pseudo AI with eventual aspirations for AI. Project is build with specifically Raspberry Pi in mind. It listens and speaks.

### Go to:
1. [Technology stack](#technology-stack)
2. [Deploy](#deploy)
3. [Contributing](#contributing)
4. [General idea and plans](#general-idea-and-plans)
5. [Contact](#contact)

## Technology stack
Currently project uses:
 - HTML - structure of the web page, currently the only way to use the app
 - JavaScript - no front-end frameworks or libraries. App uses speech recognition and speech synthesis (more on that later). Node.js and Grunt.js for easier deployment and to run it on final platform (Raspberry Pi)
This list will be longer as the project will get more complex.

## Deploy
To check if your browser supports speech-to-text run this in your browser console:
```
var msg = new SpeechSynthesisUtterance('Hello World');
window.speechSynthesis.speak(msg)
```
If you get speech output then it's supported. Web Speech API has support for all the latest Chrome/ium browsers. More on that [here](https://developer.mozilla.org/en-US/docs/Web/API/Web_Speech_API#Browser_compatibility). I'm aware it's not currently working on mobile ;(


Live preview: https://kubami9.github.io/Syl/

## Contributing
This project is currently in it's alfa, which means there are many things to do and some of them will set the path for further ideas. If you would like to become a part of it you can check out issues and if there's something that's not assigned to me you can feel free to write a comment and take it. There won't be so many free issues at the very beginning as I want to make some things on my own so the project can take a path that I have in mind.


To run the project you need to have Node.js installed. If/after you do it, you only need to install [Grunt](https://gruntjs.com/).
To install Grunt CLI run `npm install -g grunt-cli` in your node terminal. Then you can follow [this 3 points](https://gruntjs.com/getting-started#working-with-an-existing-grunt-project) and you should be good.

## General idea and plans
My main focus right now is to make this project specifically for Raspberry Pi. Although I also want it work in the browser kinda like it works now but with more options and chat. I'm planning to add much more features and commands and to keep doing it. I think that's how most of the contributions will look like after the core is ready. I don't wanna use any framewokrs or libraries (or at least as few as possible). I also would like to make a version for mobile phones (android) but this might be a veeeery far future. I'm open for some cool ideas.

## Contact
E-mail me at: kubamichalski@kubacoding.eu
