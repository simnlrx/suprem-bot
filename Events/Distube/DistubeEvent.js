const { MessageEmbed } = require('discord.js');
const client = require('../../Structures/index');

const status = queue => `Volume: \`${queue.volume}%\` | Filtre: \`${queue.filters.join(', ') || 'Off'}\` | Loop: \`${queue.repeatMode ? (queue.repeatMode === 2 ? 'Toute la liste' : 'Cette musique') : 'Off' }\` | Autoplay: \`${queue.autoplay ? 'On' : 'Off'}\``


client.distube
    .on('playSong', (queue, song) =>
        queue.textChannel.send({embeds: [new MessageEmbed()
        .setColor("GREEN")
    .setDescription(`🎶 | Lecture: \`${song.name}\` - \`${song.formattedDuration}\`\nDemandé par: ${song.user}\n${status(queue)}.`)]})
    )
    .on('addSong', (queue, song) =>
        queue.textChannel.send({embeds: [new MessageEmbed()
            .setColor('GREEN')
            .setDescription(`✅ | Ajouté ${song.name} - \`${song.formattedDuration}\` à la liste par ${song.user}.`)]})
    )
    .on('addList', (queue, playlist) =>
        queue.textChannel.send({embeds: [new MessageEmbed()
            .setColor('GREEN')
            .setDescription(`✅ | La playlist \`${playlist.name}\` a été ajouté (${playlist.songs.length} musiques) à la liste\n${status(queue)}.`)]})
    )
    .on('error', (channel, e) => {
        channel.send(`⛔ | Une erreur rencontrée: ${e.toString().slice(0, 1974)}`)
        console.error(e)
    })
    .on('empty', channel => channel.send('⚠️ Le salon est vide. Je pars aussi ..'))
    .on('searchNoResult', (message, query) =>
        message.channel.send(`⚠️ | Aucun résultat trouvé pour \`${query}\`!`)
    )
    .on('finish', queue => queue.textChannel.send('⚠️ La liste de lecture est terminé !'))