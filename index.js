const config = require('./config.json');
const Discord = require('discord.js');
const client = new Discord.Client();
const moment = require('moment');
const mongoose = require('mongoose');
const fs = require('fs')

client.mongoose = require('./utils/mongoose')

fs.readdir("./events/", (err, files) => {
    if (err) return console.error(err); 
    files.forEach(file => { 
      const event = require(`./events/${file}`);
      let eventName = file.split(".")[0];
      client.on(eventName, event.bind(null, client));
    });
  });

client.mongoose.init()
client.login(config.token);