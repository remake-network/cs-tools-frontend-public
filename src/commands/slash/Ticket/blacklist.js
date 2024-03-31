const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const { db, Ticket, TicketBlacklisted } = require('../../../database'); // Update the path based on your file structure

module.exports = {
    structure: new SlashCommandBuilder()
    .setName('ticket-ban')
    .setDescription('Blacklist the person from accessing the ticket system')
    .addUserOption(option =>
        option.setName('user')
            .setDescription('The user.')
            .setRequired(true)
    )
    .addStringOption(option =>
        option.setName('reason')
            .setDescription('Reason for blacklisting the user.')
            .setRequired(true)
    ),
  /**
   * @param {ExtendedClient} client
   * @param {ChatInputCommandInteraction} interaction
   * @param {[]} args
   */

    run: async (client, interaction, args) => {
        const allowedRoleIds = ['1192508996310024222', '1192509044762615968'];
      // 883476243616518155 - Staff role (Employee)
      // 1148616689026601010 - Support role (regular support)
      const hasRequiredRole = interaction.member.roles.cache.some(role => allowedRoleIds.includes(role.id));

      if (!hasRequiredRole) {
        const notallowed = new EmbedBuilder()
          .setTitle(`<:trustnsafety:1148317341369766059> You're not allowed to use this command`)
          .setDescription(`Only a Customer Support Representative or a Remake Network representative can use the CS Tools`);

        return await interaction.reply({ embeds: [notallowed], ephemeral: true });
      }

        const user = interaction.options.getUser('user') || interaction.user;
        const member = interaction.guild.members.cache.get(user.id);
        const reasonOption = interaction.options.getString('reason');
        const reasonText = reasonOption ? `${reasonOption}` : 'No reason input';

        const newBlacklist = new TicketBlacklisted({
            Reason: reasonText,
            MemberID: member.id,
            StaffMember: interaction.user.id,
        });

        try {
            await newBlacklist.save();
            await interaction.reply({
                content: `${user.tag} has been blacklisted. ${reasonText}`,
                ephemeral: true,
            });
        } catch (error) {
            console.error('Error blacklisting user:', error);
            await interaction.reply({
                content: 'There was an error blacklisting the user.',
                ephemeral: true,
            });
        }
    },
};
