const { CommandInteraction, Client } = require("discord.js");

module.exports = {
    name: "ping",
    description: "pong?",

    /**
     * @param {Client} client
     * @param {CommandInteraction} interaction 
     */

    async execute(interaction, client) {
        interaction.reply({content: "ㅤ"})

        interaction.channel.send("PONG FDP");

        const message = await interaction.fetchReply();
        message.delete();
    }
}