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
    numVotes: Int
    numSongs: Int
    numLegions: Int
    numVictories: Int
  }

  type Auth {
    token: ID!
    user: User
  }

  type Song {
    _id: ID!
    userId: ID!
    title: String
    artist: String
    url: String!
    comment: String
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
  isComplete: Boolean!
}

  type Legion {
    _id: ID!
    name: String!
    description: String
    adminUser: ID!
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
    userById(id: ID!): User
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
    numVotes: Int
    numSongs: Int
    numLegions: Int
    numVictories: Int
  }

  input NewLegionInput {
    name: String!
    description: String
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
    players: [ID!]
    numRounds: Int
    voteTime: Int
    submitTime: Int
  }

  input RoundInput {
  roundNumber: Int!
  prompt: String!
  submissionDeadline: String!
  voteDeadline: String!
  isComplete: Boolean
  }

  input UpdateRoundInput {
  roundNumber: Int
  prompt: String
  submissionDeadline: String
  voteDeadline: String
  isComplete: Boolean
}

  input SongInput {
  userId: ID!
  title: String
  artist: String
  comment: String
  url: String!
 }

   input UpdateSongInput {
   title: String
   artist: String
   comment: String
   url: String
  }


  type Mutation {
    addUser(userData: NewUserInput!): Auth
    login(username: String!, password: String!): Auth
    removeUser(userId: ID!): User
    updateUser(userId: ID!, updateData: UpdateUserInput!): User
    addLegion(legionData: NewLegionInput!): Legion
    updateLegion(legionId: ID!, updateData: UpdateLegionInput!): Legion
    removeLegion(legionId: ID!): Legion
    createRound(legionId: ID!, roundInput: RoundInput!): Legion
    updateRound(legionId: ID!, roundId: ID!, roundData: UpdateRoundInput!): Legion
    addSongToRound(legionId: ID!, roundNumber: Int!, songInput: SongInput!): Legion
    updateSong(legionIdL ID!, roundNumber: Int!, songId: ID!, updateData: UpdateSongInput!): Legion
  }
`;

module.exports = typeDefs;
