const { Client, MessageEmbed } = require("discord.js");
const { TaskTimer } = require('tasktimer');
const ping = require('minecraft-server-util');
let config = require("../../Structures/congif.json");

let waiting;

module.exports = {
    name: "ready",
    once: true,
    /**
    * @param {Client} client
    * @param {mysql} mysql
    * @param {TaskTimer} timer;
    */

    async execute(client) {

        const channel = client.channels.cache.get("932977192718196798");

        console.log("SB => Le Bot est en ligne !");
        client.user.setActivity("play.supremsky.fr", { type: "PLAYING" });

        let players = 0;
        let maxplayers = 0;
        let version = "NaN";
        let motd = "NaN";
        let maintenance = false;
        let on = false;
        let descmaintenance = "";

        waiting = new MessageEmbed()
            .setAuthor({ name: 'SupremSky', iconURL: client.user.avatarURL() })
            .setDescription('Suivi des statuts et éventuelles perturbations sur notre réseau.')
            .setThumbnail('https://i.imgur.com/AfFp7pu.png')
            .addFields(
                { name: '\u200B', value: '\u200B' },
                { name: 'SkyBlock', value: '🟣ㅤRecherche en cours ... \n\nAnalyse des données en cours. Affichage dans quelques instants.\n\u200B' },
                { name: 'Joueurs', value: `NaN/NaN`, inline: true },
                { name: 'Version', value: `NaN\n\u200B`, inline: true },
            )
            //.setImage('https://i.imgur.com/AfFp7pu.png')
            .setTimestamp()
            .setFooter({ text: 'En direct', iconURL: client.user.avatarURL() })
            .setColor("BLURPLE");

        editMessage(channel, waiting);

        const timer = new TaskTimer(5000);

        timer.add([
            {
                id: "skyblock",
                tickInterval: "10",
                totalRuns: 0,
                callback(task) {
                    maintenance = config.sbmaintenance;
                    descmaintenance = config.descmaintenance;

                    ping.status("149.91.89.92", 25565).then((result) => {
                        on = true;
                        players = result.players.online;
                        maxplayers = result.players.max;
                        version = result.version.name;
                        motd = result.motd.clean;
                        update(players, version, maxplayers, channel, client, maintenance, descmaintenance, on);
                    }).catch((error) => {
                        on = false;
                        update(players, version, maxplayers, channel, client, maintenance, descmaintenance, on);
                    });
                }
            }
        ]);

        timer.start();

    }
}

function update(players, version, maxplayers, channel, client, maintenance, descmaintenance, on) {
    let reload;
    if (on && !maintenance) {
        reload = new MessageEmbed()
            .setColor("DARK_GREEN")
            .setTitle("Statut de l'infrastructure")
            //.setURL('https://discord.js.org/')
            .setAuthor({ name: 'SupremSky', iconURL: client.user.avatarURL() })
            .setDescription('Suivi des statuts et éventuelles perturbations sur notre réseau.')
            .setThumbnail('https://i.imgur.com/AfFp7pu.png')
            .addFields(
                { name: '\u200B', value: '\u200B' },
                { name: 'SkyBlock', value: '🟢ㅤEN LIGNE\n\u200B' },
                //{ name: '\u200B', value: '\u200B' },
                { name: 'Joueurs', value: `${players}/${maxplayers}`, inline: true },
                { name: 'Version', value: `${version}\n\u200B`, inline: true },
            )
            //.setImage('https://i.imgur.com/AfFp7pu.png')
            .setTimestamp()
            .setFooter({ text: 'En direct', iconURL: client.user.avatarURL() });
    } else if (maintenance) {
        reload = new MessageEmbed()
            .setColor("ORANGE")
            .setTitle("Statut de l'infrastructure")
            //.setURL('https://discord.js.org/')
            .setAuthor({ name: 'SupremSky', iconURL: client.user.avatarURL() })
            .setDescription('Suivi des statuts et éventuelles perturbations sur notre réseau.')
            .setThumbnail('https://i.imgur.com/AfFp7pu.png')
            .addFields(
                { name: '\u200B', value: '\u200B' },
                { name: 'SkyBlock', value: '🟠ㅤMAINTENANCE\n\u200B' },
                { name: 'Maintenance', value: `Une maintenance est en cours. Suivez ce canal pour plus d'information.\n\u200B`, inline: true },
            )
            //.setImage('https://i.imgur.com/AfFp7pu.png')
            .setTimestamp()
            .setFooter({ text: 'En direct', iconURL: client.user.avatarURL() });
    } else if (!on && !maintenance) {
        reload = new MessageEmbed()
            .setColor('RED')
            .setTitle("Statut de l'infrastructure")
            //.setURL('https://discord.js.org/')
            .setAuthor({ name: 'SupremSky', iconURL: client.user.avatarURL() })
            .setDescription('Suivi des statuts et éventuelles perturbations sur notre réseau.')
            .setThumbnail('https://i.imgur.com/AfFp7pu.png')
            .addFields(
                { name: '\u200B', value: '\u200B' },
                { name: 'SkyBlock', value: '🔴ㅤHORS LIGNE\n\u200B' },
                { name: 'Joueurs', value: `${0}/${maxplayers}`, inline: true },
                { name: 'Version', value: `${version}\n\u200B`, inline: true },
            )
            //.setImage('https://i.imgur.com/AfFp7pu.png')
            .setTimestamp()
            .setFooter({ text: "En direct", iconURL: client.user.avatarURL() });
    } else {
        reload = waiting;
        client.channels.cache.get(config.ImportantChannel).send("Erreur lors de la récupération du statut du serveur pour l'affichage discord. #0132")
    }
    editMessage(channel, reload);
}

function editMessage(channel, embeds) {
    channel.messages.fetch('932980199027531778').then(msg => {
        msg.edit({ embeds: [embeds] });
    }).catch(error => {
        console.error(error);
        channel.send({ embeds: [new MessageEmbed().setTitle("Chargement ...")] })
        client.channels.cache.get(config.ImportantChannel).send("Erreur lors de la récupération du statut du serveur pour l'affichage discord. #0143")
    })
}