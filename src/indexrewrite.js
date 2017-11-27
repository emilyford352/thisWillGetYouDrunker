'use strict';

const Alexa = require('alexa-sdk');

const GAME_STATES = {
    TRIVIA: '_TRIVIAMODE', // Asking trivia questions.
    EVERYONEDRINKS: '_EVERYONEDRINKS', //Everyone drinks
    START: '_STARTMODE', // Entry point, start the game.
    HELP: '_HELPMODE', // The user is asking for help.
};
const APP_ID = undefined; // TODO replace with your app ID (OPTIONAL)

const everyoneDrinks = [
    "Drink if you went to college",
    "Drink if you have kids",
    "Drink if you are an aunt or uncle",
    "Drink if you like sports",
    "Drink if you have a pet",
    "Drink if you have had sex in the past 48 hours",
    "Drink if you have ever been cat called",
    "Drink if you have two eyes",
    "Drink if you hate Trump",
    "Drink if you are from the East Coast",
    "Drink if you are from the West Coast",
    "Drink if you went to the nail salon within the past month",
    "Drink if you are an asshole",
    "Drink if you like musicals",
    "Drink if you play video games",
    "Drink if you have an iPhone",
    "Drink if you have an Android",
    "Drink if you like tacos",
    "Drink if you like pina cooladas and getting caught in the rain",
    "Drink if you have ever cried watching Titanic",
    "Drink if you have ever run over a squirrel",
    "Drink if you have glasses",
    "Drink if you love sushi",
    "Drink if you had the most recent birthday",
    "Drink if you are the youngest",
    "Drink if you are the oldest",
    "Drink if you are the shortest",
    "Drink if you have longest hair",
    "Drink if you are the nicest person in the room",
    "Drink if you are the biggest asshole in the room",
    "Drink if you are the nerdiest person in the room",
    "Drink if you are most likely to end up naked, outside your grandma's rosebush at 4am",
    "Drink if you are most likely to be a millionare",
    "Drink if you are the most athletic",
    "Drink if you are the person most likely to go to bed at 9pm ",
    "Drink if you are the person that is most likely to end up with 18 cats, 9 dogs and athritis ",
    "The person most likely to bring an escort to the mall for a date",
    "Drink if you are the person most likely to streak at a sporting event",
    "Drink if you are most likely to have a Britney Spears breakdown"
]

