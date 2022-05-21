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
    time: String
    createdAt: String
  }

  type Query {
    allAgencySlots: [AgencySlots]!
    agencySlotByCode(agencyCode: Int!): AgencySlots
  }

  type Mutation {
    addAgency(agencyCode: Int!, slotAvailable: Int!): AgencySlots
    signUp(agencyCode: Int!, micoId: Int!, eventName: String!, time: String!): AgencySlots
    removeSignUp(agencyCode: Int!, micoId: Int!): AgencySlots
  }
`;

module.exports = typeDefs;
