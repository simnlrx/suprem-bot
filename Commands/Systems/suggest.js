const { MessageEmbed, CommandInteraction } = require("discord.js");

module.exports = {
    name: "suggest",
    description: "suggest an idea for the server",
    options: [
        {
            name: "type",
            description: "select the type",
            required: true,
            type: "STRING",
            choices: [
                {
                    name: "command",
                    value: "command"
                },
                {
                    name: "event",
                    value: "event"
                },
                {
                    name: "system",
                    value: "system"
                },
            ]
        },
        {
            name: "name",
            description: "provide a name for your suggestion",
            type: "STRING",
            required: true
        },
        {
            name: "functionality",
            description: "describe the functionality of this suggestion",
            type: "STRING",
            required: true
        },
    ],
    /**
     * 
     * @param {CommandInteraction} interaction 
     */
    async execute(interaction) {

        const { options } = interaction;

        const type = options.getString("type");
        const name = options.getString("name");
        const funcs = options.getString("functionality");

        const response = new MessageEmbed()
            .setColor("GREY")
            .setDescription(`${interaction.member} has suggested a ${type}`)
            .addField("name", `${name}`, true)
            .addField("Functionality", `${funcs}`, true)

        const message = await interaction.reply({ embeds: [response], fetchReply: true })
        message.react("✅");
        message.react("❌");

    }
}