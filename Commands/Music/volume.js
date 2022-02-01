const { CommandInteraction, Client } = require("discord.js");

module.exports = {
    name: "volume",
    description: "Change le volume de la musique.",
    permisssion: "ADMINISTRATOR",
    options: [
        {
            name: "volume",
            description: "Volume de la musique, 100 = 100%.",
            type: "NUMBER",
            required: true
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

        const volume = options.getNumber("volume");
        if (volume > 100 || volume < 1)
            return interaction.reply({ content: "❌ Le volume doit être compris entre 0 et 100.", ephemeral: true });

        client.distube.setVolume(vchan, volume);
        if (volume <= 33)
            return interaction.reply({ content: `🔈 Le volume de la musique a été mit sur \`${volume}%\`` });
        else if (volume > 33 && volume <= 66)
            return interaction.reply({ content: `🔉 Le volume de la musique a été mit sur \`${volume}%\`` });
        else
            return interaction.reply({ content: `🔊 Le volume de la musique a été mit sur \`${volume}%\`` });

    }
}