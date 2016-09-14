/**
    Copyright 2014-2015 Amazon.com, Inc. or its affiliates. All Rights Reserved.
    Licensed under the Apache License, Version 2.0 (the "License"). You may not use this file except in compliance with the License. A copy of the License is located at
        http://aws.amazon.com/apache2.0/
    or in the "license" file accompanying this file. This file is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and limitations under the License.
*/

/**
 * This simple sample has no external dependencies or session management, and shows the most basic
 * example of how to create a Lambda function for handling Alexa Skill requests.
 *
 * Examples:
 * One-shot model:
 *  User: "Alexa, ask Soccer Geek for a soccer fact"
 *  Alexa: "Here's your soccer fact: ..."
 */

/**
 * App ID for the skill
 */
var APP_ID = undefined; //OPTIONAL: replace with "amzn1.echo-sdk-ams.app.[your-unique-value-here]";

/**
 * Array containing soccer facts.
 */
var FACTS = [
    "The sport soccer that is played in the United States is actually called football is all other countries, except Canada.",
    "Soccer is a sport played between two teams of eleven players with a spherical ball.",
    "It is played by 250 million players in over 200 countries and dependencies, making it the world's most popular sport.",
    "The game is played on a rectangular field with a goal at each end. ",
    "The object of the game is to score by getting the ball into the opposing goal.",
    "The goalkeepers are the only players allowed to touch the ball with their hands or arms while it is in play and only in their penalty area.",
    "Other players mainly use their feet to strike or pass the ball, but may also use their head or torso.",
    "According to FIFA, the Chinese competitive game cuju, which means kick ball in Chinese, is the earliest form of football for which there is scientific evidence of the game starting in the Han Dynasty in 206 BC.",
    "The formation of The Football Association in 1863 was at Freemasons' Tavern in Great Queen Street, London.",
    "The world's oldest football competition is the FA Cup, which was founded by C. W. Alcock and has been contested by English teams since 1872.",
    "The ball is spherical with a circumference of between 27 and 28 inches, a weight in the range of 14 to 16 oz, and a pressure of between 8.5 and 15.6 psi at sea level.",
    "The length of the pitch for international adult matches is in the range of 100–110 meters and the width is in the range of 64–75 meters.",
    "The major international competition in football is the World Cup, organised by FIFA. This competition takes place every four years. ",
    "Approximately 190–200 national teams compete in qualifying tournaments within the scope of continental confederations for a place in the finals. The finals tournament, which is held every four years, involves 32 national teams competing over a four-week period.",
    "The most recent winner of the World Cup was Germany in 2014. The winner of the first World Cup was Uraguay in 1930."

];

/**
 * The AlexaSkill prototype and helper functions
 */
var AlexaSkill = require('./AlexaSkill');

/**
 * Soccer is a child of AlexaSkill.
 * To read more about inheritance in JavaScript, see the link below.
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Introduction_to_Object-Oriented_JavaScript#Inheritance
 */
var Fact = function () {
    AlexaSkill.call(this, APP_ID);
};

// Extend AlexaSkill
Fact.prototype = Object.create(AlexaSkill.prototype);
Fact.prototype.constructor = Fact;

Fact.prototype.eventHandlers.onSessionStarted = function (sessionStartedRequest, session) {
    //console.log("onSessionStarted requestId: " + sessionStartedRequest.requestId + ", sessionId: " + session.sessionId);
    // any initialization logic goes here
};

Fact.prototype.eventHandlers.onLaunch = function (launchRequest, session, response) {
    //console.log("onLaunch requestId: " + launchRequest.requestId + ", sessionId: " + session.sessionId);
    handleNewFactRequest(response);
};

/**
 * Overridden to show that a subclass can override this function to teardown session state.
 */
Fact.prototype.eventHandlers.onSessionEnded = function (sessionEndedRequest, session) {
    //console.log("onSessionEnded requestId: " + sessionEndedRequest.requestId + ", sessionId: " + session.sessionId);
    // any cleanup logic goes here
};

Fact.prototype.intentHandlers = {
    "GetNewFactIntent": function (intent, session, response) {
        handleNewFactRequest(response);
    },

    "AMAZON.HelpIntent": function (intent, session, response) {
        response.ask("You can say tell me a soccer fact, or, you can say exit... What can I help you with?", "What can I help you with?");
    },

    "AMAZON.StopIntent": function (intent, session, response) {
        var speechOutput = "Goodbye";
        response.tell(speechOutput);
    },

    "AMAZON.CancelIntent": function (intent, session, response) {
        var speechOutput = "Goodbye";
        response.tell(speechOutput);
    }
};

/**
 * Gets a random new fact from the list and returns to the user.
 */
function handleNewFactRequest(response) {
    // Get a random soccer fact from the soccer facts list
    var factIndex = Math.floor(Math.random() * FACTS.length);
    var randomFact = FACTS[factIndex];

    // Create speech output
    var speechOutput = "Here's your fact: " + randomFact;
    var cardTitle = "Your Fact";
    response.tellWithCard(speechOutput, cardTitle, speechOutput);
}

// Create the handler that responds to the Alexa Request.
exports.handler = function (event, context) {
    // Create an instance of the SoccerGeek skill.
    var fact = new Fact();
    fact.execute(event, context);
};