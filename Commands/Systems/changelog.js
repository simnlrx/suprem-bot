const { Client, MessageEmbed, CommandInteraction } = require("discord.js")
const { ChangeLogChannel } = require("../../Structures/congif.json");
const { LogChannel } = require("../../Structures/congif.json");


module.exports = {
    name: "changelog",
    description: "Créé et envoie un changelog.",
    permission: "ADMINISTRATOR",
    options: [
        {
            name: "name",
            description: "Nom du changelog",
            required: true,
            type: "STRING"
        },
        {
            name: "description",
            description: "Description du changelog",
            type: "STRING",
            required: true
        },
        {
            name: "plateform",
            description: "Plateforme où les modifications on été apporté.",
            type: "STRING",
            required: false,
            choices: [
                {
                    name: "login",
                    value: "Login"
                },
                {
                    name: "hub",
                    value: "Hub"
                },
                {
                    name: "skyblock",
                    value: "SkyBlock"
                },
                {
                    name: "discord",
                    value: "Discord",
                },
                {
                    name: "site",
                    value: "Site"
                }
            ]
        }
    ],

    /**
     * 
     * @param {Client} client
     * @param {CommandInteraction} interaction 
     */

    async execute(interaction, client) {

        const { options } = interaction;
        const wait = require('util').promisify(setTimeout);
        const changelogchannel = client.channels.cache.get(ChangeLogChannel);
        const logchannel = client.channels.cache.get(LogChannel);

        const name = options.getString("name");
        const desc = options.getString("description");
        const plateform = options.getString("plateform");

        const ndesc = desc.replaceAll("\\n", "\n");

        const response = new MessageEmbed()
            .setColor("LUMINOUS_VIVID_PINK")
            .setTitle(`${name}`)
            .setFooter(`Par ${interaction.user.username}`, interaction.user.avatarURL())
            .setDescription(`${ndesc}`)
            .setTimestamp()

        let message = changelogchannel.send({ embeds: [response] });

        const link = `https://discord.com/channels/932976850593009664/932977138049634324/${message.id};` //lien guild + channel

        const log = new MessageEmbed()
            .setColor("PURPLE")
            .setTitle("Nouveau ChangeLog")
            .setTimestamp()
            .setDescription(`ChangeLog posté par ${interaction.user.tag}.\n\n [Voir le changelog](${link})`)
            .setFooter(`ID MESSAGE: ${message.id}`);


        logchannel.send({ embeds: [log] })

        interaction.reply("Message envoyé.");

        await wait(2000);
        interaction.deleteReply();

    }

}