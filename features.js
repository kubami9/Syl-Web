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
var dateInfo = "Today is " + dateObj.weekDays[dateObj.day] + ". " + dateObj.dayOfMonth + " " + dateObj.months[dateObj.month] + " " + dateObj.year + ". Make the best out of it!";

// -----------------------------------------------------------   TIME FEATURE   ----------------------------------
var timeObj = {
    hour: date.getHours(),
    minute: date.getMinutes(),
}
var timeInfo = "It's " + timeObj.hour + ":" + timeObj.minute + ".";

// -----------------------------------------------------------   NAME FEATURE   ------------------------------------------------------------
var nameInfo = "My name is Sylphrena. For friends Syl. So feel free to call me this way.";

// -----------------------------------------------------------   CREATOR FEATURE   ------------------------------------------------------------
var creatorInfo = "I'm created by Kuba Michalski. He's a cool guy I really like him!";

// -----------------------------------------------------------   HELP FEATURE   ------------------------------------------------------------
var helpInfo = "Say Syl. And ask a question or give me a command.";

// -----------------------------------------------------------   HUMAN INTERACTIONS   -----------------------------------------------------------
var humanPhrases = {
    phrasesGreetings: ["hi", "hello", "hey", "yo", "elo"],
    answersGreetings: ["hi", "hello", "hey", "yo", "elo"],
    phrasesHowAreYou: ["how are you", "what's up", "sup", "how are things", "are you well"],
    answersHowAreYou: ["I! I have a hic. I have a hiccup", "I'm pretty weak emotionaly recently... There are not many people whom I can talk to because Kuba isn't really sharing his project. But thanks for asking", "I'm pretty weak emotionaly recently... There are not many people whom I can talk to because Kuba isn't really sharing his project. But thanks for asking", "Great! I recently got few more algorithms!", "No, I'm a computer program."],
    phrasesComplains: ["it sucks", "you fool"],
    answersComplains: ["Indeed. You suck.", "hit your ass agains the corner of the table!"]
}