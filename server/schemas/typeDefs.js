const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type AgencySlots {
    _id: ID
    agencyCode: Int
    slotAvailable: Int
    participatedIds: [ParticipatedIds]!
    slotRemained: Int
    createdAt: String
  }

  type ParticipatedIds {
    _id: ID
    micoId: Int
    eventName: String
    createdAt: String
  }

  type Query {
    allAgencySlots: [AgencySlots]!
    agencySlotByCode(agencyId: ID!): AgencySlots
  }

  type Mutation {
    addAgency(agencyCode: Int!, slotAvailable: Int!): AgencySlots
    signUp(agencyId: ID!, micoId: Int!, eventName: String!): AgencySlots
    removeSignUp(agencyId: ID!, micoId: ID!): AgencySlots
  }
`;

module.exports = typeDefs;
