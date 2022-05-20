const { agencySlots, signUp } = require('../models');

const resolvers = {
  Query: {
    allAgencySlots: async () => {
      return agencySlots.find().sort({ createdAt: -1 });
    },

    agencySlotByCode: async (parent, { agencyId }) => {
      return agencySlots.findOne({ _id: agencyId });
    },


  },

  Mutation: {
    addAgency: async (parent, { agencyCode, slotAvailable }) => {
      return agencySlots.create({ agencyCode, slotAvailable });
    },
    signUp: async (parent, { agencyId, micoId, eventName }) => {
      return agencySlots.findOneAndUpdate(
        { _id: agencyId },
        { $addToSet: { participatedIds: { micoId, eventName } } },
        {
          new: true,
          runValidators: true,
        }
      );
    },
    removeSignUp: async (parent, { agencyId, micoId }) => {
      return agencySlots.findOneAndUpdate(
        { _id: agencyId },
        { $pull: { participatedIds: { _id: micoId } } },
        { new: true }
      );
    },
  },
};

module.exports = resolvers;
