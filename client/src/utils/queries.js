import { gql } from '@apollo/client';

export const QUERY_ALL_AGENCY = gql`
query allAgencySlots {
  allAgencySlots {
    _id
    agencyCode
    slotAvailable
    participatedIds {
      _id
      micoId
      eventName
      time
      createdAt
    }
    slotRemained
    createdAt
  }
}
`;

export const QUERY_SINGLE_AGENCY = gql`
  query agencySlotByCode($agencyCode: Int!) {
    agencySlotByCode(agencyCode: $agencyCode) {
      _id
      agencyCode
      slotAvailable
      participatedIds {
        _id
        micoId
        eventName
        time
        createdAt
      }
      slotRemained
      createdAt
    }
  }
`;
