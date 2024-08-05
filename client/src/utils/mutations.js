import { gql } from "@apollo/client";

export const LOGIN_USER = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser($userData: NewUserInput!) {
    addUser(userData: $userData) {
      token
      user {
        _id
        username
        __typename
      }
      __typename
    }
  }
`;

export const REMOVE_USER = gql`
  mutation removeUser($userId: ID!) {
    removeUser(userId: $userId) {
      _id
      username
    }
  }
`;

export const UPDATE_USER = gql`
  mutation updateUser($userId: ID!, $updateData: UpdateUserInput!) {
    updateUser(userId: $userId, updateData: $updateData) {
      _id
      username
    }
  }
`;

export const ADD_LEGION = gql`
  mutation addLegion($legionData: NewLegionInput!) {
    addLegion(legionData: $legionData) {
      _id
      name
      description
      maxPlayers
      numRounds
      voteTime
      submitTime
    }
  }
`;

export const UPDATE_LEGION = gql`
  mutation updateLegion($legionId: ID!, $legionData: UpdateLegionInput!) {
    updateLegion(legionId: $legionId, legionData: $legionData) {
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

export const DELETE_LEGION = gql`
  mutation deleteLegion($legionId: ID!) {
    deleteLegion(legionId: $legionId) {
      _id
    }
  }
`;


