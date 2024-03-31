const { log } = require("../../functions");
const ExtendedClient = require('../../class/ExtendedClient');

const threadOwners = []; // Create an object to store thread owners
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('mydatabase.db');

module.exports = {
    event: 'ready',
    once: true,
    /**
     * 
     * @param {ExtendedClient} _ 
     * @param {import('discord.js').Client<true>} client 
     * @returns 
     */
    run: (_, client) => {

        log('Logged in as: ' + client.user.tag, 'done');

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

        function getCurrentChannelOwnerData() {
            const guild = client.guilds.cache.get('1184231203994345594'); // Replace with your guild ID
            const channelOwnerData = [];

            guild.channels.cache.forEach(channel => {
                if (channel.isThread()) {
                    channelOwnerData.push({ channelId: channel.id, ownerId: channel.ownerId });
                }
            });

            return channelOwnerData;
        }

        // Cleanup function
        async function cleanupDatabase() {
            const dbOwners = await retrieveThreadOwnersFromDatabase();
            const serverOwners = getCurrentChannelOwnerData();

            // Find entries in the database that are not in the server
            const entriesToDelete = dbOwners.filter(dbOwner => !serverOwners.some(serverOwner => serverOwner.channelId === dbOwner.channelId));

            // Delete entries from the database
            entriesToDelete.forEach(async entry => {
                await db.run("DELETE FROM threadOwners WHERE channelId = ?", [entry.channelId]);
            });
        }

        cleanupDatabase()
            .then(() => {
                log('Database cleanup successful.', 'done');
            })
            .catch(err => {
                log(`Error during database cleanup: ${err}`, 'err');
            });

    }
};