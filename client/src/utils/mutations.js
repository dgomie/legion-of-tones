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
  mutation updateLegion($legionId: ID!, $updateData: UpdateLegionInput!) {
    updateLegion(legionId: $legionId, updateData: $updateData) {
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

export const REMOVE_LEGION = gql`
  mutation removeLegion($legionId: ID!) {
    removeLegion(legionId: $legionId) {
      _id
    }
  }
`;

export const CREATE_ROUND = gql`
  mutation createRound($legionId: ID!, $roundData: NewRoundInput!) {
    createRound(legionId: $legionId, roundData: $roundData) {
      _id
      rounds {
        _id
        roundNumber
        prompt
        submissionDeadline
        voteDeadline
        isComplete
      }
    }
  }
`;

export const UPDATE_ROUND = gql`
  mutation updateRound($legionId: ID!, $roundId: ID!, $roundData: UpdateRoundInput!) {
    updateRound(legionId: $legionId, roundId: $roundId, roundData: $roundData) {
      _id
      rounds {
        _id
        roundNumber
        prompt
        submissionDeadline
        voteDeadline
        isComplete
      }
    }
  }
`;

export const CREATE_SONG = gql`
  mutation createSong($userId: ID!, $title: String, $artist: String, $url: String!) {
    createSong(userId: $userId, title: $title, artist: $artist, url: $url) {
      _id
      userId
      title
      artist
      url
      comment
    }
  }
`;

export const UPDATE_SONG = gql`
  mutation updateSong($_id: ID!, $title: String, $artist: String, $url: String) {
    updateSong(_id: $_id, title: $title, artist: $artist, url: $url) {
      _id
      userId
      title
      artist
      url
      comment
    }
  }
`;


