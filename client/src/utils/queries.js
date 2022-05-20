import { gql } from '@apollo/client';

export const QUERY_ALL_AGENCY = gql`
  query AllAgencySlots {
    allAgencySlots {
      _id
      agencyCode
      slotAvailable
      participatedIds {
        _id
        micoId
        eventName
        createdAt
      }
      slotRemained
      createdAt
    }
  }
`;

export const QUERY_SINGLE_AGENCY = gql`
  query AgencySlotByCode($agencyId: ID!) {
    agencySlotByCode(agencyId: $agencyId) {
      _id
      agencyCode
      slotAvailable
      participatedIds {
        _id
        micoId
        eventName
        createdAt
      }
      slotRemained
      createdAt
    }
  }
`;
