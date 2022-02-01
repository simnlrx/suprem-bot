const { CommandInteraction, MessageEmbed } = require("discord.js");

module.exports = {
    name: "clear",
    description: "Supprimer un certains nombre de message d'un salon ou d'un utilisateur.",
    permission: "MANAGE_MESSAGES",
    options: [
        {
            name: "nombre",
            description: "Selectionne le nombre de message à supprimer.",
            type: "NUMBER",
            required: true
        },
        {
            name: "utilisateur",
            description: "Selectionne l'utilisateur dont les messages vont être supprimé.",
            type: "USER",
            required: false
        }
    ],

    /**
     * 
     * @param {CommandInteraction} interaction 
     */

    async execute(interaction) {
        const { channel, options } = interaction;

        const amount = options.getNumber("nombre");
        const target = options.getMember("utilisateur");
        const wait = require('util').promisify(setTimeout);

        const messages = await channel.messages.fetch();

        const response = new MessageEmbed().setColor("LUMINOUS_VIVID_PINK");
        
        if (target) {
            let i = 0;
            const filtered = [];
            (await messages).filter((m) => {
                if (m.author.id === target.id && amount > i) {
                    filtered.push(m);
                    i++;
                }
            })

            await channel.bulkDelete(filtered, true).then(messages => {
                response.setDescription(`${messages.size} messages de ${target}ont été supprimés.`);
                interaction.reply({ embeds: [response] });
            });

        } else {
            await channel.bulkDelete(amount, true).then(messages => {
                response.setDescription(`${messages.size} messages ont été supprimés du salon ${interaction.channel.name}`);
                interaction.reply({ embeds: [response] });
            });
        }

        await wait(5000);
        interaction.deleteReply();
    }
}