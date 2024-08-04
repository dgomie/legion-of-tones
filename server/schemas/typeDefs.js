const typeDefs = `
  type User {
    _id: ID!
    firstName: String!
    lastName: String!
    username: String!
    email: String!
    age: Int
    profilePicture: String
    formattedCreatedAt: String
  }

  type Auth {
    token: ID!
    user: User
  }

  type Song {
    title: String!
    artist: String!
    url: String!
  }

  type Vote {
    userId: ID!
    songId: ID!
    points: Int!
  }

  type Round {
    _id: ID!
    roundNumber: Int!
    prompt: String!
    submissionDeadline: String!
    voteDeadline: String!
    submissions: [Song]!
    votes: [Vote]!
  }

  type Legion {
    _id: ID!
    name: String!
    description: String
    numPlayers: Int!
    maxPlayers: Int!
    players: [ID]!
    isActive: Boolean!
    numRounds: Int!
    voteTime: Int!
    submitTime: Int!
    rounds: [Round]!
  }

  type Query {
    users: [User]
    user(username: String!): User
    legions: [Legion]
    legion(id: ID!): Legion
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

  input NewLegionInput {
    name: String!
    description: String
    numPlayers: Int!
    maxPlayers: Int!
    numRounds: Int!
    voteTime: Int!
    submitTime: Int!
  }

  input UpdateLegionInput {
    name: String
    description: String
    numPlayers: Int
    maxPlayers: Int
    numRounds: Int
    voteTime: Int
    submitTime: Int
  }

  type Mutation {
    addUser(userData: NewUserInput!): Auth
    login(username: String!, password: String!): Auth
    removeUser(userId: ID!): User
    updateUser(userId: ID!, updateData: UpdateUserInput!): User
    addLegion(legionData: NewLegionInput!): Legion
    updateLegion(legionId: ID!, updateData: UpdateLegionInput!): Legion
    removeLegion(legionId: ID!): Legion
  }
`;

module.exports = typeDefs;