const triviaQuestions = [
    {
        'question' : 'Who was the 9th US president?'
        , 'answer' : 'William Henry Harrison'
    } ,
    {
        'question' : 'Where is the comedian, Adam Sandler, from?'
        , 'answer' : 'Manchester, NH'
    } ,
    {
        'question' : 'On which island was Napoleon exiled following his defeat in Waterloo?'
        , 'answer' : 'St. Helena'
    } ,
    {
        'question' : 'What US state is the Flagstaff Pulliam Airport located in?'
        , 'answer' : 'Arizona'
    } ,
    {
        'question' : 'What US state is the Pocatello Regional Airport located in?'
        , 'answer' : 'Idaho'
    } ,
    {
        'question' : 'What US state is the Cincinnati Municipal Lunken Airport located in?'
        , 'answer' : 'Ohio'
    } ,
    {
        'question' : 'What US state is the Palm Springs International Airport located in?'
        , 'answer' : 'California'
    } ,
    {
        'question' : 'What US state is the Cheyenne Regional Airport located in?'
        , 'answer' : 'Wyoming'
    } ,
    {
        'question' : 'Who plays Dwight Schrute on the US version of The Office?'
        , 'answer' : 'Rainn Wilson'
    } ,
    {
        'question' : 'Who is the female lead in the 1978 version of the movie Halloween?'
        , 'answer' : 'Jamie Lee Curtis'
    } ,
    {
        'question' : 'What is the largest fish in the ocean?'
        , 'answer' : 'Whale shark'
    } ,
    {
        'question' : 'Where were cats presumed to be first domesticated?'
        , 'answer' : 'Egypt'
    } ,
    {
        'question' : 'Who was the first man on the moon?'
        , 'answer' : 'Neil Armstrong'
    } ,
    {
        'question' : 'Who is the lead signer of A C D C'
        , 'answer' : 'Brian Johnson'
    } ,
    {
        'question' : 'How many continents are in the world?'
        , 'answer' : 'Seven'
    } ,
    {
        'question' : 'Which countrys national emblem is the beaver'
        , 'answer' : 'Canada'
    } ,
    {
        'question' : 'How many players are on the field in a baseball game?'
        , 'answer' : 'Nine'
    } ,
    {
        'question' : 'What is the name of Batmans butler?'
        , 'answer' : 'Alfred'
    } ,
    {
        'question' : 'Which element is N A?'
        , 'answer' : 'Sodium'
    } ,
    {
        'question' : 'What city is the capital of China?'
        , 'answer' : 'Beijing'
    } ,
    {
        'question' : 'What is the most commonly spoken language in the world?'
        , 'answer' : 'Chinese'
    } ,
    {
        'question' : 'What kind of tree do acorns grow on?'
        , 'answer' : 'Oak'
    } ,
    {
        'question' : 'How many colors are in the rainbow?'
        , 'answer' : 'Seven'
    } ,
    {
        'question' : 'In fitness, what does the acronym "BMI" stand for?'
        , 'answer' : 'Body Mass Index'
    } ,
    {
        'question' : 'What is the capital of North Dakota?'
        , 'answer' : 'Bismark'
    } ,
    {
        'question' : 'Who is Spongebobs best friend'
        , 'answer' : 'Patrick'
    } ,
    {
        'question' : 'What street did Sherlock Holmes live on?'
        , 'answer' : 'Baker Street'
    } ,
    {
        'question' : 'What do the birds say in Finding Nemo?'
        , 'answer' : 'Mine!'
    } ,
    {
        'question' : 'When did the movie The Lion King come out?'
        , 'answer' : '1994'
    } ,
    {
        'question' : 'Where did the Titanic set sail from?'
        , 'answer' : 'Southampton'
    } ,
    {
        'question' : 'What does corgi mean?'
        , 'answer' : 'Dward dog'
    } ,
    {
        'question' : 'Do dogs dream?'
        , 'answer' : 'Yes.'
    } ,
    {
        'question' : 'When did Monopoly come out?'
        , 'answer' : '1935'
    } ,
    {
        'question' : 'What day of the week is Canadian Thankgiving on?'
        , 'answer' : 'Monday'
    } ,
    {
        'question' : 'What Disney movie is the song A Whole New World from?'
        , 'answer' : 'Aladdin'
    } ,
    {
        'question' : 'What was Rudolphs fathers name'
        , 'answer' : 'Donner'
    } ,
    {
        'question' : 'Where did Halloween originate?'
        , 'answer' : 'Ireland'
    } ,
    {
        'question' : 'How many times have the red sox won the world series?'
        , 'answer' : '8'
    } ,
    {
        'question' : 'Who has won the world series the most amount of times?'
        , 'answer' : 'Yankees'
    } ,
    {
        'question' : 'How many teams are in the NBA?'
        , 'answer' : '30'
    } ,
    {
        'question' : 'Which of Shakespeares plays is the longest'
        , 'answer' : 'Hamlet'
    } ,
    {
        'question' : 'Which Shakespeare play is the following quote from: All the perfumes of Arabia will not sweeten' +
        'this little hand'
        , 'answer' : 'Macbeth'
    } ,
    {
        'question' : 'What is a group of cats called?'
        , 'answer' : 'Clowder'
    } ,
    {
        'question' : 'What does the acronym E A stand for?'
        , 'answer' : 'Electronic Arts'
    } ,
    {
        'question' : 'What year did Alexa originate?'
        , 'answer' : '2015'
    } , {
        'question' : 'What band sings the theme song to the popular 90s show Friends'
        , 'answer' : 'The Remembrandts'
    }

];

