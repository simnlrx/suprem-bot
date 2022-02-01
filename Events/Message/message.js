const { MessageEmbed, WebhookClient } = require("discord.js");
const randomHex = require('random-hex');

module.exports = {
    name: "messageCreate",
    execute(message) {
        if (message.author.bot) return;
        if (message.guildId) return;

        console.log("dm reçu")

        const webhook = new WebhookClient({
            url: "https://discord.com/api/webhooks/936327187156594719/ggKpI2kp4iOWryTMiRS10YcPApiz4v6ozJyW0fhX0oQ4lJxFnv0U4Vags1BojzUuwCHS"
        })

        const log = new MessageEmbed()
            .setTitle("Nouveau message privé")
            .setColor(randomHex.generate())
            .addField("Heure:", `<t:${parseInt(message.createdTimestamp / 1000)}:R> à <t:${parseInt(message.createdTimestamp / 1000)}:t>`)
            .addField("Utilisateur:", `${message.author}\n||${message.author.tag} | ${message.author.id}||`)
            .addField("Message:", `\`\`\`${message.content}\`\`\``)

        webhook.send({ embeds: [log] })
    }
}