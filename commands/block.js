const Discord = require('discord.js')
const blocks = require('../models/blocked')
exports.run = async(client, message, args) => {
    if(!message.member.hasPermission('MANAGE_MESSAGES')) return message.delete()

    const user = message.guild.members.cache.get(args[0])
    if(!user) return message.channel.send('Please specify an ID of a user to blacklist from the bot.')

    const reason = args.splice(1).join(" ")
    if(!reason) return message.channel.send('Please specify a reason to blacklist that user from the bot.')

    new blocks({user: user.id, reason: reason}).save()

    message.channel.send(`${user} has been blacklisted successfully!`)
}