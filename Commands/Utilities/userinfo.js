const { ContextMenuInteraction, MessageEmbed } = require("discord.js");

module.exports = {
    name: "userinfo",
    type: "USER",
    permission: "ADMINISTRATOR",
    context: true,
    /**
     * @param {ContextMenuInteraction} interaction 
     */

    async execute(interaction) {
        const target = await interaction.guild.members.fetch(interaction.targetId);

        const response = new MessageEmbed()
        .setColor("AQUA")
        .setAuthor(target.user.tag, target.user.avatarURL({dynamic: true, size: 512}))
        .setThumbnail(target.user.avatarURL({dynamic: true, size: 512}))
        .addField("ID", `${target.user.id}`, true)
        .addField("Roles", `${target.roles.cache.map(r => r).join(" ").replace("@evereyone", "") || "Pas de rôle"}`)
        .addField("Membre depuis", `<t:${parseInt(target.joinedTimestamp / 1000)}:R>`, true)
        .addField("Utilisateur de discord depuis", `<t:${parseInt(target.user.createdTimestamp / 1000)}:R>`, true)
        ;

        interaction.reply({embeds: [response], ephemeral: true});
    }
}