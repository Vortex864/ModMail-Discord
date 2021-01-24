const Discord = require('discord.js');
const config = require('../config.json');
const blocks = require('../models/blocked');
const collectorrun = require('../models/collectorrun');
module.exports = async (client, message) => {

    if(message.author.bot) return;
    if(message.system) return;

    var userIsBlacklisted = await blocks.findOne({user: message.author.id});
    if(userIsBlacklisted) return;


    if(message.guild === null) {

        if(message.content.toLowerCase() === 'request role') {
            var userHasCollector = await collectorrun.findOne({user: message.author.id})
            if(userHasCollector) return;

            const rolerequest = new Discord.MessageEmbed()
            .setTitle('Role Request')
            .setDescription('Please react with the corresponding reaction for the Role you want to claim.\n\n1️⃣ - YouTuber\n2️⃣ - Twitch Streamer\n3️⃣ - Media Star\n4️⃣ - Giveaways Conductor\n\nIf the role you want to claim is something else, Please DM a Moderator to claim your role!')
            message.author.send(rolerequest).then((reqrole) => {
                reqrole.react('1️⃣');
                reqrole.react('2️⃣');
                reqrole.react('3️⃣');
                reqrole.react('4️⃣');
          
                const reqrolefilter = (reaction, user) => {
                  return ['1️⃣', '2️⃣', '3️⃣', '4️⃣'].includes(reaction.emoji.name) && !user.bot;
                };

                const reqrolecollector = reqrole.createReactionCollector(reqrolefilter, {
                    max: 1,
                    time: 30000
                  });

                  reqrolecollector.on('end', (collected, reason) => {
                    if (reason === 'time') {
                      message.author.send('Operation canceled due to inactivity...');
                    } else {
                      let userReaction = collected.array()[0];
                      let emoji = userReaction._emoji.name;

                      if (emoji === '1️⃣') {
                        message.author.send('Your request has been submitted!\nNote: You will not receive a response from ModMail for getting accepted or denied.')

                        const channel = client.channels.cache.find(c => c.name === 'role-requests')

                        const reqroleresultembed = new Discord.MessageEmbed()
                        .setTitle('New Role Request')
                        .addField('User:', message.author, true)
                        .addField('Role Requested:', 'YouTuber', false)
                        .addField('Does Meet Requirements:', 'Manual Check Required', false)
                        .setColor('RANDOM')
                        .setTimestamp()
                        .setFooter(`ID: ${message.author.id}`)
                        channel.send(reqroleresultembed)

                      } else if (emoji === '2️⃣') {
                        message.author.send('Your request has been submitted!\nNote: You will not receive a response from ModMail for getting accepted or denied.')

                        const channel1 = client.channels.cache.find(c => c.name === 'role-requests')

                        const reqroleresultembed1 = new Discord.MessageEmbed()
                        .setTitle('New Role Request')
                        .addField('User:', message.author, true)
                        .addField('Role Requested:', 'Twitch Streamer', false)
                        .addField('Does Meet Requirements:', 'Manual Check Required', false)
                        .setColor('RANDOM')
                        .setTimestamp()
                        .setFooter(`ID: ${message.author.id}`)
                        return channel1.send(reqroleresultembed1)
                        
                      } else if (emoji === '3️⃣') {
                        message.author.send('Your request has been submitted!\nNote: You will not receive a response from ModMail for getting accepted or denied.')

                        const channel2 = client.channels.cache.find(c => c.name === 'role-requests')

                        const reqroleresultembed2 = new Discord.MessageEmbed()
                        .setTitle('New Role Request')
                        .addField('User:', message.author, true)
                        .addField('Role Requested:', 'Media Star', false)
                        .addField('Does Meet Requirements:', 'Manual Check Required', false)
                        .setColor('RANDOM')
                        .setTimestamp()
                        .setFooter(`ID: ${message.author.id}`)
                        return channel2.send(reqroleresultembed2)
                        
                      } else if (emoji === '4️⃣') {
                        message.author.send('Your request has been submitted!\nNote: You will not receive a response from ModMail for getting accepted or denied.')

                        const channel3 = client.channels.cache.find(c => c.name === 'role-requests')

                        const reqroleresultembed3 = new Discord.MessageEmbed()
                        .setTitle('New Role Request')
                        .addField('User:', message.author, true)
                        .addField('Role Requested:', 'Giveaways Conductor', false)
                        .addField('Does Meet Requirements:', 'Manual Check Required', false)
                        .setColor('RANDOM')
                        .setTimestamp()
                        .setFooter(`ID: ${message.author.id}`)
                        return channel3.send(reqroleresultembed3)
                        
                      } else {
                          return message.author.send('That\'s not a valid reaction!')
                      }
                    }
                })
            })
        }
        if(message.content.toLowerCase() === 'appeal') {
            var userHasCollector = await collectorrun.findOne({user: message.author.id})
            if(userHasCollector) return;

            const questions = [`Which type of Punishment did you receive? (Eg:- Warn, Mute etc.)`, `Why did you receive this Punishment/The Punishment Reason?`, `Why do you think this Punishment is Unjustified?`, `What's your Punishment ID? (The Punishment ID should be given in DM's from Auttaja)`];
        const dmChannel = await message.author.send('Please answer the following questions to submit your appeal.');
        const collector = dmChannel.channel.createMessageCollector((msg) => msg.author.id == message.author.id);
        let i = 0;
        const res = [];
        dmChannel.channel.send(questions[0])
        new collectorrun({user: message.author.id}).save()
        collector.on('collect', async(msg) => {


            if (questions.length == i) return collector.stop('MAX');
            const answer = msg.content;
            res.push({ question: questions[i], answer });
            i++;
            if (questions.length == i) return collector.stop('MAX');
            else {
                dmChannel.channel.send(questions[i]);
            }
        });
        collector.on('end', async(collected, reason) => {
            var userHasCollector = await collectorrun.findOne({user: message.author.id});
            if(userHasCollector) {
                userHasCollector.remove();
            }
            if (reason == 'MAX') {

                const appealEmbed = new Discord.MessageEmbed()
                .setTitle('New Punishment Appeal')
                .setDescription(`New Punishment Appeal by ${message.author}\n${res.map(d => `\n**${d.question}** - ${d.answer}`).join("\n")}`)
                .setColor('RANDOM')
                .setFooter(`ID: ${message.author.id}`)
                .setTimestamp()
                let appealChannel = client.channels.cache.get('802789319428407296')
                message.author.send(`Your request has been submitted!\nNote: You will not receive a response from ModMail for getting accepted or denied.`)
                return appealChannel.send(appealEmbed)
            }
        })
        }
        if(message.content.toLowerCase() === 'report user') {
            var userHasCollector = await collectorrun.findOne({user: message.author.id})
            if(userHasCollector) return;

            const questions = [`Who are you reporting? (Please specify their ID)`, `Why are you reporting that user/Which rule did they break?`, `Do you have any evidence for this report? (If yes, Please upload the image on Imgur and paste the link here)`];
            const dmChannel = await message.author.send('Please answer the following questions to submit your report.');
            const collector = dmChannel.channel.createMessageCollector((msg) => msg.author.id == message.author.id);
            let i = 0;
            const res = [];
            dmChannel.channel.send(questions[0])
            new collectorrun({user: message.author.id}).save()
            collector.on('collect', async(msg) => {

                if (questions.length == i) return collector.stop('MAX');
                const answer = msg.content;
                res.push({ question: questions[i], answer });
                i++;
                if (questions.length == i) return collector.stop('MAX');
                else {
                    dmChannel.channel.send(questions[i]);
                }
            });
            collector.on('end', async(collected, reason) => {
                var userHasCollector = await collectorrun.findOne({user: message.author.id});
                if(userHasCollector) {
                    userHasCollector.remove();
                }
                if (reason == 'MAX') {
    
                    const uReportEmbed = new Discord.MessageEmbed()
                    .setTitle('New User Report')
                    .setDescription(`New User Report by ${message.author}\n${res.map(d => `\n**${d.question}** - ${d.answer}`).join("\n")}`)
                    .setColor('RANDOM')
                    .setFooter(`ID: ${message.author.id}`)
                    .setTimestamp()
                    let uReportChannel = client.channels.cache.get('802789345957642291')
                    message.author.send(`Your request has been submitted!\nNote: You will not receive a response from ModMail for getting accepted or denied.`)
                    return uReportChannel.send(uReportEmbed)
                }
            })
        }
        if(message.content.toLowerCase() === 'report staff') {
            var userHasCollector = await collectorrun.findOne({user: message.author.id})
            if(userHasCollector) return;

            const questions = [`Which Staff Member are you reporting? (Please specify their ID)`, `Why are you reporting that Staff Member/What did they do?`, `Do you have any evidence for this report? (If yes, Please upload the image on Imgur and paste the link here)`];
            const dmChannel = await message.author.send('Please answer the following questions to submit your report.');
            const collector = dmChannel.channel.createMessageCollector((msg) => msg.author.id == message.author.id);
            let i = 0;
            const res = [];
            dmChannel.channel.send(questions[0])
            new collectorrun({user: message.author.id}).save()
            collector.on('collect', async(msg) => {

                if (questions.length == i) return collector.stop('MAX');
                const answer = msg.content;
                res.push({ question: questions[i], answer });
                i++;
                if (questions.length == i) return collector.stop('MAX');
                else {
                    dmChannel.channel.send(questions[i]);
                }
            });
            collector.on('end', async(collected, reason) => {
                var userHasCollector = await collectorrun.findOne({user: message.author.id});
                if(userHasCollector) {
                    userHasCollector.remove();
                }
                if (reason == 'MAX') {
    
                    const sReportEmbed = new Discord.MessageEmbed()
                    .setTitle('New Staff Report')
                    .setDescription(`New Staff Report by ${message.author}\n${res.map(d => `\n**${d.question}** - ${d.answer}`).join("\n")}`)
                    .setColor('RANDOM')
                    .setFooter(`ID: ${message.author.id}`)
                    .setTimestamp()
                    let sReportChannel = client.channels.cache.get('802789375330222091')
                    message.author.send(`Your request has been submitted!\nNote: You will not receive a response from ModMail for getting accepted or denied.`)
                    return sReportChannel.send(sReportEmbed)
                }
            })
        }
        if(message.content.toLowerCase() === 'post art') {
            var userHasCollector = await collectorrun.findOne({user: message.author.id})
            if(userHasCollector) return;

            const questions = [`Which type of Art are you posting? (Eg:- Drawing, Photograph etc.)`, `How much time did it take for you to create this art? (Doesn't apply if it's a photograph)`, `Please provide the link of your image here (Upload the image of your Art on Imgur and paste the link here)`];
            const dmChannel = await message.author.send('Please answer the following questions to submit your Art.');
            const collector = dmChannel.channel.createMessageCollector((msg) => msg.author.id == message.author.id);
            let i = 0;
            const res = [];
            dmChannel.channel.send(questions[0])
            new collectorrun({user: message.author.id}).save()
            collector.on('collect', async(msg) => {

                if (questions.length == i) return collector.stop('MAX');
                const answer = msg.content;
                res.push({ question: questions[i], answer });
                i++;
                if (questions.length == i) return collector.stop('MAX');
                else {
                    dmChannel.channel.send(questions[i]);
                }
            });
            collector.on('end', async(collected, reason) => {
                var userHasCollector = await collectorrun.findOne({user: message.author.id});
                if(userHasCollector) {
                    userHasCollector.remove();
                }
                if (reason == 'MAX') {
    
                    const artEmbed = new Discord.MessageEmbed()
                    .setTitle('New Art Request')
                    .setDescription(`New Art Post Request by ${message.author}\n${res.map(d => `\n**${d.question}** - ${d.answer}`).join("\n")}`)
                    .setColor('RANDOM')
                    .setFooter(`ID: ${message.author.id}`)
                    .setTimestamp()
                    let artChannel = client.channels.cache.get('802789438907613194')
                    message.author.send(`Your request has been submitted!\nNote: You will not receive a response from ModMail for getting accepted or denied.`)
                    return artChannel.send(artEmbed)
                }
            })
        }
        if(message.content.toLowerCase() === 'other') {
            var userHasCollector = await collectorrun.findOne({user: message.author.id})
            if(userHasCollector) return;

            return message.author.send('Please DM am Online Staff Member for more support, ModMail is currently limited to only the specified queries.')
        }
        if(message.content.toLowerCase() === 'partnerships') {
            var userHasCollector = await collectorrun.findOne({user: message.author.id})
            if(userHasCollector) return;
            
            return message.author.send('Please DM an Online Partner Manager to partner with the server, ModMail is currently limited to only Moderation related queries.')
        }

            var importantthing = await collectorrun.findOne({user: message.author.id});
            if(!importantthing) {
                if(message.content.toLowerCase() === 'request role') return;
                if(message.content.toLowerCase() === 'appeal') return;
                if(message.content.toLowerCase() === 'report user') return;
                if(message.content.toLowerCase() === 'report staff') return;
                if(message.content.toLowerCase() === 'post art') return;
                if(message.content.toLowerCase() === 'other') return;
                if(message.content.toLowerCase() === 'partnerships') return;

        const embed = new Discord.MessageEmbed()
        .setTitle('Volcania ModMail System')
        .setDescription('Please choose the most suitable option from the following. Eg:- \`request role\`')
        .addField('Request Role', 'Request an obtainable Role from the server, make sure you meet requirements first. Read <#712662776233066598> for more info!', true)
        .addField('Appeal', 'Appeal a Punishment in the server. Note: This is not to appeal Verbal Warns. *Only head moderators or higher can review appeals so please be patient.*', false)
        .addField('Report User', 'Report a User who broke the server rules. Note: This is not to report Staff Members, use the next option for that.', false)
        .addField('Report Staff', 'Report a Staff Member who broke the server rules or abused their permissions. Note: This is not to report normal users, use the previous option for that. *Only Administrators or higher can review Staff Reports so please be patient*', false)
        .addField('Post Art', 'Have any art you made to post in the art channels? Submit it here! Note: All submissions will be reviewed and checked by Staff and Art Posters. *Stealing art will result in punishments*', false)
        .addField('Partnerships', 'Wanna Partner with us? Type \`partnerships\`!')
        .addField('Other', 'Have any other queries or issues which are not listed here? Choose this option!', false)
        .setColor('RANDOM')
        .setFooter('Created and designed by SascoOMG#0001')
        message.author.send(embed)
            }
    }

    var prefix = config.prefix;
    if (!message.content.toLowerCase().startsWith(prefix)) return;
  
    var args = message.content.split(' ');
    var cmd = args.shift().slice(prefix.length).toLowerCase();
  
    try {
      var file = require(`../commands/${cmd}.js`);
      file.run(client, message, args);
    } catch (err) {
      console.log(console.log(err));
    }
}