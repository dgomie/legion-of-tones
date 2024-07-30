const typeDefs = `
  type User {
    _id: ID!
    firstName: String!
    lastName: String!
    username: String!
    email: String!
    age: Int
    profilePicture: String
  }


  type Auth {
    token: ID!
    user: User
  }

  type Query {
    users: [User]
    user(userId: ID!): User
  }

  input NewUserInput {
    username: String!
    firstName: String!
    lastName: String!
    password: String!
    email: String!
    dateOfBirth: String!
  }

  input UpdateUserInput {
  username: String
  firstName: String
  lastName: String
  email: String
  dateOfBirth: String
  profilePicture: String
}


type Auth {
    token: ID!
    user: User
  }

type Mutation {
    addUser(userData: NewUserInput!): Auth
    login(username: String!, password: String!): Auth
    removeUser(userId: ID!): User
    updateUser(userId: ID!, updateData: UpdateUserInput!): User
  }
`;

module.exports = typeDefs;
