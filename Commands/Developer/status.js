const { Client, MessageEmbed, CommandInteraction } = require("discord.js");

module.exports = {
    name: "status",
    description: "Statut du BOT",
    permission: "ADMINISTRATOR",

    /**
     * 
     * @param {CommandInteraction} interaction 
     * @param {Client} client 
     */
    async execute(interaction, client){
        const Response = new MessageEmbed()
        .setColor("AQUA")
        .setDescription(`**Status**: \`🟢 EN LIGNE\` - \`${client.ws.ping}ms\`\n **Uptime**: <t:${parseInt(client.readyTimestamp / 1000)}:R>`)

        interaction.reply({embeds: [Response], ephemeral: true});
    }
}
