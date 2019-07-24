

//------------------------------------------   SPEECH RECOGNITION   ---------------------------------------------------------------
const SpeechRecognition = SpeechRecognition || webkitSpeechRecognition
const SpeechGrammarList = SpeechGrammarList || webkitSpeechGrammarList
const SpeechRecognitionEvent = SpeechRecognitionEvent || webkitSpeechRecognitionEvent

// Language mode, 0 is Polish, 1 is English (US)
let lang = 0;
// Commands program recognizes and answers with matching indexes
const commands = [ "date", "name", "creator", "time", "help", "joke"];
const answerArray = [dateInfo, nameInfo, creatorInfo, timeInfo, helpInfo, jokesInfo];
const grammar = "#JSGF v1.0; grammar commands; public <command> = " + commands.join(" | ") + " ;";

// Initialazing recognision and grammar list
const recognition = new SpeechRecognition();
const speechRecognitionList = new SpeechGrammarList();
speechRecognitionList.addFromString(grammar, 1);

// Setting up recognition options, default language (0) is Polish
recognition.grammars = speechRecognitionList;
recognition.lang = 'en-US';
// Showing spoken words on the fly
recognition.interimResults = true;
recognition.maxAlternatives = 1;

// DOM elements
const answerField = document.getElementById("answer");
const record = document.getElementById("start");

// Array with the words from recognized sentence
let sentence = [];

// When record button clicked starting new recognition
record.onclick = function() {
    recognition.start();
    console.log('Ready to receive a command.');
}

// Once we get the result it prints out the result word/sentence
recognition.onresult = function(event) {
    const last = event.results.length - 1;
    answerField.innerHTML = event.results[last][0].transcript;
    sentence = (event.results[last][0].transcript.split(" "));
    console.log(sentence);
}

// Once we end speaking, the recognition is stopped
recognition.onspeechend = function() {
    recognition.stop();
    // Starting answer() function, line 117 (of main.js)
    answer();
}


// -----------------------------------   CHANGE LANGUAGE (PL/EN)  ----------------------------------------------------
const langBtn = document.getElementById("langMode");
langBtn.onclick = function() {
    if (recognition.lang === 'PL') {
        recognition.lang = 'en-US';
        langBtn.innerHTML = "en-US";
        console.log("ENG");
    } else if (recognition.lang === 'en-US') {
        recognition.lang = 'PL';
        langBtn.innerHTML = "PL";
        console.log("PL");
    }
}

// -----------------------------------   SPEECH SYNTHESIS  ----------------------------------------------------
// setting up speech synthesis and picking DOM elements
const synth = window.speechSynthesis;
const voiceSelect = document.querySelector('select');

// Text we want to read, basically program answer, determined later on
let textToRead = "Speak English. Mate.";

// -----------------------------------------------------------   COMMAND CHECKING FUNCTION   ------------------------------------------------------------
function checkForCommands() {
    // Before execution textToRead is set to default
    textToRead = "Speak English. Mate.";
    for (let i = 0; i < sentence.length; i++) {
        // Checking for human phrases
        for (let greeting of humanPhrases.phrasesGreetings.length) {
            if (sentence.includes(greeting)) {
                textToRead = humanPhrases.answersGreetings[Math.round(Math.random()*4)];
            }
        }
        // New human phrases loop example, you can use this as your template i, j, k, l, m, n... etc.
        for (let l = 0; l < humanPhrases.phrasesHowAreYou.length; l++) {
            if (sentence.join(" ").includes(humanPhrases.phrasesHowAreYou[l])) {
                textToRead = humanPhrases.answersHowAreYou[l];
            }
        }
        for (let m = 0; m < humanPhrases.phrasesComplains.length; m++) {
            if (sentence.join(" ").includes(humanPhrases.phrasesComplains[m])) {
                textToRead = humanPhrases.answersComplains[m];
            }
        }
        for (let n = 0; n < humanPhrases.phrasesCommonQuestions.length; n++) {
            if (sentence.join(" ").includes(humanPhrases.phrasesCommonQuestions[n])) {
                textToRead = humanPhrases.answersCommonQuestions[n];
            }
        }

        // Checking for commands
        for (let j = 0; j < commands.length; j++) {
            if (sentence[i] == commands[j]) {
                textToRead = answerArray[j];
                console.log(textToRead);
                console.log(answerArray);
            }
        }

    }
}

// available voices to use
let voices = [];

// creating a list of available voices
function populateVoiceList() {
    voices = synth.getVoices();

    for(let voice of voices) {
        const option = document.createElement("option");
        option.textContent = voice.name + " (" + voice.lang + ")";

        if (voice.default) {
            option.textContent += " - DEFAULT";
        }

        option.setAttribute("data-lang", voice.lang);
        option.setAttribute("data-name", voice.name);
        voiceSelect.appendChild(option);
    }
}
populateVoiceList();

// Making it work in some browsers where it won't work other way (Firefox if I remember correctly)
if (speechSynthesis.onvoiceschanged !== undefined) {
    speechSynthesis.onvoiceschanged = populateVoiceList;
  }

// Speaking!
function answer() {
    checkForCommands();
    // Program answer, exactly the parameter in the SpeechSynthesisUtterance brackets
    const utterThis = new SpeechSynthesisUtterance(textToRead);
    // Selecting a voice
    const selectedVoice = voiceSelect.selectedOptions[0].getAttribute("data-name");
    for (let voice of voices) {
        if (voice.name === selectedVoice) {
            utterThis.voice = voice;
        }
    }
    synth.speak(utterThis);
}

// This solves the problem of too long sentences. Now it's not breaking the program.
function resumeInfinity() {
    window.speechSynthesis.resume();
    timeoutResumeInfinity = setTimeout(resumeInfinity, 1000);
}
resumeInfinity();