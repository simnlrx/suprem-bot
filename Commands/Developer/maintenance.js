const { CommandInteraction, MessageEmbed } = require("discord.js");
let config = require("../../Structures/congif.json")

module.exports = {
    name: "maintenance",
    description: "Change le statut d'un des services du SupremSky.",
    permission: "ADMINISTRATOR",
    options: [
        {
            name: "service",
            description: "Service où modifier la maintenance.",
            type: "STRING",
            required: true,
            choices: [
                {
                    name: "skyblock",
                    value: "skyblock"
                },
                {
                    name: "site",
                    value: "site"
                },
                {
                    name: "boutique",
                    value: "boutique"
                }
            ],
        },
        {
            name: "statut",
            description: "Statut de la maintenance",
            type: "BOOLEAN",
            required: true
        },
        {
            name: "message",
            description: "Description de la misa à jour du status.",
            type: "STRING",
            required: false
        }
    ],

    /**
     * 
     * @param {CommandInteraction} interaction 
     */
    execute(interaction) {

        const choices = interaction.options.getString("service");
        const statut = interaction.options.getBoolean("statut");
        const desc = interaction.options.getString("message");

        switch (choices) {
            case "skyblock":
                config.sbmaintenance = statut;
                break;
            default:
                break;
        }

        interaction.reply({content: `Maintenance pour ${choices} sur ${config.sbmaintenance}.`,ephemeral: true})

    }
}