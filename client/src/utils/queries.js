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

export const GET_AI_PLANS = gql`
  query aiPlans($userId: ID!) {
    aiPlans(userId: $userId) {
      _id
      userId
      title
      plan
    }
  }
`;
