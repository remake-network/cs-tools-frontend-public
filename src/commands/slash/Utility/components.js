const { ChatInputCommandInteraction, SlashCommandBuilder, ActionRowBuilder, StringSelectMenuBuilder, StringSelectMenuOptionBuilder } = require('discord.js');
const ExtendedClient = require('../../../class/ExtendedClient');

module.exports = {
    structure: new SlashCommandBuilder()
        .setName('components')
        .setDescription('Test the components handler.'),
    /**
     * @param {ExtendedClient} client 
     * @param {ChatInputCommandInteraction} interaction 
     * @param {[]} args 
     */
    run: async (client, interaction, args) => {
        const select = new StringSelectMenuBuilder()
            .setCustomId('cs_rate')
            .setPlaceholder('Click here to rate our customer support!')
            .addOptions(
                new StringSelectMenuOptionBuilder()
                    .setLabel('1')
                    .setValue('rate1')
                    .setEmoji('1152554302469054525'),
                new StringSelectMenuOptionBuilder()
                    .setLabel('2')
                    .setEmoji('1152554302469054525')
                    .setValue('rate2'),
                new StringSelectMenuOptionBuilder()
                    .setLabel('3')
                    .setEmoji('1152554302469054525')
                    .setValue('rate3'),
                new StringSelectMenuOptionBuilder()
                    .setLabel('4')
                    .setEmoji('1152554302469054525')
                    .setValue('rate4'),
                new StringSelectMenuOptionBuilder()
                    .setLabel('5')
                    .setEmoji('1152554302469054525')
                    .setValue('rate5'),
            );

        const row = new ActionRowBuilder()
            .addComponents(select);
        await interaction.reply({
            content: 'We would like to know how satisfied you are with our support by rating it with **1-5** stars below',
            components: [row],
        });
    }
};



// if (!interaction.isChatInputCommand()) return;
//         const modal = new ModalBuilder()
//         .setCustomId('supportModal')
//         .setTitle('Remake Network Account Info');

//         const remakenetworkEmail = new TextInputBuilder()
//         .setCustomId('RemakeNetworkEmail')
//         // The label is the prompt the user sees for this input
//         .setLabel("What's your Remake Network Email?")
//         // Short means only a single line of text
//         .setStyle(TextInputStyle.Short);

//     const username = new TextInputBuilder()
//         .setCustomId('username')
//         .setLabel("What's your Remake Network Username?")
//         // Paragraph means multiple lines of text.
//         .setStyle(TextInputStyle.Short);

//      const nickname = new TextInputBuilder()
//         .setCustomId('nickname')
//         .setLabel("What's your Remake Network Nickname?")
//         // Paragraph means multiple lines of text.
//         .setStyle(TextInputStyle.Short);

//     // An action row only holds one text input,
//     // so you need one action row per text input.
//     const RemakeNetworkEmailRow = new ActionRowBuilder().addComponents(remakenetworkEmail);
//     const UsernameRow = new ActionRowBuilder().addComponents(username);
//     const NicknameRow = new ActionRowBuilder().addComponents(nickname);

//     // Add inputs to the modal
//     modal.addComponents(RemakeNetworkEmailRow, UsernameRow, NicknameRow);

//     // Show the modal to the user
//     await interaction.showModal(modal);
//     }