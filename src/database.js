const mongoose = require('mongoose');

const ticketSchema = new mongoose.Schema({
    GuildID: { type: String, required: false },
    MemberID: { type: String, required: false },
    TicketID: { type: String, required: false },
    ChannelID: { type: String, required: false },
    Transcription: { type: String, required: false },
    Closed: { type: Boolean, default: false },
    Locked: { type: Boolean, default: false },
    Pending: { type: Boolean, default: false },
    Deleted: { type: Boolean, default: false },
    Type: { type: String, required: true },
    Username: { type: String, required: false },
    Email: { type: String, required: false },
    Issue: { type: String, required: false },
    TicketClosed_MessageID: { type: String, required: false },
    TicketTranscript_MessageID: { type: String, required: false },
  });
  
  const TicketBlacklistedSchema = new mongoose.Schema({
    MemberID: { type: String, required: true },
    StaffMember: { type: String, required: true },
    Reason: { type: String, default: 'No reason provided' }, // Setting a default value for Reason
    Date: { type: Date, default: Date.now }
  });

  const uri = 'db link here';
  const dbName = 'ticketsystem';

  mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: dbName,
  });

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'Connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB successfully!');
});

const Ticket = mongoose.model('Ticket', ticketSchema);
const TicketBlacklisted = mongoose.model('TicketBlacklisted', TicketBlacklistedSchema, 'blacklisted');

module.exports = {
  db,
  Ticket,
  TicketBlacklisted,
};