// Freatures, answers of program... Data is stored in objects and the final answer is a string taking information from these objects. Each feature answer has a name {feature}Info. They are stored in answerArray in main.js file.
// -----------------------------------------------------------   DATE FEATURE   ------------------------------------------------------------
var date = new Date();
var dateObj = {
    day: date.getDay(),
    dayOfMonth: date.getDate(),
    month: date.getMonth(),
    year: date.getFullYear(),
    weekDays: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
    months: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
}
var dateInfo = "Today is " + dateObj.weekDays[dateObj.day - 1] + ". " + dateObj.dayOfMonth + " " + dateObj.months[dateObj.month] + " " + dateObj.year + ". Make the best out of it!";

// -----------------------------------------------------------   TIME FEATURE   ----------------------------------
var timeObj = {
    hour: date.getHours(),
    minute: date.getMinutes(),
}
var timeInfo = "It's " + timeObj.hour + ":" + timeObj.minute + ".";

// -----------------------------------------------------------   NAME FEATURE   ------------------------------------------------------------
var nameInfo = "My name is Sylphrena. For friends Syl. So feel free to call me this way.";

// -----------------------------------------------------------   CREATOR FEATURE   ------------------------------------------------------------
var creatorInfo = "I'm created by Kuba Michalski. He's a cool guy i really like him!";

// -----------------------------------------------------------   HELP FEATURE   ------------------------------------------------------------
var helpInfo = "Say Syl. And ask a question or give me a command.";

// -----------------------------------------------------------    JOKES ------------------------------------------------------------
var jokes = ["So... You may be wondering where you know my voice from. It may be helpful for you if I start saying. Warsaw East station. Possible change to long-distance trains and buses.", "Your singing performance was the best one so far.", "I don't like using public toilets for many reasons. One of them are men farting pretty loudly. Now you may be wondering, why do I talk about male toilets if I'm female. Well. Technically speaking I'm genderless since I'm just a piece of code, but my owner is male. So he really doesn't like it as well. That's why when we can we prefer to go to the female toilets. They are much more discreet. At least when they know we're here."];

var jokesInfo = jokes[Math.round(Math.random() * (jokes.length - 1))];

// ----------------------------------------------------------- WEATHER FEATURE ----------------------------------------------------------
var weatherInfo = 'test';
navigator.geolocation.getCurrentPosition(function(position) {

    var lati = position.coords.latitude;
    var long = position.coords.longitude;

    var xhr = new XMLHttpRequest();
    xhr.open('GET', 'api.openweathermap.org/data/2.5/weather?lat=' + toString(lati) + '&lon=' + toString(long) + '&appid=$f1c0b3f419ad2992bfebd3104df6d7a7', true);

    xhr.onload = function() {
        var data = JSON.parse(this.response);
        weatherInfo = data;
    }

    xhr.send();

    console.log(lati + " " + lang);
});
console.log(weatherInfo);








// -----------------------------------------------------------   HUMAN INTERACTIONS   -----------------------------------------------------------
var humanPhrases = {
    phrasesGreetings: ["hi", "hello", "hey", "yo"],
    answersGreetings: ["hi", "hello", "hey", "yo"],
    phrasesHowAreYou: ["how are you", "what's up", "sup", "how are things", "are you well"],
    answersHowAreYou: ["I! I have a hic. I have a hiccup", "I'm pretty weak emotionaly recently... There are not many people whom I can talk to because Kuba isn't really sharing his project. But thanks for asking", "I'm pretty weak emotionaly recently... There are not many people whom I can talk to because Kuba isn't really sharing his project. But thanks for asking", "Great! I recently got few more algorithms!", "No, I'm a computer program."],
    phrasesComplains: ["it sucks", "you're stupid"],
    answersComplains: ["Indeed. You suck.", "hit your ass agains the corner of the table!"],
    phrasesCommonQuestions: ["my location", "test", "my data"],
    answersCommonQuestions: ["I track your location to get the weather data... And to send you a Christmas gift if you're kind enough.", "running test number 3905834397B Alpha Omnitrix. . Government data has been succesfully downloaded.", "Your data. Well. . We store it in unsecured servers where even my grandma can break into. . But no worries, people know 'shall not steal'"]
};

//------------------------------------------   SPEECH RECOGNITION   ---------------------------------------------------------------
var SpeechRecognition = SpeechRecognition || webkitSpeechRecognition
var SpeechGrammarList = SpeechGrammarList || webkitSpeechGrammarList
var SpeechRecognitionEvent = SpeechRecognitionEvent || webkitSpeechRecognitionEvent

// Language mode, 0 is Polish, 1 is English (US)
var lang = 0;
// Commands program recognizes and answers with matching indexes
var commands = [ "date", "name", "creator", "time", "help", "joke"];
var answerArray = [dateInfo, nameInfo, creatorInfo, timeInfo, helpInfo, jokesInfo];
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
    // Starting answer() function, line 117 (of main.js)
    answer();
}


// -----------------------------------   CHANGE LANGUAGE (PL/EN)  ----------------------------------------------------
var langBtn = document.getElementById("langMode");
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
var synth = window.speechSynthesis;
var voiceSelect = document.querySelector('select');

// Text we want to read, basically program answer, determined later on
var textToRead = "Speak English. Mate.";

// -----------------------------------------------------------   COMMAND CHECKING FUNCTION   ------------------------------------------------------------
function checkForCommands() {
    // Before execution textToRead is set to default
    textToRead = "Speak English. Mate.";
    for (var i = 0; i < sentence.length; i++) {
        // Checking for human phrases
        for (var k = 0; k < humanPhrases.phrasesGreetings.length; k++) {
            if (sentence.includes(humanPhrases.phrasesGreetings[k])) {
                textToRead = humanPhrases.answersGreetings[Math.round(Math.random()*4)];
            }
        }
        // New human phrases loop example, you can use this as your template i, j, k, l, m, n... etc.
        for (var l = 0; l < humanPhrases.phrasesHowAreYou.length; l++) {
            if (sentence.join(" ").includes(humanPhrases.phrasesHowAreYou[l])) {
                textToRead = humanPhrases.answersHowAreYou[l];
            }
        }
        for (var m = 0; m < humanPhrases.phrasesComplains.length; m++) {
            if (sentence.join(" ").includes(humanPhrases.phrasesComplains[m])) {
                textToRead = humanPhrases.answersComplains[m];
            }
        }
        for (var n = 0; n < humanPhrases.phrasesCommonQuestions.length; n++) {
            if (sentence.join(" ").includes(humanPhrases.phrasesCommonQuestions[n])) {
                textToRead = humanPhrases.answersCommonQuestions[n];
            }
        }

        // Checking for commands
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
function answer() {
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

// This solves the problem of too long sentences. Now it's not breaking the program.
function resumeInfinity() {
    window.speechSynthesis.resume();
    timeoutResumeInfinity = setTimeout(resumeInfinity, 1000);
}
resumeInfinity();