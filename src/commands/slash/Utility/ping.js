const { ChatInputCommandInteraction, SlashCommandBuilder, ActionRowBuilder, ButtonBuilder } = require('discord.js');
const ExtendedClient = require('../../../class/ExtendedClient');

module.exports = {
    structure: new SlashCommandBuilder()
        .setName('ping')
        .setDescription('Replies with pong!'),
    /**
     * @param {ExtendedClient} client 
     * @param {ChatInputCommandInteraction} interaction 
     * @param {[]} args 
     */
    options: {
        cooldown: 5000
    },
    run: async (client, interaction, args) => {
        await interaction.reply({
            content: '',
            components: [
                new ActionRowBuilder().addComponents(
                    new ButtonBuilder()
                        .setCustomId('openticket')
                        .setLabel('Open Ticket')
                        .setStyle(4)
                        .setEmoji('1148722699552690176')
                        .setDisabled(false)
                ),
            ]
        });
    }
};
