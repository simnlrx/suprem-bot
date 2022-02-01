const { MessageEmbed, Client, CommandInteraction } = require("discord.js");
const { create } = require("sourcebin")

function delay(time) {return new Promise((resolve) => setTimeout(resolve, time))}

module.exports = {
  name: "dm",
  description: "Envoyer un message privé à tous les utilisateurs dont le rôle est celui mentionné.",
  usage: "/dm",
  disabled: false,
  permission: "ADMINISTRATOR",
  options: [
     {
      name: "role",
      description: "Mentionner un rôle.",
      type: "ROLE",
      required: true,
    },
    {
      name: "message",
      description: "Message à envoyer aux utilisateurs.",
      type: "STRING",
      required: true,
    },
  ],
  /**
   * @param {CommandInteraction} interaction
   * @param {Client} client
   */
  async execute(interaction, client) {
    const role = interaction.options.getRole('role');
    const message = interaction.options.getString("message");
    
    const members = interaction.guild.roles.cache.get(role.id).members
    let memberIds = members.map(m => m.id);

    if(memberIds.length == 0)
      return interaction.reply({embeds: [new MessageEmbed().setColor("RED").setDescription(`Le rôle ${role} n'est attribué à aucun membre.`).setFooter({text: "SupremBot", iconURL: client.user.avatarURL()}).setTimestamp()], ephemeral: true})

    const Embed = new MessageEmbed().setColor("AQUA")

    var successfulMembers = 0
    var successfulMembersList = []
    var failedMembers = 0
    var failedMembersList = []

    await interaction.reply({embeds: [new MessageEmbed()
      .setColor("AQUA")
      .setDescription(`**Envoi d'un message à tous les utilisateurs qui ont le rôle: ${role}**.\n\n> DM envoyé: ${successfulMembers}\n\n> Utilisateurs injoignables: ${failedMembers}\n\n> Dernier membre: *Envoie des messages dans quelques secondes.*`)
      .setFooter({text: "SupremBot", iconURL: client.user.avatarURL()}).setTimestamp()], fetchReply: true})

    await delay(3000) 
    
    for (var i = 0; i < memberIds.length; i++) {
      var member = client.users.cache.get(memberIds[i]);

      try {
        var sendMessage = await member.send({embeds: [new MessageEmbed().setColor("AQUA").setTitle("Nouveau message de la part de l'équipe de SupremSky !").setDescription(`${message}`).addFields({name: "Serveur", value: `${interaction.guild.name}`, inline: true}, {name: "Rôle", value: `${role.name}`, inline: true}, {name: "Message envoyé par: ", value: `${interaction.member}`, inline: true}).setFooter({text: "SurepmBot", iconURL: client.user.avatarURL()}).setTimestamp()]})
        successfulMembers += 1
        successfulMembersList.push(member)
      } catch (error) {
        failedMembers += 1
        failedMembersList.push(member)
      }

      interaction.editReply({embeds: [Embed.setDescription(`**Envoi d'un message à tous les utilisateurs qui ont le rôle: ${role}**.\n\n> DM envoyé: ${successfulMembers}\n\n> Utilisateurs injoignables: ${failedMembers}\n\n> Dernier membre: ${member}`)
      .setFooter({text: "SupremBot", iconURL: client.user.avatarURL()}).setTimestamp()], fetchReply: true})
    
      await delay(2000) 
    }
    const failedMembersMapped = failedMembersList.map((m) => m).join(", ") || "Aucun";
    const successfulMembersMapped = successfulMembersList.map((m) => m).join(", ") || "Aucun"

    var failedMembersMessage = failedMembersMapped
    var successfulMembersMessage = successfulMembersMapped

    if (failedMembersMapped.length > 1024) {
      const failedMembersSourcebin = await create([{name: "failedMembers", content: failedMembersMapped}])
      failedMembersMessage = failedMembersSourcebin.url
    }

    if (successfulMembersMapped.length > 1024) {
      const successfulMembersSourcebin = await create([{name: "successfulMembers", content: successfulMembersMapped}])
      successfulMembersMessage = successfulMembersSourcebin.url
    }

    interaction.editReply({content: `${interaction.member}`, embeds: [Embed.setDescription(`**L'envoie des messages aux utilisateurs qui ont le rôle: ${role} terminé.**`).addFields({name: "DM envoyé: ", value: `${successfulMembers}`}, {name: "Utilisateur injoignables: ", value: `${failedMembers}`, inline: true}, {name: "Membres qui ont reçu des DM: ", value: `${successfulMembersMessage}`}, {name: "Membre n'ayant rien reçu: ", value: `${failedMembersMessage}`}).setFooter({text: "SupremBot", iconURL: client.user.avatarURL()})]})
  },
};