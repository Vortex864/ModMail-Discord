# Discord ModMail

ModMail for Discord is used in many ways, such as Contacting Staff for help or requesting a Role from the server. This Repository is a Discord ModMail Bot purely made by me for Public use!

This Bot allows you to select an Option from the ModMail Menu to fulfill the user's needs, Once the user submits a request the bot will post the message in the specific channel for the Staff Members to handle. Follow the following steps to learn how you can create the bot!

### Steps to Use

- Create a Discord Bot on the [Discord Developer Portal](https://discord.com/developers) and Invite the bot to your server!
- Install Node.JS at [NodeJS Org](https://nodejs.org)
- Clone this Repository
- Rename the file: `config-example.json` to `config.json`
- Enter the needed information in config.json. Read [Config Keys](https://github.com/sascox555/ModMail-Discord#config-keys) For more info!
- Customize `events/message.js` and `events/ready.js` to match your server's needs.
- Open your Terminal
- Run `npm i` to Install the required packages.
- Run `node index.js` to Start your bot!
- Enjoy your own personal ModMail Bot!

### Config Keys

- token: Your Discord Bot token, found at the [Discord Developer Portal](https://discord.com/developers)
- prefix: Your Bot's Prefix, you can make this anything you want (A single character is most recommended)
- mongodbURI: Your MongoDB Database URI, can be locally hosted or MongoDB Atlas

### Code of Conduct

✓ You are allowed to Use this Template to create a Private ModMail Bot (with the use of this template) which cannot be publicly invited to any server. Recommended to be used for a single server as a Private ModMail Bot.<br>
✗ You are NOT allowed to create a Public ModMail Bot (with the use of this template) which can be publicly invited to any server. Doing so may result in legal action taken against you for "Violation of our Code of Conduct".

### Liscence
MIT License
