const { agencySlots, signUp } = require('../models');

const resolvers = {
  Query: {
    allAgencySlots: async () => {
      return agencySlots.find().sort({ createdAt: -1 });
    },

    agencySlotByCode: async (parent, { agencyCode }) => {
      return agencySlots.findOne({ agencyCode: agencyCode });
    },


  },

  Mutation: {
    addAgency: async (parent, { agencyCode, slotAvailable }) => {
      return agencySlots.create({ agencyCode, slotAvailable });
    },
    signUp: async (parent, { agencyCode, micoId, eventName, time }) => {
      return agencySlots.findOneAndUpdate(
        { agencyCode: agencyCode },
        { $addToSet: { participatedIds: { micoId, eventName, time } } },
        {
          new: true,
          runValidators: true,
        }
      );
    },
    removeSignUp: async (parent, { agencyCode, micoId }) => {
      return agencySlots.findOneAndUpdate(
        { agencyCode: agencyCode },
        { $pull: { participatedIds: { micoId: micoId } } },
        { new: true }
      );
    },
  },
};

module.exports = resolvers;
