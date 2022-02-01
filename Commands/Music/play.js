const { CommandInteraction, Client } = require("discord.js");

module.exports = {
    name: "play",
    description: "Jouer ou reprendre la musique.",
    permisssion: "ADMINISTRATOR",
    options: [
        {
            name: "url",
            description: "URL ou nom d'une musique.",
            type: "STRING",
            required: false
        }
    ],

    /**
     * @param {CommandInteraction} interaction 
     * @param {Client} client 
     */
    async execute(interaction, client) {
        const { guild, member, channel, options } = interaction;
        const vchan = member.voice.channel;

        if (!vchan)
            return interaction.reply({ content: "❌ Vous devez être dans un salon vocal pour utiliser le bot musical.", ephemeral: true });

        if (guild.me.voice.channelId && vchan.id !== guild.me.voice.channelId)
            return interaction.reply({ content: `🎚️ Je suis déjà en train de jouer de la musique ici: <#${guild.me.voice.channelId}>.`, ephemeral: true });

        if (options.getString("url")) {
            client.distube.playVoiceChannel(vchan, options.getString("url"), { textChannel: channel, member, member });
            return interaction.reply({ content: "🎼 Requête reçu." });
        } else {
            let queue = await client.distube.getQueue(vchan);

            if (!queue)
                return interaction.reply({ content: "❌ La liste est vide.", ephemeral: true });
            if (!queue.playing){
                await queue.resume(vchan);
                interaction.reply({ content: "▶️ La musique est remise en lecture." });
            } else
                interaction.reply({content: "❌ La musique est déjà en cours de lecture.", ephemeral: true})
        }
    }
}