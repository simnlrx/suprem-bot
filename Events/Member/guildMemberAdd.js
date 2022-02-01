const { MessageEmbed, WebhookClient, GuildMember } = require("discord.js");
const { LogChannel } = require("../../Structures/congif.json");
const { NewMemberChannel } = require("../../Structures/congif.json");

module.exports = {
    name: "guildMemberAdd",
    /**
     * 
     * @param {GuildMember} member 
     */
    execute(member) {

        const { user, guild } = member;
        const logchannel = member.guild.channels.cache.get(LogChannel);
        const newmmeberchannel = member.guild.channels.cache.get(NewMemberChannel);

        member.roles.add("932976850593009667");

        const join = new MessageEmbed()
            .setColor("LUMINOUS_VIVID_PINK")
            .setAuthor(user.tag, user.avatarURL({ dynamic: true, size: 512 }))
            .setThumbnail(user.avatarURL({ dynamic: true, size: 512 }))
            .setDescription(`Bienvenue ${member} sur **${guild.name}** !\n
        Nous sommes maintenant ${guild.memberCount}`)
            .setFooter(`ID: ${user.id}`);

        const log = new MessageEmbed()
            .setColor("GREEN")
            .setAuthor(user.tag, user.avatarURL({ dynamic: true, size: 512 }))
            .setThumbnail(user.avatarURL({ dynamic: true, size: 512 }))
            .setDescription(`${member} a rejoint le serveur.\n`)
            .setFooter(`ID: ${user.id}`);


        newmmeberchannel.send({ embeds: [join] });
        logchannel.send({ embeds: [log] });


    }
}