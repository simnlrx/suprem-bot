const { MessageEmbed, GuildMember } = require("discord.js");
const { LogChannel } = require("../../Structures/congif.json");

module.exports = {
    name: "guildMemberRemove",
    /**
     * 
     * @param {GuildMember} member 
     */
    execute(member) {

        const { user, guild } = member;
        const logchannel = member.guild.channels.cache.get(LogChannel);

        const left = new MessageEmbed()
            .setColor("RED")
            .setAuthor(user.tag, user.avatarURL({ dynamic: true, size: 512 }))
            .setThumbnail(user.avatarURL({ dynamic: true, size: 512 }))
            .setDescription(`${member} est parti du serveur.\n
        Il a rejoint le <t:${parseInt(member.joinedTimestamp / 1000)}:R>`)
            .setFooter(`ID: ${user.id}`);

        logchannel.send({ embeds: [left] });

    }
}