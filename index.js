const fs = require("node:fs");
const path = require("node:path");
const express = require('express')
const cookieParser = require('cookie-parser')

const { Client, Collection, Events, GatewayIntentBits } = require("discord.js");
const firebaseAdmin = require('firebase-admin');
const serviceAccount = require('./firebase/fpmi-intermediary-firebase-adminsdk-re8cp-1f6379b6ea.json');
const { default: axios } = require("axios");
require("dotenv").config();

const client = new Client({ intents: [GatewayIntentBits.Guilds] });

firebaseAdmin.initializeApp({
  credential: firebaseAdmin.credential.cert(serviceAccount)
});

client.once(Events.ClientReady, (c) => {
  console.log(`Ready! Logged in as ${c.user.tag}`);
});

client.login(process.env.DISCORD_BOT_TOKEN);
client.commands = new Collection();
const foldersPath = path.join(__dirname, "commands");
const commandFolders = fs.readdirSync(foldersPath);

for (const folder of commandFolders) {
  const commandsPath = path.join(foldersPath, folder);
  const commandFiles = fs
    .readdirSync(commandsPath)
    .filter((file) => file.endsWith(".js"));
  for (const file of commandFiles) {
    const filePath = path.join(commandsPath, file);
    const command = require(filePath);
    // Set a new item in the Collection with the key as the command name and the value as the exported module
    if ("data" in command && "execute" in command) {
      client.commands.set(command.data.name, command);
    } else {
      console.log(
        `[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`
      );
    }
  }
}

client.on(Events.InteractionCreate, async (interaction) => {
  if (!interaction.isChatInputCommand()) return;

  const command = interaction.client.commands.get(interaction.commandName);

  if (!command) {
    console.error(`No command matching ${interaction.commandName} was found.`);
    return;
  }

  try {
    await command.execute(interaction);
  } catch (error) {
    console.error(error);
    if (interaction.replied || interaction.deferred) {
      await interaction.followUp({
        content: "There was an error while executing this command!",
        ephemeral: true,
      });
    } else {
      await interaction.reply({
        content: "There was an error while executing this command!",
        ephemeral: true,
      });
    }
  }
});

const app = express()
const port = 3000

app.use(cookieParser())

app.get('/auth', (req, res) => {
    res.cookie('discordUserId', req.query.userId)
    res.redirect('http://165.232.65.76/local/oauth/login.php?client_id=moodle_fpmi&response_type=code');
})

app.get('/oauth', async (req, res) => {
  try { 
const data = JSON.stringify({
  "code": req.query.code,
  "client_id": "moodle_fpmi",
  "client_secret": "55b18e8fee0bc5b3d353d0ff39c10d66c02792a8a411dba5",
  "grant_type": "authorization_code",
  "scope": "user_info"
});

const config = {
  method: 'post',
  url: 'http://165.232.65.76/local/oauth/token.php',
  headers: { 
    'Content-Type': 'application/json', 
    'Cookie': 'MoodleSession=ntc0j4dp6c4hufdjj2br2nj6kq'
  },
  data : data
};


    const userToken = await axios(config)
    console.log(userToken.data.access_token);
    
    const config2 = {
      method: 'post',
      url: `http://165.232.65.76/local/oauth/user_info.php?access_token=${userToken.data.access_token}`,
      headers: { 
        'Content-Type': 'application/json', 
        'Cookie': 'MoodleSession=ntc0j4dp6c4hufdjj2br2nj6kq'
      },
      data : {}
    };

    const userInfo = await axios(config2)

    const config3 = {
      method: 'get',
      url: `http://165.232.65.76/webservice/rest/server.php?wstoken=bdde525e8e4f79c8fc4dc791549a7593&wsfunction=local_wsgetusercohorts&userid=${userInfo.data.id}&moodlewsrestformat=json`,
      headers: { 
        'Content-Type': 'application/json', 
        'Cookie': 'MoodleSession=ntc0j4dp6c4hufdjj2br2nj6kq'
      },
      data : {}
    };

    const userCohorts = await axios(config3);
    firebaseAdmin.firestore().collection('students').doc(req.cookies.discordUserId).set({
      ...userInfo.data,
      code: req.query.code, 
      cohorts: userCohorts.data.cohorts,
    }, { merge: true})
    res.send(`OAuth complete with details: Code ${req.query.code} Discord: ${req.cookies.discordUserId}`)

  } catch (e){
    res.send(`OAuth failed. Please try again later`)
  }
    
    
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})