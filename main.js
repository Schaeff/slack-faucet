var config = require("./config.js")
var Web3 = require('web3')
var Botkit = require('botkit');
var os = require('os');
var web3 = new Web3();
web3.setProvider(new Web3.providers.HttpProvider("http://" + config.node.host + ":" + config.node.port))
var sender = config.sender || web3.eth.coinbase

if(!web3.isAddress(sender)) {
    console.log('Error: Sender is invalid');
    process.exit(1);
}

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
    if(!web3.isAddress(address)) {
        return bot.reply(message, "C'est pas une addresse ça frère.")
    }
    bot.reply(message, "Ok j'essaie de balancer " + config.sum + " ether frère.")
    web3.eth.sendTransaction({from: sender, to: address, value: web3.toWei(config.sum, 'wei')}, function(err, res) {
        if(err) {
            return bot.reply(message, "Belek ça marche pas frère")
        }
        return bot.reply(message, "De rien frère! :moneybag:")
    })
});