require('dotenv').config();
const ExtendedClient = require('./class/ExtendedClient');
const { ModalBuilder, TextInputBuilder, TextInputStyle, PermissionsBitField, ActionRowBuilder, ButtonBuilder, StringSelectMenuBuilder, EmbedBuilder, StringSelectMenuOptionBuilder, MessageActionRow, MessageButton } = require('discord.js');
const client = new ExtendedClient();
const { log } = require("./functions");
const config = require('./config.js');
//if (config.remakesupport_server) mongoose();
const { Ticket, TicketBlacklisted } = require('./database'); // Update the path based on your file structure
const axios = require("axios")
const querystring = require('querystring');
const internal = require('stream');
const languageLibrary = require('./language'); // Import language libraries

const threadOwners = [];


// try {
//   const guildId = interaction.guildId;
//   const guild = await client.guilds.fetch(guildId);
//   const guildLanguage = guild.preferredLocale;

//   const formData = querystring.stringify({
//     language: guildLanguage,
//     isThreadsEnabled: true,
//     threadsCategoryID: 'THREADS_CATEGORY_ID',
//     isSupportChannelEnabled: true,
//     supportChannelID: 'SUPPORT_CHANNEL_ID',
//     isSuggestionsEnabled: true,
//     suggestionsCategoryID: 'SUGGESTIONS_CATEGORY_ID',
//   });

//   const response = await axios.post(`http://localhost:3000/setupGuild/${guildId}`, formData, {
//     headers: {
//       'Content-Type': 'application/x-www-form-urlencoded',
//     },
//   });

//   console.log('Response:', response.data);

//   if (response.data.success) {
//     await interaction.reply('Guild settings updated successfully!');
//   } else {
//     await interaction.reply(`Failed to update guild settings. Reason: ${response.data.error}`);
//   }
// } catch (error) {
//   console.error('Error:', error.response.data);
//   await interaction.reply('Failed to update guild settings.');
// }




const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('mydatabase.db');

// Function to retrieve threadOwners data from the database
function retrieveThreadOwnersFromDatabase() {
  return new Promise((resolve, reject) => {
    const owners = [];
    db.all("SELECT * FROM threadOwners", [], (err, rows) => {
      if (err) {
        reject(err);
      } else {
        rows.forEach(row => {
          owners.push({ channelId: row.channelId, ownerId: row.ownerId });
        });
        resolve(owners);
      }
    });
  });
}

// Function to initialize the database
function initializeDatabase() {
  db.serialize(function () {
    db.run("CREATE TABLE IF NOT EXISTS threadOwners (channelId TEXT PRIMARY KEY, ownerId TEXT)");
  });
}

// Function to retrieve threadOwners data from the database
function retrieveThreadOwnersFromDatabase() {
  return new Promise((resolve, reject) => {
    db.all("SELECT * FROM threadOwners", [], (err, rows) => {
      if (err) {
        reject(err);
      } else {
        rows.forEach(row => {
          threadOwners.push({ channelId: row.channelId, ownerId: row.ownerId });;
        });
        resolve(threadOwners);
      }
    });
  });
}

// Function to save threadOwners data to the database
function saveThreadOwnersToDatabase(threadOwners) {
  db.serialize(function () {
    // Use INSERT OR IGNORE to avoid inserting duplicate data
    const stmt = db.prepare("INSERT OR IGNORE INTO threadOwners VALUES (?, ?)");
    Object.entries(threadOwners).forEach(([channelId, ownerId]) => {
      stmt.run(channelId, ownerId);
    });
    stmt.finalize();
  });
}

// Usage example
initializeDatabase();
retrieveThreadOwnersFromDatabase()
  .then(threadOwners => {
    log(`Thread Owners: ${JSON.stringify(threadOwners)}`, 'info');
    // Use threadOwners in your bot
  })
  .catch(err => {
    log(`Error retrieving threadOwners from the database: ${err}`, 'err');
  });

// When your bot shuts down, save threadOwners to the database
process.on('SIGINT', () => {
  saveThreadOwnersToDatabase(threadOwners);
  db.close();
  log(`Bot has been closed`, 'info');
  process.exit(0);
});

function insertThreadOwner(channelId, ownerId) {
  db.run("INSERT OR IGNORE INTO threadOwners (channelId, ownerId) VALUES (?, ?)", [channelId, ownerId], (err) => {
    if (err) {
      log(`Error inserting data into the database: ${err}`, 'err');
    } else {
      log(`Data inserted into the database: ${channelId} | ${ownerId}`, 'info');
      retrieveThreadOwnersFromDatabase();
    }
  });
}
const threadActivityTimestamps = new Map();

client.on('guildMemberAdd', member => {
  const targetServerID = '1184231203994345594';
  const rolesToAdd = [
    '1192509044762615968',
    '1192509345838137398',
    '1192509359532544100'
  ];

  if (member.guild.id === targetServerID) {
    rolesToAdd.forEach(roleID => {
      const role = member.guild.roles.cache.get(roleID);
      if (role) {
        member.roles.add(role).catch(console.error);
      } else {
        console.error(`Role with ID ${roleID} not found.`);
      }
    });
  }
});