const newSessionHandlers = {
    'LaunchRequest': function () {
        this.handler.state = GAME_STATES.START;
        this.emitWithState('StartGame', true);
    },
    'AMAZON.StartOverIntent': function () {
        this.handler.state = GAME_STATES.START;
        this.emitWithState('StartGame', true);
    },
    'AMAZON.HelpIntent': function () {
        this.handler.state = GAME_STATES.HELP;
        this.emitWithState('helpTheUser', true);
    },
    'Unhandled': function () {
        const speechOutput = this.t('START_UNHANDLED');
        this.emit(':ask', speechOutput, speechOutput);
    },
};

const triviaStateHandlers = Alexa.CreateStateHandler(GAME_STATES.TRIVIA, {
    'AnswerIntent': function () {
        handleUserGuess.call(this, false);
    },
    'DontKnowIntent': function () {
        handleUserGuess.call(this, true);
    },
    'AMAZON.StartOverIntent': function () {
        this.handler.state = GAME_STATES.START;
        this.emitWithState('StartGame', false);
    },
    'AMAZON.RepeatIntent': function () {
        this.emit(':ask', this.attributes['speechOutput'], this.attributes['repromptText']);
    },
    'AMAZON.HelpIntent': function () {
        this.handler.state = GAME_STATES.HELP;
        this.emitWithState('helpTheUser', false);
    },
    'AMAZON.StopIntent': function () {
        this.handler.state = GAME_STATES.HELP;
        const speechOutput = this.t('STOP_MESSAGE');
        this.emit(':ask', speechOutput, speechOutput);
    },
    'AMAZON.CancelIntent': function () {
        this.emit(':tell', this.t('CANCEL_MESSAGE'));
    },
    'Unhandled': function () {
        const speechOutput = this.t('TRIVIA_UNHANDLED', ANSWER_COUNT.toString());
        this.emit(':ask', speechOutput, speechOutput);
    },
    'SessionEndedRequest': function () {
        console.log(`Session ended in trivia state: ${this.event.request.reason}`);
    },
});

const helpStateHandlers = Alexa.CreateStateHandler(GAME_STATES.HELP, {
    /*
    'helpTheUser': function (newGame) {
        const askMessage = newGame ? this.t('ASK_MESSAGE_START') : this.t('REPEAT_QUESTION_MESSAGE') + this.t('STOP_MESSAGE');
        const speechOutput = this.t('HELP_MESSAGE', GAME_LENGTH) + askMessage;
        const repromptText = this.t('HELP_REPROMPT') + askMessage;
        this.emit(':ask', speechOutput, repromptText);
    },
    'AMAZON.RepeatIntent': function () {
        const newGame = !(this.attributes['speechOutput'] && this.attributes['repromptText']);
        this.emitWithState('helpTheUser', newGame);
    },*/
    'AMAZON.HelpIntent': function () {
        this.emitWithState('helpTheUser', 'Say lets play to play the game!');
    },
    'AMAZON.NoIntent': function () {
        this.emit(':tell', 'If youre not drunk you better have another beer. Bye!');
    },
    'AMAZON.StopIntent': function () {
        this.emit(':ask', 'Would you like to keep playing?', 'Would you like to keep playing?');
    },
    'AMAZON.CancelIntent': function () {
        this.emit(':tell', 'Fine but you better drink another beer.');
    },
    'Unhandled': function () {
        this.emit(':ask', 'Say lets play to play again.', 'Say lets play to play again.');
    },
});

exports.handler = function (event, context) {
    const alexa = Alexa.handler(event, context);
    alexa.appId = APP_ID;
    // To enable string internationalization (i18n) features, set a resources object.
    alexa.resources = languageString;
    alexa.registerHandlers(newSessionHandlers, startStateHandlers, triviaStateHandlers, helpStateHandlers);
    alexa.execute();
};
