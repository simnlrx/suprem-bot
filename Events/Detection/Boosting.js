const { Client, GuildMember, MessageEmbed, MessageAttachment } = require("discord.js");
const Canvas = require("canvas");

module.exports = {
    name: "guildMemberUpdate",
    /**
     * 
     * @param {GuildMember} oldMember 
     * @param {GuildMember} newMember 
     * @param {Client} client
     */
    async execute(oldMember, newMember, client) {

        const { guild } = newMember;

        const emebed = new MessageEmbed()
            .setColor("LUMINOUS_VIVID_PINK")
            .setAuthor("Serveur Boosté"); //, client.user.avatarURL({ dynamic: true, size: 512 })

        if (!oldMember.premiumSince && newMember.premiumSince) {
            const canvas = Canvas.createCanvas(800, 250);
            const ctx = canvas.getContext("2d");
            const background = await Canvas.loadImage("../../Structures/Images/boosting.png");
            const avatar = await Canvas.loadImage(newMember.user.displayAvatarURL({ format: "jpg" }));
            const attachement = new MessageAttachment(canvas.toBuffer(), "boosting.png");


            ctx.drawImage(background, 0, 0, canvas.width, canvas.height);

            ctx.strokeStyle = "#9B59B6";
            ctx.strokeRect(0, 0, canvas.width, canvas.height);

            ctx.font = "38px cursive";
            ctx.textAlign = "center";
            ctx.fillStyle = "#FFFFFF";
            ctx.fillText(newMember.displayName, canvas.width / 2, canvas.height / 1.2);

            ctx.beginPath();
            ctx.arc(125, 125, 100, 0, Math.PI * 2, true);
            ctx.closePath();
            ctx.clip();
            ctx.drawImage(avatar, 25, 25, 200, 200);

            emebed.setDescription("Merci de boosté notre serveur !")  
            .setImage('attachement://boosting.png');

            await guild.systemChannel.send({emebed: [emebed], files: [attachement]}).catch((err) => console.log(err));

            emebed.setDescription("Merci de boosté notre serveur !\nVous recevrez 150 rubis pour l''occasion.");
            newMember.send({embeds: [emebed]})
        }
    }
}