client.on('threadCreate', async (thread) => {
  console.log(threadActivityTimestamps)

  try {
    if (thread.parentId === config.thread_config.suggestions_channel) {
      await thread.join();
      if (config.thread_config.AutoCloseSuggestionsChannels) {
        threadActivityTimestamps.set(thread.id, Date.now());
        console.log(threadActivityTimestamps)
      }
      insertThreadOwner(thread.id, thread.ownerId);


      const suggestions = new EmbedBuilder()
        .setTitle('Suggestions Reminder')
        .setColor('#E67E22')
        .setDescription(`<@${thread.ownerId}>, Before posting a suggestion, make sure that:\n* It ***follows*** our https://discord.com/channels/1184231203994345594/1192516198550749275 \n* Include any pictures, gif or videos of the suggestions as this helps understand your suggestions better or include as much information as possible.\n* It **hasn't been suggested already**\n\n___Suggestions that don't follow these requirements will be ***deleted***.___\n\nClicking '**Got it**' button below will hide this message.`);


      await thread.send({
        content: '',
        components: [
          new ActionRowBuilder()
            .addComponents(
              new ButtonBuilder()
                .setCustomId('got_it')
                .setLabel('Got It')
                .setStyle(3)
                .setEmoji('1148317502967914517')
                .setDisabled(false)
            ),
        ],
        embeds: [suggestions],
      });

    } else if (thread.parentId === config.thread_config.support_channel) { //support
      // Join the thread
      await thread.join();
      if (config.thread_config.AutoCloseSupportChannels) {
        threadActivityTimestamps.set(thread.id, Date.now());
        console.log(threadActivityTimestamps)
      }
      insertThreadOwner(thread.id, thread.ownerId);
      try {
        const response = await axios.post('http://localhost:3000/api/checkUserLanguage', {
          memberID: thread.ownerId,
        }, {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
        });
        const userLanguage = response.data.language

        const embed_title_language = languageLibrary[userLanguage]?.support_embed_welcome_title || languageLibrary['en'].support_embed_welcome_title;
        const embed_text_language = languageLibrary[userLanguage]?.support_embed_text || languageLibrary['en'].support_embed_text;
        const button_closepost_language = languageLibrary[userLanguage]?.support_button_closepost || languageLibrary['en'].support_button_closepost;
        const button_sensitive_language = languageLibrary[userLanguage]?.support_button_privateticket || languageLibrary['en'].support_button_privateticket;
        const button_guidelines_language = languageLibrary[userLanguage]?.support_button_guidelines || languageLibrary['en'].support_button_guidelines;
        const button_cstools_language = languageLibrary[userLanguage]?.support_button_cstools || languageLibrary['en'].support_button_cstools;

        const welcomeembed = new EmbedBuilder()
        .setTitle(`<:icons_hammer:1148724808322908232> ${embed_title_language}`)
        .setColor('#E67E22')
        .setDescription(`<@${thread.ownerId}>, ${embed_text_language}`);

      const message = await thread.send({
        content: '',
        components: [
          new ActionRowBuilder()
            .addComponents(
              new ButtonBuilder()
                .setCustomId('closepost')
                .setLabel(button_closepost_language)
                .setStyle(4)
                .setEmoji('1148722699552690176')
                .setDisabled(false),
              new ButtonBuilder()
                .setCustomId('sensitivesupport')
                .setLabel(button_sensitive_language)
                .setStyle(4)
                .setEmoji('1151632743340453940')
                .setDisabled(false),
              new ButtonBuilder()
                .setCustomId('supportguidelines')
                .setLabel(button_guidelines_language)
                .setStyle(2)
                .setEmoji('1148723461229920316')
                .setDisabled(true),
              new ButtonBuilder()
                .setCustomId('trustnsafety')
                .setLabel(button_cstools_language)
                .setStyle(1)
                .setEmoji('1148317341369766059')
                .setDisabled(true)
            ),
        ],
        embeds: [welcomeembed],
      });
      await message.pin();
      } catch (error) {
        console.error('Error fetching user language:', error);
        // Handle errors if necessary
      }

    } {

    }
  } catch (error) {
    log(`Error in threadCreate event: ${error}`, 'err');

  }
  setInterval(() => {
    const currentTime = Date.now();

    // Iterate through the map and check each thread's last activity timestamp
    for (const [threadId, lastActivityTimestamp] of threadActivityTimestamps.entries()) {
      const inactiveDuration = currentTime - lastActivityTimestamp;
      console.log(threadActivityTimestamps)

      // Check if the thread has been inactive for 10 minutes (600,000 milliseconds)
      if (inactiveDuration >= 180000) {
        thread.setLocked(true)
          .then(newThread => console.log(`Thread is now auto ${newThread.locked ? 'locked' : 'unlocked'}`))
          .catch(console.error);
        thread.setName(`${thread.name}  [AUTO-CLOSED]`)
          .then(newThread => console.log(`Thread's new name is ${newThread.name}`))
          .catch(console.error);
        threadActivityTimestamps.delete(threadId);
      }
    }
  }, 60000)
});

