const db = require('../config/connection');
const { agencySlots } = require('../models');
const agencySlotsSeeds = require('./agencySlots.json');

db.once('open', async () => {
  await agencySlots.deleteMany({});
  await agencySlots.create(agencySlotsSeeds);

  console.log('all done!');
  process.exit(0);
});
