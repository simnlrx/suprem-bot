const { CommandInteraction, Client } = require("discord.js");

module.exports = {
    name: "emitt",
    description: "Emetteur d'évenement",
    permission: "ADMINISTRATOR",
    options: [
        {
            name: "type",
            description: "Type d'évenement à émettre.",
            type: "STRING",
            required: true,
            choices: [
                {
                    name: "guildMemberAdd",
                    value: "guildMemberAdd"
                },
                {
                    name: "guildMemberRemove",
                    value: "guildMemberRemove"
                },
                {
                    name: "guildMemberUpdate",
                    value: "guildMemberUpdate"
                }
            ]
        }
    ],
    /**
     * 
     * @param {CommandInteraction} interaction 
     * @param {Client} client 
     */
    execute(interaction, client) {

        const choices = interaction.options.getString("type");

        switch(choices){
            case "guildMemberAdd" : {
                client.emit("guildMemberAdd", interaction.member);
                interaction.reply({content: "Emission de l'évenement", ephemeral: true});
            }
            break;
            case "guildMemberRemove": {
                client.emit("guildMemberRemove", interaction.member);
                interaction.reply({content: "Emission de l'évenement", ephemeral: true})
            }
            break;
            case "guildMemberUpdate": {
                client.emit("guildMemberUpdate", interaction.member);
                interaction.reply({content: "Emission de l'évenement", ephemeral: true})
            }
        }

    }
}