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
}