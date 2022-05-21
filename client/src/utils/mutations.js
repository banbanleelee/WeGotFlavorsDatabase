import { gql } from '@apollo/client';

export const ADD_AGENCY = gql`
  mutation addAgency($agencyCode: Int!, $slotAvailable: Int!) {
    addAgency(agencyCode: $agencyCode, slotAvailable: $slotAvailable) {
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

export const SIGN_UP = gql`
  mutation signUp($agencyCode: Int!, $micoId: Int!, $eventName: String!, $time: String!) {
    signUp(agencyCode: $agencyCode, micoId: $micoId, eventName: $eventName, time: $time) {
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

export const REMOVE_SIGN_UP = gql`
  mutation removeSignUp($agencyCode: Int!, $micoId: Int!) {
    removeSignUp(agencyCode: $agencyCode, micoId: $micoId) {
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