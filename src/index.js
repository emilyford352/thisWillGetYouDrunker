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

    var intent = intentRequest.intent;
    var intentName = intent.name;

    handlePlayerNameResponse(intentRequest, session, callback);


    // dispatch custom intents to handlers here
    if (intentName == "PlayerNamesIntent") {
        handlePlayerNameResponse(intent, session, callback);
    }
    /*else if (intentName === "AMAZON.YesIntent") {

    } else if (intentName === "AMAZON.NoIntent") {


    } else if (intentName === "AMAZON.StopIntent") {

    } else if (intentName === "AMAZON.CancelIntent") {

    } else {
        throw "Invalid intent";
    }*/
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
        " all of the first names of the players starting with the players are...including " +
        "if you're playing alone, you alcoholic.";

    var reprompt = "Tell me the names, you filthy animals. ";

    var header = "This game will get you drunker!";

    var shouldEndSession = false;

    var sessionAttributes = {
        "speechOutput" : speechOutput
        , "repromptText" : reprompt
    };

    callback(sessionAttributes, buildSpeechletResponse(header, speechOutput, reprompt, shouldEndSession));
}

function  handlePlayerNameResponse(intent, session, callback) {
    console.log(intent);

    var speechOutput = "Okay! You have " + intent + " players. Let's begin."

    var reprompt = "Let's play!";

    var header = "This game will get you drunker!";

    var shouldEndSession = false;

    var sessionAttributes = {
        "speechOutput" : speechOutput
        , "repromptText" : reprompt
    };

    callback(sessionAttributes, buildSpeechletResponse(header, speechOutput, reprompt, shouldEndSession));
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