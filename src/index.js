var everyoneDrinks = [
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
    "Drink if play video games",
    "Drink if you have an iPhone",
    "Drink if you have an Android",
    "Drink if you like tacos",
    "Drink if you have a penis",
    "Drink if you have boobs",
    "Drink if you like pina cooladas and getting caught in the rain",
    "Drink if you have ever cried watching Titanic",
    "Drink if you have ever run over a squirrel",
    "Drink if you have glasses",
    "Drink if you love sushi",
]

var onePersonDrinksTrivia = [
    "Whoever had the most recent birthday",
    "The youngest",
    "The oldest",
    "The shortest",
    "The person with longest hair",
    "The nicest person",
    "The biggest asshole ",
    "The funniest person ",
    "The nerdiest person ",
    "The most likely to end up naked, outside their grandma's rosebush at 4am",
    "The most likely to be a millionare ",
    "The most athletic ",
    "The person with the nicest butt ",
    "The person most likely to go to bed at 9pm ",
    "The person that is most likely to end up with 18 cats, 9 dogs and athritis ",
    "The person who will most likely be CEO of Apple ",
    "The person most likely to bring an escort to the mall for a date",
    "The person most likely to streak at a sporting event",
    "The person most likely to be president",
    "Most likely to have a Britney Spears breakdown"

]

var triviaQuestions = [
    {
        'question' : 'question 1'
        , 'answer' : 'test'
    }
];




// Route the incoming request based on type (LaunchRequest, IntentRequest,
// etc.) The JSON body of the request is provided in the event parameter.
exports.handler = function (event, context) {
    try {
        console.log("event.session.application.applicationId=" + event.session.application.applicationId);

        /**
         * Uncomment this if statement and populate with your skill's application ID to
         * prevent someone else from configuring a skill that sends requests to this function.
         */

        // if (event.session.application.applicationId !== "") {
        //     context.fail("Invalid Application ID");
        //  }

        if (event.session.new) {
            onSessionStarted({requestId: event.request.requestId}, event.session);
        }

        if (event.request.type === "LaunchRequest") {
            onLaunch(event.request,
                event.session,
                function callback(sessionAttributes, speechletResponse) {
                    context.succeed(buildResponse(sessionAttributes, speechletResponse));
                });
        } else if (event.request.type === "IntentRequest") {
            onIntent(event.request,
                event.session,
                function callback(sessionAttributes, speechletResponse) {
                    context.succeed(buildResponse(sessionAttributes, speechletResponse));
                });
        } else if (event.request.type === "SessionEndedRequest") {
            onSessionEnded(event.request, event.session);
            context.succeed();
        }
    } catch (e) {
        context.fail("Exception: " + e);
    }
};

/**
 * Called when the session starts.
 */
function onSessionStarted(sessionStartedRequest, session) {
    // add any session init logic here
}

/**
 * Called when the user invokes the skill without specifying what they want.
 */
function onLaunch(launchRequest, session, callback) {
    getWelcomeResponse(callback);
}

/**
 * Called when the user specifies an intent for this skill.
 */
function onIntent(intentRequest, session, callback) {

    var intent = intentRequest;
    var intentName = intentRequest.intent.name;

    handlePlayerNameResponse(intentRequest, session, callback);

    // dispatch custom intents to handlers here
    if (intentName == "PlayerNamesIntent") {
        handlePlayerNameResponse(intent, session, callback);
    }
}

/**
 * Called when the user ends the session.
 * Is not called when the skill returns shouldEndSession=true.
 */
function onSessionEnded(sessionEndedRequest, session) {

}

// ------- Skill specific logic -------

function getWelcomeResponse(callback) {
    var speechOutput = "Get ready. If you're not drunk enough already, this game will get you drunker. Tell me" +
        " how many players there are starting with the phrase there are...including if it's just you, you alcoholic.";

    var reprompt = "Tell me the names, you filthy animals.";

    var header = "This game will get you drunker!";

    var shouldEndSession = false;

    var sessionAttributes = {
        "speechOutput" : speechOutput
        , "repromptText" : reprompt
    };

    callback(sessionAttributes, buildSpeechletResponse(header, speechOutput, reprompt, shouldEndSession));
}

function  handlePlayerNameResponse(intent, session, callback) {
    var speechOutput = "Okay! You have " + intent.intent.slots.PlayerNumber.value + " players. Everyone shout out one " +
        "of the numbers; whoever was first claims that number. Let's begin. Say let's play to start.";

    var reprompt = "Say let's play!";

    var header = "This game will get you drunker!";

    var shouldEndSession = false;

    var sessionAttributes = {
        "speechOutput" : speechOutput
        , "repromptText" : reprompt
    };

    callback(sessionAttributes, buildSpeechletResponse(header, speechOutput, reprompt, shouldEndSession));
}

function handleLetsPlay(intent, session, callback) {

}

function handleTrivia(intent, session, callback) {

}

function handleGetHelpRequest(intent, session, callback) {
    // Ensure that session.attributes has been initialized
    if (!session.attributes) {
        session.attributes = {};

    }
}

function handleFinishSessionRequest(intent, session, callback) {
    // End the session with a "Good bye!" if the user wants to quit the game
    callback(session.attributes,
        buildSpeechletResponseWithoutCard("You better all be drunk...bye!", "", true));
}


// ------- Helper functions to build responses for Alexa -------


    function buildSpeechletResponse(title, output, repromptText, shouldEndSession) {
        return {
            outputSpeech: {
                type: "PlainText",
                text: output
            },
            card: {
                type: "Simple",
                title: title,
                content: output
            },
            reprompt: {
                outputSpeech: {
                    type: "PlainText",
                    text: repromptText
                }
            },
            shouldEndSession: shouldEndSession
        };
    }

    function buildSpeechletResponseWithoutCard(output, repromptText, shouldEndSession) {
        return {
            outputSpeech: {
                type: "PlainText",
                text: output
            },
            reprompt: {
                outputSpeech: {
                    type: "PlainText",
                    text: repromptText
                }
            },
            shouldEndSession: shouldEndSession
        };
    }

    function buildResponse(sessionAttributes, speechletResponse) {
        return {
            version: "1.0",
            sessionAttributes: sessionAttributes,
            response: speechletResponse
        };
    }