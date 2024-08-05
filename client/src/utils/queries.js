import { gql } from '@apollo/client';

export const GET_USERS = gql`
  query users {
    users {
      _id
      username
    }
  }
`;

export const GET_USER = gql`
  query user($username: String!) {
    user(username: $username) {
      _id
      username
      email
      firstName
      lastName
      profilePicture
      formattedCreatedAt
    }
  }
`;

export const GET_LEGIONS = gql`
  query legions {
    legions {
      _id
      name
      description
      numPlayers
      maxPlayers
      players 
      isActive
      numRounds
      voteTime
      submitTime
      rounds {
        _id
        roundNumber
        isComplete
      }
    }
  }
`;

export const GET_LEGION = gql`
  query legion($id: ID!) {
    legion(id: $id) {
      _id
      name
      description
      numPlayers
      maxPlayers
      players {
        _id
        username
      }
      isActive
      numRounds
      voteTime
      submitTime
      rounds {
        _id
        roundNumber
        isComplete
        prompt
        submissionDeadline
        voteDeadline
        submissions
        votes
        isComplete
      }
    }
  }
`;
