require('dotenv').config()
var config = require("./config.js")
var Web3 = require('web3')
var Botkit = require('botkit');
var os = require('os');
var web3 = new Web3();

let {NODE_URL, SENDER} = process.env

web3.setProvider(new Web3.providers.HttpProvider(NODE_URL))

if (!process.env.token) {
    console.log('Error: Specify token in environment');
    process.exit(1);
}

var controller = Botkit.slackbot({
    debug: false
});

controller.spawn({
    token: process.env.token
}).startRTM(function(err) {
    if (err) {
        throw new Error(err);
    }
});

controller.hears(['rince moi'], ['direct_mention'], function(bot, message) {
    var address = message.text.split('rince moi')[1].substring(1)

});