const { Client, Collection } = require("discord.js");
const { Token } = require("./congif.json");
const client = new Client({ intents: 32767, partials: ['CHANNEL']});

const mysql = require("mysql");
const { promisify } = require("util");
const { glob } = require("glob");
const PG = promisify(glob);
const Ascii = require("ascii-table");
//iE!c5CXdG6RR5IGllYM&

client.commands = new Collection();

const { DisTube } = require("distube");
const { SpotifyPlugin } = require("@distube/spotify")

client.distube = new DisTube(client, {
    emitNewSongOnly: true, 
    leaveOnFinish: true,
    emitAddSongWhenCreatingQueue: false,
    plugins: [new SpotifyPlugin]
})
module.exports = client;;

["Events", "Commands"].forEach(handler => {
    require(`./Handlers/${handler}`)(client, PG, Ascii);
});

client.login(Token);

/*
const connection = mysql.createConnection({
    host: 'localhost',
    user: '',
    port: 3306,
    password: '',
    database: 'discord',
});

connection.connect(function (err){
    if(err) throw err;

    console.log("Connexion avec la base de donnée effectué !");
})*/
