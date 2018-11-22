

//------------------------------------------   SPEECH RECOGNITION   ---------------------------------------------------------------
var SpeechRecognition = SpeechRecognition || webkitSpeechRecognition
var SpeechGrammarList = SpeechGrammarList || webkitSpeechGrammarList
var SpeechRecognitionEvent = SpeechRecognitionEvent || webkitSpeechRecognitionEvent

// Language mode, 0 is Polish, 1 is English (US)
var lang = 0;
// Commands program recognizes and answers with matching indexes
var commands = [ "date", "name", "creator", "time"];
var answerArray = [dateInfo, nameInfo, creatorInfo, timeInfo];
var grammar = "#JSGF v1.0; grammar commands; public <command> = " + commands.join(" | ") + " ;";

// Initialazing recognision and grammar list
var recognition = new SpeechRecognition();
var speechRecognitionList = new SpeechGrammarList();
speechRecognitionList.addFromString(grammar, 1);

// Setting up recognition options, default language (0) is Polish
recognition.grammars = speechRecognitionList;
recognition.lang = 'en-US';
// Showing spoken words on the fly
recognition.interimResults = true;
recognition.maxAlternatives = 1;

// DOM elements
var answerField = document.getElementById("answer");
var record = document.getElementById("start");

// Array with the words from recognized sentence
var sentence = [];

// When record button clicked starting new recognition
record.onclick = function() {
    recognition.start();
    console.log('Ready to receive a command.');
}

// Once we get the result it prints out the result word/sentence
recognition.onresult = function(event) {
    var last = event.results.length - 1;
    answerField.innerHTML = event.results[last][0].transcript;
    sentence = (event.results[last][0].transcript.split(" "));
    console.log(sentence);
}

// Once we end speaking, the recognition is stopped
recognition.onspeechend = function() {
    recognition.stop();
}


// -----------------------------------   CHANGE LANGUAGE (PL/EN)  ----------------------------------------------------
var langBtn = document.getElementById("langMode");
langBtn.onclick = function() {
    if (recognition.lang === 'PL') {
        recognition.lang = 'en-US';
        console.log("ENG");
    } else if (recognition.lang === 'en-US') {
        recognition.lang = 'PL';
        console.log("PL");
    }
}

// -----------------------------------   SPEECH SYNTHESIS  ----------------------------------------------------
// setting up speech synthesis and picking DOM elements
var synth = window.speechSynthesis;
var voiceSelect = document.querySelector('select');
var speakBtn = document.getElementById("speak");

// Text we want to read, basically program answer, determined later on
var textToRead = "Honestly I have no clue what you're just saying.";

// -----------------------------------------------------------   COMMAND CHECKING FUNCTION   ------------------------------------------------------------
function checkForCommands() {
    for (var i = 0; i < sentence.length; i++) {
        for (var j = 0; j < commands.length; j++) {
            if (sentence[i] == commands[j]) {
                textToRead = answerArray[j];
                console.log(textToRead);
                console.log(answerArray);
            }
        }
    }
}

// available voices to use
var voices = [];

// creating a list of available voices
function populateVoiceList() {
    voices = synth.getVoices();

    for(var i = 0; i < voices.length; i++) {
        var option = document.createElement("option");
        option.textContent = voices[i].name + " (" + voices[i].lang + ")";

        if (voices[i].default) {
            option.textContent += " - DEFAULT";
        }

        option.setAttribute("data-lang", voices[i].lang);
        option.setAttribute("data-name", voices[i].name);
        voiceSelect.appendChild(option);
    }
}
populateVoiceList();

// Making it work in some browsers where it won't work other way (Firefox if I remember correctly)
if (speechSynthesis.onvoiceschanged !== undefined) {
    speechSynthesis.onvoiceschanged = populateVoiceList;
  }

// Speaking!
speakBtn.onclick = function() {
    checkForCommands();
    // Program answer, exactly the parameter in the SpeechSynthesisUtterance brackets
    var utterThis = new SpeechSynthesisUtterance(textToRead);
    // Selecting a voice
    var selectedVoice = voiceSelect.selectedOptions[0].getAttribute("data-name");
    for(var i = 0; i < voices.length; i++) {
        if (voices[i].name === selectedVoice) {
            utterThis.voice = voices[i];
        }
    }
    synth.speak(utterThis);
}
