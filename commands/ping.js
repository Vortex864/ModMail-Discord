const Discord = require('discord.js')
exports.run = async(client, message, args) => {
      if(!message.member.hasPermission('MANAGE_MESSAGES')) return message.delete()
      message.channel.send('Pinging...').then((resultMessage) => {
        const ping = resultMessage.createdTimestamp - message.createdTimestamp
  
        resultMessage.edit(`Bot latency: ${ping}ms, API Latency: ${client.ws.ping}ms`)
      })
    }