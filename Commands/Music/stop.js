const { CommandInteraction, Client } = require("discord.js");

module.exports = {
    name: "stop",
    description: "Arrêter la musique.",
    permisssion: "ADMINISTRATOR",

    /**
     * @param {CommandInteraction} interaction 
     * @param {Client} client 
     */
    async execute(interaction, client) {
        const { guild, member, channel } = interaction;
        const vchan = member.voice.channel;

        if (!vchan)
            return interaction.reply({ content: "❌ Vous devez être dans un salon vocal pour utiliser le bot musical.", ephemeral: true });

        if (guild.me.voice.channelId && vchan.id !== guild.me.voice.channelId)
            return interaction.reply({ content: `🎚️ Je suis déjà en train de jouer de la musique ici: <#${guild.me.voice.channelId}>.`, ephemeral: true });

        let queue = await client.distube.getQueue(vchan);

        if (!queue)
            return interaction.reply({ content: "❌ La liste est vide.", ephemeral: true });

        await queue.stop(vchan);
        interaction.reply({ content: "⏹️ La musique a été arrêté." });

    }
}