client.on('interactionCreate', async (interaction) => {
  
  if (interaction.isButton()) {

    async function handleSupportForm(interaction, formTitle, channelPrefix) {
      const ticketUserId = interaction.user.id;
      const existingTicket = await Ticket.findOne({
        MemberID: ticketUserId,
        Type: formTitle,
        Pending: true,
      });

      try {
        const response = await axios.post('http://localhost:3000/api/checkUserLanguage', {
          memberID: ticketUserId,
        }, {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
        });
        const userLanguage = response.data.language

        const existingTicket_message2_language = languageLibrary[userLanguage]?.handleSupportForm_existingtTicket_text2 || languageLibrary['en'].handleSupportForm_existingtTicket_text2;
        const existingTicket_message1_language = languageLibrary[userLanguage]?.handleSupportForm_existingtTicket_text1 || languageLibrary['en'].handleSupportForm_existingtTicket_text1;
        const existingTicket_question_username_language = languageLibrary[userLanguage]?.handleSupportForm_question_username || languageLibrary['en'].handleSupportForm_question_username;
        const existingTicket_question_email_language = languageLibrary[userLanguage]?.handleSupportForm_question_email || languageLibrary['en'].handleSupportForm_question_email;
        const existingTicket_question_issue_language = languageLibrary[userLanguage]?.handleSupportForm_question_issue || languageLibrary['en'].handleSupportForm_question_issue;
        const button_cstools_language = languageLibrary[userLanguage]?.support_button_cstools || languageLibrary['en'].support_button_cstools;

        if (existingTicket && existingTicket.ChannelID) {
          const existingTicketLink = `Click [here](https://discord.com/channels/${interaction.guild.id}/${existingTicket.ChannelID}) to go to your existing ${formTitle} support ticket.`;
          return interaction.reply({ content: `${existingTicket_message1_language} ${existingTicket_message2_language}`, ephemeral: true });
        }
  
        const modal = new ModalBuilder()
          .setCustomId(`${channelPrefix}SupportFormv1`)
          .setTitle(`${formTitle} Support Form`);
  
        const usernameInput = new TextInputBuilder()
          .setCustomId('usernameInput')
          .setLabel(existingTicket_question_username_language)
          .setStyle(TextInputStyle.Short)
          .setRequired(true);
        const emailInput = new TextInputBuilder()
          .setCustomId('emailInput')
          .setLabel(existingTicket_question_email_language)
          .setStyle(TextInputStyle.Short)
          .setRequired(true);
        const issueInput = new TextInputBuilder()
          .setCustomId('issueInput')
          .setLabel(existingTicket_question_issue_language)
          .setStyle(TextInputStyle.Paragraph)
          .setRequired(true);
  
        const usernameRow = new ActionRowBuilder().addComponents(usernameInput);
        const emailRow = new ActionRowBuilder().addComponents(emailInput);
        const issueRow = new ActionRowBuilder().addComponents(issueInput);
  
        modal.addComponents(usernameRow, emailRow, issueRow);
        await interaction.showModal(modal);
        
      } catch (error) {
        console.error('Error fetching user language:', error);
        // Handle errors if necessary
      }

    }

    async function handleUserTicketInfo(interaction, memberID) {
      await interaction.deferReply();

      const ticketsPerPage = 1;
      const tickets = await Ticket.find({ MemberID: memberID });
      const guild = interaction.guild;
      const channelToFind = guild.channels.cache.get(interaction.channelId);
      if (channelToFind) {
        const embedPages = [];
        let currentPage = 0;
        let fieldCounter = 0;
        let fields = [];

        for (let i = 0; i < tickets.length; i++) {
          const ticket = tickets[i];
          const ticketFields = [];

          ticketFields.push(
            {
              name: 'Ticket ID',
              value: ticket.TicketID,
              inline: true
            },
            {
              name: 'Channel ID',
              value: ticket.ChannelID,
              inline: true
            },
            {
              name: 'Closed',
              value: ticket.Closed.toString(),
              inline: true
            },
            {
              name: 'Locked',
              value: ticket.Locked.toString(),
              inline: true
            },
            {
              name: 'Pending',
              value: ticket.Pending.toString(),
              inline: true
            },
            {
              name: 'Type',
              value: ticket.Type,
              inline: true
            }
          );

          if (ticket.Username) {
            ticketFields.push({
              name: 'Account Username',
              value: ticket.Username,
              inline: true
            });
          }

          if (ticket.Email) {
            ticketFields.push({
              name: 'Account Email',
              value: ticket.Email,
              inline: true
            });
          }

          if (ticket.Issue) {
            ticketFields.push({
              name: 'Issue',
              value: ticket.Issue,
              inline: false
            });
          }

          fields.push(...ticketFields);

          fieldCounter++;

          if (fieldCounter === ticketsPerPage || i === tickets.length - 1) {
            const embed = new EmbedBuilder()
              .setTitle(`User Ticket Information (${currentPage + 1}/${Math.ceil(tickets.length / ticketsPerPage)})`)
              .setColor('#d7fe6c')
              .setFooter({
                text: 'CS Tools were developed by Mikael'
              });

            embed.addFields(fields);

            embedPages.push(embed);
            fields = [];
            currentPage++;
            fieldCounter = 0;
          }
        }

        const pages = createButtonPagination(interaction, embedPages);
        await pages.sendPage(0);
      }
    }

    function createButtonPagination(interaction, embedPages) {
      const components = [
        {
          type: 1,
          components: [
            {
              type: 2,
              style: 1,
              custom_id: 'previousPage',
              label: 'Previous'
            },
            {
              type: 2,
              style: 1,
              custom_id: 'nextPage',
              label: 'Next'
            }
          ]
        }
      ];
      const guild = interaction.guild;
      const channelToFind = guild.channels.cache.get(interaction.channelId);
      if (channelToFind) {
        interaction.followUp({
          embeds: [embedPages[0]],
          components: components,
          ephemeral: true,
        }).then(async initialMessage => {
          let page = 0;

          const collector = interaction.channel.createMessageComponentCollector({
            componentType: 'BUTTON',
          });

          collector.on('collect', async (buttonInteraction) => {
            if (buttonInteraction.customId === 'nextPage') {
              page = (page + 1) % embedPages.length;
            } else if (buttonInteraction.customId === 'previousPage') {
              page = (page - 1 + embedPages.length) % embedPages.length;
            }

            // Update the initial message with the new page
            await initialMessage.followUp({
              embeds: [embedPages[page]],
              components: components,
              ephemeral: true,
            }).catch(console.error);
          });

          collector.on('end', collected => {
            console.log(`Collected ${collected.size} interactions`);
          });
        }).catch(error => {
          console.error('Error sending initial message:', error);
        });

        return {
          sendPage: async (pageNumber) => {
            const sentPage = await interaction.followUp({
              embeds: [embedPages[pageNumber]],
              components: components,
              ephemeral: true,
            });
            return sentPage;
          },
        };
      }
    }



    async function handleTicketDelete(interaction) {
      try {
        const response = await axios.post('http://localhost:3000/api/checkUserLanguage', {
          memberID: interaction.user.id,
        }, {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
        });
        const userLanguage = response.data.language

        const ticketDelete_title_language = languageLibrary[userLanguage]?.ticketDeletion_title_embed || languageLibrary['en'].ticketDeletion_title_embed;
        const ticketDelete_Description_language = languageLibrary[userLanguage]?.ticketDeletion_already_deleted_description_embed || languageLibrary['en'].ticketDeletion_already_deleted_description_embed;
        const ticketDelete_being_deleted_language = languageLibrary[userLanguage]?.ticketDeletion_being_deleted_description_embed || languageLibrary['en'].ticketDeletion_being_deleted_description_embed;
        const ticketDelete_failed_error_language = languageLibrary[userLanguage]?.ticketDeletion_failed_error_embed || languageLibrary['en'].ticketDeletion_failed_error_embed;

        const ticket = await Ticket.findOne({ ChannelID: interaction.channelId });
        const deletionEmbed2 = new EmbedBuilder()
          .setTitle(ticketDelete_title_language)
          .setDescription(ticketDelete_Description_language)
          .setColor('#FF0000'); // Red color
  
        if (ticket && ticket.Deleted === true) return await interaction.reply({
          embeds: [deletionEmbed2],
          ephemeral: true, // Assuming you want this message to be visible only to the user issuing the command
        });
        if (ticket && ticket.Deleted === false) {
          ticket.Deleted = true;
          await ticket.save();
          const deletionEmbed = new EmbedBuilder()
            .setTitle(ticketDelete_title_language)
            .setDescription(ticketDelete_being_deleted_language)
            .setColor('#FF0000'); // Red color
  
          await interaction.reply({
            embeds: [deletionEmbed],
            ephemeral: true, // Assuming you want this message to be visible only to the user issuing the command
          });
          setTimeout(async () => {
            try {
              await interaction.channel.delete();
            } catch (error) {
              console.error('Error deleting channel:', error);
              // Handle the error or send a message indicating the issue
              await interaction.reply(ticketDelete_failed_error_language);
            }
          }, 6000);
        }
        
      } catch (error) {
        console.error('Error fetching user language:', error);
        // Handle errors if necessary
      }
      
    }

    async function handleCSTicketInfo(options = {}) {
      try {
        const { ticketID, interaction } = options;

        const response = await axios.post('http://localhost:3000/api/checkUserLanguage', {
          memberID: interaction.user.id,
        }, {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
        });
        const userLanguage = response.data.language

        const handleCSTicketInfo_denied_title_language = languageLibrary[userLanguage]?.ticketDeletion_title_embed || languageLibrary['en'].ticketDeletion_title_embed;
        const handleCSTicketInfo_denied_description_language = languageLibrary[userLanguage]?.handleCSTicketInfo_forbidden_description_embed || languageLibrary['en'].handleCSTicketInfo_forbidden_description_embed;
        const handleCSTicketInfo_information_title_language = languageLibrary[userLanguage]?.handleCSTicketInfo_information_title_embed || languageLibrary['en'].handleCSTicketInfo_information_title_embed;
        const handleCSTicketInfo_information_field_username_language = languageLibrary[userLanguage]?.handleCSTicketInfo_information_field_username_embed || languageLibrary['en'].handleCSTicketInfo_information_field_username_embed;
        const handleCSTicketInfo_information_field_email_language = languageLibrary[userLanguage]?.handleCSTicketInfo_information_field_email_embed || languageLibrary['en'].handleCSTicketInfo_information_field_email_embed;
        const handleCSTicketInfo_information_field_issue_language = languageLibrary[userLanguage]?.handleCSTicketInfo_information_field_issue_embed || languageLibrary['en'].handleCSTicketInfo_information_field_issue_embed;
        const handleCSTicketInfo_information_credits_language = languageLibrary[userLanguage]?.handleCSTicketInfo_information_credits_embed || languageLibrary['en'].handleCSTicketInfo_information_credits_embed;
        const handleCSTicketInfo_api_error_language = languageLibrary[userLanguage]?.handleCSTicketInfo_api_error_embed || languageLibrary['en'].handleCSTicketInfo_api_error_embed;
      const allowedRoleIds = ['1192509044762615968', '1192509345838137398', '1192509359532544100'];
      const hasRequiredRole = interaction.member.roles.cache.some(role => allowedRoleIds.includes(role.id));

      try {
        if (!hasRequiredRole) {
          const notallowed = new EmbedBuilder()
            .setTitle(`<:trustnsafety:1148317341369766059> ${handleCSTicketInfo_denied_title_language}`)
            .setDescription(`${handleCSTicketInfo_denied_description_language}`);

          return await interaction.followUp({ embeds: [notallowed], ephemeral: true });
        }

        const postData = querystring.stringify({ ticketID });
        const response = await axios.post('http://localhost:3000/api/giveCSTicketInfo', postData, {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        });

        const csticketinfo = response.data.success;

        const embed = new EmbedBuilder()
          .setTitle(`${handleCSTicketInfo_information_title_language} (${ticketID})`)
          .addFields(
            {
              name: handleCSTicketInfo_information_field_username_language,
              value: `${csticketinfo.Username}`,
              inline: true
            },
            {
              name: handleCSTicketInfo_information_field_email_language,
              value: `${csticketinfo.Email}`,
              inline: true
            },
            {
              name: handleCSTicketInfo_information_field_issue_language,
              value: `${csticketinfo.Issue}`,
              inline: false
            },
          )
          .setColor("#d7fe6c")
          .setFooter({
            text: handleCSTicketInfo_information_credits_language,
          });

        // Send a follow-up message with the embed containing ticket information
        await interaction.followUp({ embeds: [embed], ephemeral: true });
      } catch (error) {
        // Handle errors by sending an ephemeral follow-up message with an error
        await interaction.followUp({
          content: handleCSTicketInfo_api_error_language,
          ephemeral: true,
        });
      }

      } catch (error) {
        console.error('Error fetching user language:', error);
        // Handle errors if necessary
      }

    }



    // Usage
    const supportHandlers = {
      'ts-support': (interaction) => handleSupportForm(interaction, 'ToyShooters', 'ts'),
      'fl-support': (interaction) => handleSupportForm(interaction, 'Football Legend', 'fl'),
      'rn-support': (interaction) => handleSupportForm(interaction, 'Remake Network', 'remake'),
      'openticket': handleOpenTicket,
      'got_it': handleGotIt,
      'closepost': handleClosePost,
      'sensitivesupport': HandleSensitiveForumPost,
      'trustnsafety': (interaction) => handleTrustnSafety({ interaction: interaction }),
      'closeticket-remake': (interaction) => handleCloseTicket(interaction, 'remake'),
      'closeticket-fl': (interaction) => handleCloseTicket(interaction, 'fl'),
      'closeticket-ts': (interaction) => handleCloseTicket(interaction, 'ts'),
      'ticket-transcription': handleTicketTranscription,
      'ticket-reopen': handleOpenReOpenTicket,
      'ticket-delete': handleTicketDelete,
    };

    const gameType = interaction.customId;
    console.log('Custom ID:', gameType); // Add this line for debugging
    // Check if it's a 'closeticket' action
    if (gameType.startsWith('closeticket-')) {
      if (gameType in supportHandlers) {
        supportHandlers[gameType](interaction);
      } else {
        console.log(`Invalid ticketType: ${gameType}`);
      }
    } else {
      if (gameType in supportHandlers) {
        supportHandlers[gameType](interaction);
      }
    }

    async function allowStaffRoleToSendMessages(ticketChannel, guild, channelName) {
      const ticketType = channelName.split('-')[0]; // Extract the ticket type from the channel name

      let staffRoleID;
      switch (ticketType) {
        case 'fl':
          staffRoleID = '1192509359532544100'; // 'fl' staff role ID
          break;
        case 'ts':
          staffRoleID = '1192509345838137398'; // 'ts' staff role ID
          break;
        case 'remake':
          staffRoleID = '1192509044762615968'; // 'remake' staff role ID
          break;
        default:
          staffRoleID = null;
      }

      // Check if the staff role ID is valid
      if (staffRoleID) {
        const staffRole = guild.roles.cache.get(staffRoleID);
        if (staffRole) {
          // Modify staff role permissions to allow sending messages
          await ticketChannel.permissionOverwrites.edit(staffRole, {
            'SendMessages': true,
            'ViewChannel': true,
          });
        }
      }
    }

    async function handleOpenReOpenTicket(interaction) {
      const interactionChannelId = interaction.message.channelId; // Get the channel ID from the interaction
      try {
        const ticket = await Ticket.findOne({ ChannelID: interactionChannelId });

        if (!ticket) {
          console.error('Ticket not found in the database');
          return; // Handle the case where the ticket isn't found
        }

        // Retrieve the user ID associated with the ticket from MongoDB
        const ticketUserId = ticket.MemberID;

        // Fetch the guild and ticket channel
        const guild = interaction.guild;
        const ticketChannel = guild.channels.cache.get(interactionChannelId);

        if (!ticketChannel) {
          console.error('Ticket channel not found');
          return; // Handle the case where the ticket channel isn't found
        }
        const ticketClosedMessageID = ticket.TicketClosed_MessageID;

        if (ticketClosedMessageID) {
          const messageToDelete = await ticketChannel.messages.fetch(ticketClosedMessageID);
          if (messageToDelete) { await messageToDelete.delete(); }
        }
        // Restore permissions for the user
        await ticketChannel.permissionOverwrites.edit(ticketUserId, {
          'SendMessages': true,
          'ViewChannel': true,
        });

        const ticketchannel2 = guild.channels.cache.find(channel => channel.name === interaction.channel.name);

        if (ticketChannel) {
          allowStaffRoleToSendMessages(ticketchannel2, guild, interaction.channel.name);
        }
        // Send a message or reply indicating the user has been added back
        await ticketchannel2.send(`User <@${ticketUserId}> has been added back to the ticket channel.`);
      } catch (error) {
        console.error('Error handling re-opening ticket:', error);
        await interaction.reply('There was an error handling the ticket re-opening.');
      }
    }

    async function handleTicketTranscription(interaction) {
      const discordTranscripts = require('discord-html-transcripts');

      const ticketChannel = interaction.channel;

      try {
        const attachment = await discordTranscripts.createTranscript(ticketChannel);

        const logsChannelID = '1192524880361554046';
        const logsChannel = interaction.guild.channels.cache.get(logsChannelID);

        if (!logsChannel) {
          await interaction.reply({
            content: 'Logs channel not found.',
            ephemeral: true,
          });
        }

        const transcriptMessage = await logsChannel.send({
          files: [attachment],
        });

        const ticket = await Ticket.findOne({ ChannelID: ticketChannel.id });

        if (!ticket) {
          return interaction.reply({
            content: 'Ticket not found.',
            ephemeral: true, // Set the response as ephemeral
          });
        }

        const transcriptMessageID = transcriptMessage.id;

        // Update the ticket's TicketTranscript_MessageID in the database
        ticket.TicketTranscript_MessageID = transcriptMessageID;
        await ticket.save();
        const transcriptslink = `[Click here](https://discord.com/channels/${interaction.guild.id}/${transcriptMessageID})`;
        await interaction.reply(`Ticket transcript has been generated and sent to the logs channel. ${transcriptslink}`);
      } catch (error) {
        console.error('Error handling ticket transcription:', error);
        await interaction.reply({
          content: 'There was an error generating the ticket transcript.',
          ephemeral: true, // Set the response as ephemeral
        });
      }
    }




    async function deleteMessagesExceptFirst(channel) {
      try {
        let messages = await channel.messages.fetch(); // Fetch all messages

        // Get the first message from the collection
        const firstMessage = messages.first();

        // Filter out the first message from the collection
        messages = messages.filter(msg => msg.id !== firstMessage.id);

        // Delete all messages in the collection except the first one
        messages.forEach(async msg => {
          await msg.delete();
        });
      } catch (error) {
        console.error('Error deleting messages:', error);
      }
    }

    async function handleCloseTicket(interaction, ticketType) {
      try {
        const response = await axios.post('http://localhost:3000/api/checkUserLanguage', {
          memberID: interaction.user.id,
        }, {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
        });
        const userLanguage = response.data.language

        const handleCloseTicket_alreadyDeleted_language = languageLibrary[userLanguage]?.handleCloseTicket_alreadyDeleted_embed || languageLibrary['en'].handleCloseTicket_alreadyDeleted_embed;
        const handleCloseTicket_transcript_language = languageLibrary[userLanguage]?.handleCloseTicket_button_transcript_button || languageLibrary['en'].handleCloseTicket_button_transcript_button;
        const handleCloseTicket_open_language = languageLibrary[userLanguage]?.handleCloseTicket_button_open_button || languageLibrary['en'].handleCloseTicket_button_open_button;
        const handleCloseTicket_delete_language = languageLibrary[userLanguage]?.handleCloseTicket_button_delete_button || languageLibrary['en'].handleCloseTicket_button_delete_button;
        const handleCloseTicket_closedby_language = languageLibrary[userLanguage]?.handleCloseTicket_ticketClosedBy_embed || languageLibrary['en'].handleCloseTicket_ticketClosedBy_embed;
        const handleCloseTicket_closed_language = languageLibrary[userLanguage]?.handleCloseTicket_ticketClosed_embed || languageLibrary['en'].handleCloseTicket_ticketClosed_embed;
        
        const ticketUserId = interaction.user.id;
        const guild = interaction.guild;
        const interactionChannelId = interaction.channelId;

          const ticket = await Ticket.findOne({ ChannelID: interactionChannelId });
  
          if (!ticket) {
            return console.error('Ticket not found in the database');
          }
  
          // Check if the ticket is already closed
          if (ticket.Closed) {
            return await interaction.reply({
              content: handleCloseTicket_alreadyDeleted_language,
              ephemeral: true,
            });
          }
  
          const ticketChannel = guild.channels.cache.get(interactionChannelId);
  
          if (!ticketChannel) {
            return console.error('Ticket channel not found');
          }
  
          // Check if the user is in the channel
          const isUserInChannel = ticketChannel.members.some(member => member.id === ticketUserId);
  
          if (!isUserInChannel) {
            return console.error('User is not in the ticket channel');
          }
  
          await ticketChannel.setName(`${ticketType}-resolved-${ticket.TicketID}`);
  
          let staffRoleID;
          switch (ticketType) {
            case 'fl':
              staffRoleID = '1192509359532544100'; // 'fl' staff role ID
              break;
            case 'ts':
              staffRoleID = '1192509345838137398'; // 'ts' staff role ID
              break;
            case 'remake':
              staffRoleID = '1192509044762615968'; // 'remake' staff role ID
              break;
            default:
              staffRoleID = null;
          }
  
          // Check if the staff role ID is valid
          if (staffRoleID) {
            const staffRole = guild.roles.cache.get(staffRoleID);
            if (staffRole) {
              // Modify staff role permissions
              await ticketChannel.permissionOverwrites.edit(staffRole, {
                'SendMessages': false,
                'ViewChannel': true,
              });
            }
          }
          await ticketChannel.permissionOverwrites.edit(interaction.user.id, {
            'SendMessages': false,
            'ViewChannel': false,
          });
          await ticketChannel.permissionOverwrites.delete(interaction.user.id);
          // Create and send an embed to indicate the ticket closure
          const closedembed = new EmbedBuilder()
            .setTitle(handleCloseTicket_closed_language)
            .setDescription(handleCloseTicket_closedby_language.replace("{UserID}", interaction.user.id))
            .setColor("#d7fe6c")
            .setFooter({
              text: "CS Tools were developed by Mikael",
            });

          const closedMessage = ticketChannel.send({
            components: [
              new ActionRowBuilder()
                .addComponents(
                  new ButtonBuilder()
                    .setCustomId('ticket-transcription')
                    .setLabel(handleCloseTicket_transcript_language)
                    .setStyle(1)
                    .setEmoji('1184876210954715136')
                    .setDisabled(false),
                  new ButtonBuilder()
                    .setCustomId('ticket-reopen')
                    .setLabel(handleCloseTicket_open_language)
                    .setStyle(1)
                    .setEmoji('1184876539611988018')
                    .setDisabled(false),
                  new ButtonBuilder()
                    .setCustomId('ticket-delete')
                    .setLabel(handleCloseTicket_delete_language)
                    .setStyle(1)
                    .setEmoji('1184907547598147666')
                    .setDisabled(false),
                ),
            ],
            embeds: [closedembed],
          });
          // Update the ticket's Closed field in the database to true
          ticket.Closed = true;
          ticket.TicketClosed_MessageID = closedMessage.id;
          await ticket.save();

      } catch (error) {
        console.error('Error fetching user language:', error);
        // Handle errors if necessary
      }

  
    }

    async function checkBlacklisted(memberID) {
      try {
        const data = querystring.stringify({ memberID });
        const config = {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        };

        const response = await axios.post('http://localhost:3000/api/checkBlacklist', data, config);
        const { success, error } = response.data;

        if (error) {
          console.error('Error from API:', error);
          return `There was an error: ${error}`;
        }

        if (success) {
          // User is not blacklisted
          return null;
        }

        // User is blacklisted
        return success;
      } catch (error) {
        console.error('Error calling API:', error);
        return 'An error occurred while checking the blacklist.';
      }
    }

    async function handleOpenTicket(interaction) {
      try {
        const ticketUser = interaction.user.id;
        const guild = interaction.guild;
    
    
        // Check if the user is blacklisted
        const blacklistedMessage = await checkBlacklisted(ticketUser);
        if (blacklistedMessage) {
          return interaction.editReply({ content: blacklistedMessage, ephemeral: true });
        }
    
        // Retrieve user language preference
        const responseLang = await axios.post('http://localhost:3000/api/checkUserLanguage', { memberID: ticketUser }, {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
        });
        const userLanguage = responseLang.data.language || 'en';
    
        // Check if an existing ticket exists for the user
        const [checkResponse] = await Promise.all([
          axios.post('http://localhost:3000/api/checkExistingTicket', querystring.stringify({ memberID: ticketUser }), {
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded',
            },
          }),
        ]);
        const { exists, link } = checkResponse.data;
    
        // If an existing ticket exists, provide link and message
        if (exists) {
          const existingTicketEmbed = new EmbedBuilder()
            .setTitle(languageLibrary[userLanguage]?.handleOpenTicket_existingTicket_Embed || languageLibrary['en'].handleOpenTicket_existingTicket_Embed)
            .setDescription(languageLibrary[userLanguage]?.handleOpenTicket_existingTicket_description_Embed || languageLibrary['en'].handleOpenTicket_existingTicket_description_Embed)
            .setColor('#FF0000');
    
          interaction.reply({
            components: [
              new ActionRowBuilder()
                .addComponents(
                  new ButtonBuilder()
                    .setLabel(languageLibrary[userLanguage]?.handleOpenTicket_goToTicket_Embed)
                    .setStyle(5)  // Link type
                    .setEmoji('1184876210954715136')
                    .setURL(link)
                ),
            ],
            embeds: [existingTicketEmbed],
            ephemeral: true,
          });
        }

        const permissions = [
          {
            id: ticketUser,
            allow: [PermissionsBitField.Flags.ViewChannel, PermissionsBitField.Flags.ReadMessageHistory],
            deny: [PermissionsBitField.Flags.CreatePublicThreads, PermissionsBitField.Flags.CreatePrivateThreads, PermissionsBitField.Flags.SendMessages],
          },
          {
            id: guild.roles.everyone,
            deny: [PermissionsBitField.Flags.ViewChannel],
          },
        ];
    
          const textChannel = await guild.channels.create({
            type: 0,
            parent: '1192508841632477275',
            permissionOverwrites: permissions,
            name: `pending-${interaction.user.id}`,
          });

        const [createTicketResponse] = await Promise.all([
          axios.post('http://localhost:3000/api/handleCreateTicket', querystring.stringify({ guildID: guild.id, memberID: ticketUser, channelID: textChannel.id }), {
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded',
            },
          }),
        ]);
    
        const { success, error } = createTicketResponse.data;
    
        if (success) {
          // Reply with an ephemeral message to the user
        // If no existing ticket, proceed to create one

          const ticketEmbed = new EmbedBuilder()
            .setTitle(languageLibrary[userLanguage]?.handleOpenTicket_ticketCreated_Embed)
            .setColor('#57F287')
            .setDescription(languageLibrary[userLanguage]?.handleOpenTicket_ticketCreated_description_Embed.replace("{guild.id}", guild.id).replace("{textChannel.id}", textChannel.id));
    
          await interaction.reply({ embeds: [ticketEmbed], ephemeral: true });
    
          // Send message with buttons in the newly created channel
          const ticket_created_message_in_the_ticket = new EmbedBuilder()
            .setTitle(languageLibrary[userLanguage]?.handleOpenTicket_ticketCreated_label_RemakeNetwork_Embed)
            .setColor('#57F287')
            .setDescription(languageLibrary[userLanguage]?.handleOpenTicket_ticketCreated_description_RemakeNetwork_Embed);
    
          await textChannel.send({
            content: `<@${ticketUser}>`,
            components: [
              new ActionRowBuilder()
                .addComponents(
                  new ButtonBuilder()
                    .setCustomId('ts-support')
                    .setLabel(languageLibrary[userLanguage]?.handleOpenTicket_ticketCreated_label_ToyShooters_Embed)
                    .setStyle(1)
                    .setEmoji('1181954449539874836')
                    .setDisabled(false),
                  new ButtonBuilder()
                    .setCustomId('fl-support')
                    .setLabel(languageLibrary[userLanguage]?.handleOpenTicket_ticketCreated_label_FootballLegend_Embed)
                    .setStyle(1)
                    .setEmoji('1181954647720742993')
                    .setDisabled(false),
                  new ButtonBuilder()
                    .setCustomId('rn-support')
                    .setLabel(languageLibrary[userLanguage]?.handleOpenTicket_ticketCreated_label_RemakeNetwork_Embed)
                    .setStyle(1)
                    .setEmoji('1148610287914721281')
                    .setDisabled(false),
                ),
            ],
            embeds: [ticket_created_message_in_the_ticket],
          });
        } else if (error) {
          console.error('API Error:', error);
          await interaction.reply({ content: 'There was an error creating the ticket.', ephemeral: true });
        } else {
          console.error('Unknown API response:', createTicketResponse.data);
          await interaction.reply({ content: 'There was an issue with creating the ticket.', ephemeral: true });
        }
      } catch (error) {
        console.error('Error handling open ticket:', error);
        await interaction.reply({ content: 'There was an error while processing your request.', ephemeral: true });
      }
    }
    
    


    async function handleGotIt(interaction) {
      const channelIdToFind = interaction.channelId;
      const matchingOwner = threadOwners.find(owner => owner.channelId === channelIdToFind);

      if (matchingOwner && interaction.user.id === matchingOwner.ownerId) {
        await interaction.message.delete();
        if (threadOwners[interaction.channelId]) return delete threadOwners[interaction.channelId];
      } else {
        const hideerror = new EmbedBuilder()
          .setTitle('Cannot hide message')
          .setDescription(`Only the post owner can hide this message!`);
        await interaction.reply({ embeds: [hideerror], ephemeral: true });
      }
    }

    async function handleClosePost(interaction) {
      const channelIdToFind2 = interaction.channelId;
      const matchingOwner2 = threadOwners.find(owner => owner.channelId === channelIdToFind2);
      const allowedRoleIds2 = ['1192508996310024222', '1192509044762615968'];
      // 1192509044762615968 - Staff role (Emplooyee)
      // 1192508996310024222 - Support role (regular support)
      const hasRequiredRole2 = interaction.member.roles.cache.some(role => allowedRoleIds2.includes(role.id));

      if (matchingOwner2 && interaction.user.id === matchingOwner2.ownerId || hasRequiredRole2) {
        const closepostembed = new EmbedBuilder()
          .setTitle(' ')
          .setDescription(`<:post_closed:1149085755247951892> Post has been closed!\n\nOriginal Poster: <@${matchingOwner2.ownerId}>\n\nClosed by: <@${interaction.user.id}>`);

        try {
          const threadChannel = interaction.guild.channels.cache.find(channel => channel.id === matchingOwner2.channelId)
          console.log(threadChannel)
          threadChannel.setLocked(true)
            .then(newThread => console.log(`Thread is now ${newThread.locked ? 'locked' : 'unlocked'}`))
            .catch(console.error);
          threadChannel.setName(`${threadChannel.name}  [RESOLVED]`)
            .then(newThread => console.log(`Thread's new name is ${newThread.name}`))
            .catch(console.error);
          await interaction.reply({ embeds: [closepostembed] });

          // Remove this thread from the threadOwners object
          if (threadOwners[channelIdToFind2]) {
            delete threadOwners[channelIdToFind2];
          }
        } catch (error) {
          console.error('Error while closing post:', error);
        }
      } else {
        const hideerror = new EmbedBuilder()
          .setTitle('Cannot close post')
          .setDescription(`Only the post owner can close this post.`);

        await interaction.reply({ embeds: [hideerror], ephemeral: true });
      }
    }

    async function HandleSensitiveForumPost(interaction) {
      await interaction.reply({
        embeds: [{
          title: `Ticket Hidden`,
          description: `<@${interaction.user.id}> has marked the ticket as sensitive, and as a result, it is now exclusively accessible to support agent and thread owner only.\n\nThis measure has been put in place to safeguard the confidentiality of the ticket's contents.`
        }],
      });
    }


    async function handleTrustnSafety(options = {}) {
      const {
        username,
        email,
        issue,
        interaction,
      } = options;
      const allowedRoleIds = ['1192508996310024222', '1192509044762615968'];
      // 1192509044762615968 - Staff role (Employee)
      // 1192508996310024222 - Support role (regular support)
      const hasRequiredRole = interaction.member.roles.cache.some(role => allowedRoleIds.includes(role.id));
      const ticketChannelName = interaction.channel.name;

      if (!hasRequiredRole) {
        const notallowed = new EmbedBuilder()
          .setTitle(`<:trustnsafety:1148317341369766059> You're not allowed to use this button`)
          .setDescription(`Only a Customer Support Representative or a Remake Network representative can use the CS Tools`);

        return await interaction.reply({ embeds: [notallowed], ephemeral: true });
      }

      // Function to check if the channel name starts with any of the specified prefixes
      const startsWithPrefix = (channelName, prefixes) => {
        return prefixes.some(prefix => channelName.startsWith(prefix));
      };

      // Array of prefixes to check for
      const prefixesToCheck = ['ts-', 'fl-', 'remake-'];

      // Declare select outside the if block
      let select;

      // Check if the channel name contains "ts-", and if so, add the "CS Ticket Info" option
      select = new StringSelectMenuBuilder()
        .setCustomId('starter')
        .setPlaceholder(`🛠 Which tool do you wish to access? 🛠`)
        .setDisabled(false);

      if (startsWithPrefix(ticketChannelName, prefixesToCheck)) {

        select.addOptions(
          new StringSelectMenuOptionBuilder()
            .setLabel('CS Ticket Info')
            .setDescription(`This will show information for ${ticketChannelName}`)
            .setValue('csticketinfo2')
            .setEmoji('1148611118865059900')  // You can replace this with an actual emoji ID
        );
      }

      // Add other options as needed
      select.addOptions(
        new StringSelectMenuOptionBuilder()
          .setLabel('CS Representative')
          .setDescription('This will show tools available for Customer Support')
          .setValue('csmember')
          .setEmoji('1148610287914721281'),
        new StringSelectMenuOptionBuilder()
          .setLabel('Remake Network Representative')
          .setDescription('This will show tools for Remake Network Representative')
          .setValue('rn_employee')
          .setEmoji('1148610761485209671')
      );

      const embed = new EmbedBuilder()
        .setTitle(` `)
        .setColor('#57F287')
        .setDescription(`<:trustnsafety:1148317341369766059> Hello, <@${interaction.user.id}>!\n\n We have created a suite of tools designed to streamline and enhance the work of our support team, making their tasks more efficient and effective.\n\n<:csmember:1148610287914721281>***Customer Support Representative***<:csmember:1148610287914721281>\nCustomer Support Members will get access to a few things such as:\n* Delete Forum Post(Suggestions/Bug/etc)\n* Example 1\n* Example 2\n* Example 3\n* Example 4 blabla\n\n<:f4b94d1f5acdaf84e97500648cff65fc:1148610761485209671> ***Remake Network Representative*** <:f4b94d1f5acdaf84e97500648cff65fc:1148610761485209671>\nRemake Network Representatives are individuals who are invited and highly trusted to access these tools beyond their own game, which they moderate. This is done to assist our partner in moderation and eliminate rule-breakers.\n\nThey can do a few things such as:\n\n* Account Perm/temp-ban\n* Account Lock/Unlock\n* Sending a account warning to their email\n* They can also look up account history such as recent activities.\n\n***Abusing CS Tools may lead to termination of access to CS Tools and other intern tools, as well as potential further action without prior warning!***\n\n___CS Tools was developed by *Mikael*, If any error/bug please contact him.___`);

      const row = new ActionRowBuilder()
        .addComponents(select);

      await interaction.reply({
        embeds: [embed],
        components: [row],
        ephemeral: true,
      });
      // Create a filter function to listen for select menu interactions
      const filter = i => i.user.id === interaction.user.id;

      // Create a collector
      const collector = interaction.channel.createMessageComponentCollector({
        time: 0, // Time in milliseconds for how long the collector should listen for interactions (adjust as needed)
        max: 1, // Maximum interactions to collect (in this case, we'll collect just one)
      });
      // Listen for interactions
      collector.on('collect', async interaction => {
        // Reset the select menu by removing the components
        await interaction.update({
          components: [row],
        });

        // Perform actions based on the selected value
        const selectedValue = interaction.values[0]; // Assuming only one value is selected
        switch (selectedValue) {
          case 'csticketinfo2':
            const parts = interaction.channel.name.split('-');
            const ticketID = parts[parts.length - 1];
            console.log(ticketID)
            await handleCSTicketInfo({ ticketID, interaction });
            break;
          case 'csmember':
            // Handle CS Representative selection
            // Perform actions or reply accordingly here
            break;
          case 'rn_employee':
            // Handle Remake Network Representative selection
            // Perform actions or reply accordingly here
            break;
          // Add more cases as needed for other menu options
          default:
            // Handle default case if needed
            break;
        }

        // Clean up the collector
        collector.stop();
      });
    }

  } else if (interaction.isModalSubmit()) {
    console.log(interaction.customId)

    async function handleSupportForm(interaction, roleId, formTitle, channelNamePrefix) {
      const guild = interaction.guild;
      const ticketUser = interaction.user.id;
      const usernameInput = interaction.fields.getTextInputValue('usernameInput');
      const emailInput = interaction.fields.getTextInputValue('emailInput');
      const issueInput = interaction.fields.getTextInputValue('issueInput');
      console.log({ usernameInput, emailInput, issueInput });
      try {
        const response = await axios.post('http://localhost:3000/api/checkUserLanguage', {
          memberID: ticketUser,
        }, {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
        });
        const userLanguage = response.data.language

        const handleSupportForm_supportForm_title_language = languageLibrary[userLanguage]?.handleSupportForm_title_SupportForm_embed || languageLibrary['en'].handleSupportForm_title_SupportForm_embed;
        const handleSupportForm_supportForm_description_language = languageLibrary[userLanguage]?.handleSupportForm_description_SupportForm_embed || languageLibrary['en'].handleSupportForm_description_SupportForm_embed;
        const handleSupportForm_sentMessage_labelClose_language = languageLibrary[userLanguage]?.handleSupportForm_sentMessage_labelClose_embed || languageLibrary['en'].handleSupportForm_sentMessage_labelClose_embed;
        const handleSupportForm_sentMessage_labelSupportGuidelines_language = languageLibrary[userLanguage]?.handleSupportForm_sentMessage_labelSupportGuidelines_embed || languageLibrary['en'].handleSupportForm_sentMessage_labelSupportGuidelines_embed;
        const handleSupportForm_sentMessage_labelcstools_language = languageLibrary[userLanguage]?.support_button_cstools || languageLibrary['en'].support_button_cstools;
        const handleSupportForm_sentMessage_responseTimeNotice_language = languageLibrary[userLanguage]?.handleSupportForm_sentMessage_responsetimeNotice_embed || languageLibrary['en'].handleSupportForm_sentMessage_responsetimeNotice_embed;
        const handleSupportForm_sentMessage_responseTimeDescription_language = languageLibrary[userLanguage]?.handleSupportForm_sentMessage_responseTimeDescription_embed || languageLibrary['en'].handleSupportForm_sentMessage_responseTimeDescription_embed;

        const existingTicket = await Ticket.findOne({ MemberID: ticketUser, Pending: true });
        if (existingTicket && existingTicket.ChannelID) {
          console.log(existingTicket.ChannelID)
          const channelFromID = interaction.guild.channels.cache.get(existingTicket.ChannelID);
          existingTicket.Pending = false;
          existingTicket.Username = usernameInput;
          existingTicket.Email = emailInput;
          existingTicket.Issue = issueInput;
          existingTicket.Type = `${formTitle} - Support Ticket`;
          await existingTicket.save();
          //const ticketID = existingTicket.TicketID
          //await handleCSTicketInfo({ ticketID, interaction });
          if (channelFromID) {
            const channel2 = channelFromID;
  
            const channel = interaction.channel;
            await channel.bulkDelete(100);
  
            const supportRole = interaction.guild.roles.cache.get(roleId);
  
            if (!supportRole) {
              console.error(`Role with ID ${roleId} not found`);
              return;
            }
  
            const onlineMembers = supportRole.members.filter(member => member.presence?.status === 'online').size;
  
            await channel2.permissionOverwrites.edit(interaction.user.id, {
              'SendMessages': true,
              'EmbedLinks': true,
              'AttachFiles': true,
            });
  
            await channel2.permissionOverwrites.edit(supportRole, {
              'SendMessages': true,
              'EmbedLinks': true,
              'ReadMessageHistory': true,
              'ViewChannel': true,
              'AttachFiles': true,
            });
  
            // const ticketinfo = new EmbedBuilder()
            //   .setTitle("Ticket Information")
            //   .addFields(
            //     {
            //       name: "Account Username",
            //       value: `${usernameInput}`,
            //       inline: true
            //     },
            //     {
            //       name: "Account Email",
            //       value: `${emailInput}`,
            //       inline: true
            //     },
            //     {
            //       name: "Issue",
            //       value: `${issueInput}`,
            //       inline: false
            //     },
            //   )
            //   .setColor("#d7fe6c")
            //   .setFooter({
            //     text: "CS Tools were developed by Mikael",
            //   });
  
            // await channel2.send({
            //   embeds: [ticketinfo],
            // });
  
            const embed = new EmbedBuilder()
              .setTitle(handleSupportForm_supportForm_title_language.replace("{formTitle}", formTitle))
              .setDescription(handleSupportForm_supportForm_description_language.replace("{ticketUser}", `<@${ticketUser}>`).replace("{formTitle}", formTitle))
              .setColor("#00b0f4");
  
            const sentMessage = await channel2.send({
              content: `<@${ticketUser}>`,
              components: [
                new ActionRowBuilder()
                  .addComponents(
                    new ButtonBuilder()
                      .setCustomId(`closeticket-${channelNamePrefix}`)
                      .setLabel(handleSupportForm_sentMessage_labelClose_language)
                      .setStyle(4)
                      .setEmoji('1148722699552690176')
                      .setDisabled(false),
                    new ButtonBuilder()
                      .setCustomId('supportguidelines')
                      .setLabel(handleSupportForm_sentMessage_labelSupportGuidelines_language)
                      .setStyle(2)
                      .setEmoji('1148723461229920316')
                      .setDisabled(true),
                    new ButtonBuilder()
                      .setCustomId('trustnsafety')
                      .setLabel(handleSupportForm_sentMessage_labelcstools_language)
                      .setStyle(1)
                      .setEmoji('1148317341369766059')
                      .setDisabled(false)
                  ),
              ],
              embeds: [embed],
            });
            await sentMessage.pin();
  
            channel.setName(`${channelNamePrefix}-ticket-${existingTicket.TicketID}`)
              .then(async updatedChannel => {
                if (onlineMembers === 0) {
                  const noSupportAgentEmbed = new EmbedBuilder()
                    .setTitle(handleSupportForm_sentMessage_responseTimeNotice_language)
                    .setDescription(handleSupportForm_sentMessage_responseTimeDescription_language.replace("{formTitle}", formTitle))
                    .setColor('#FF0000');
  
                  return channel2.send({ embeds: [noSupportAgentEmbed] });
                }
              })
              .catch(error => {
                return console.error('Error updating channel name:', error);
              });
  
          } else {
            return console.error('Internal Error (2)');
            // Handle the case where the channel doesn't exist in Discord.js cache
          }
        } else {
          return console.error('Internal Error (3)');
          // Handle the case where either the existing ticket or ChannelID is not found
        }
      } catch (error) {
        console.error('Error fetching user language:', error);
        // Handle errors if necessary
      }
      
    }


    // Usage
    const gameType = interaction.customId;
    console.log(gameType)
    if (gameType === 'flSupportFormv1') {
      handleSupportForm(interaction, '1192509359532544100', 'Football Legend', 'fl');
    } else if (gameType === 'tsSupportFormv1') {
      handleSupportForm(interaction, '1192509345838137398', 'ToyShooters', 'ts');
    } else if (gameType === 'remakeSupportFormv1') {
      handleSupportForm(interaction, '1192509044762615968', 'Remake Network', 'remake');
    } else {
      interaction.reply({
        content: "Failed, Please try again later.",
        ephemeral: true,
      });
      console.log("Failed, Error!");
    }


  }
});

client.start();
//await handleCSTicketInfo({ ticketID, interaction });

process.on('unhandledRejection', console.error);
process.on('uncaughtException', console.error);