const { User, Legion } = require('../models');
const { signToken, AuthenticationError } = require('../utils/auth');
const mongoose = require('mongoose');

const resolvers = {
  Query: {
    users: async () => {
      return await User.find();
    },

    user: async (parent, { username }) => {
      return await User.findOne({ username });
    },

    userById: async (parent, { id }) => {
      return await User.findById(id);
    },

    legions: async () => {
      return await Legion.find();
    },

    legion: async (parent, { id }) => {
      return await Legion.findById(id);
    },
  },

  Mutation: {
    addUser: async (parent, { userData }) => {
      const newUser = await User.create({
        username: userData.username,
        password: userData.password,
        firstName: userData.firstName,
        lastName: userData.lastName,
        email: userData.email,
        dateOfBirth: userData.dateOfBirth,
      });
      const token = signToken(newUser);
      return { token, user: newUser };
    },

    login: async (parent, { username, password }) => {
      const user = await User.findOne({ username });

      if (!user) {
        throw AuthenticationError;
      }

      const correctPw = await user.isCorrectPassword(password);
      if (!correctPw) {
        throw AuthenticationError;
      }
      const token = signToken(user);

      return { token, user };
    },

    removeUser: async (parent, { userId }) => {
      const deletedUser = await User.findByIdAndDelete(userId);
      if (!deletedUser) {
        throw new Error('User not found.');
      }
      return deletedUser;
    },

    updateUser: async (_, { userId, updateData }) => {
      const updatedUser = await User.findOneAndUpdate(
        { _id: userId },
        updateData,
        { new: true }
      );
      return updatedUser;
    },

    addLegion: async (parent, { legionData }, context) => {
      if (!context.user) {
        throw AuthenticationError;
      }

      const newLegion = await Legion.create({
        ...legionData,
        adminUser: new mongoose.Types.ObjectId(context.user._id),
        players: [new mongoose.Types.ObjectId(context.user._id)], // Use 'new' keyword
      });

      return newLegion;
    },

    updateLegion: async (parent, { legionId, updateData }) => {
      const updatedLegion = await Legion.findOneAndUpdate(
        { _id: legionId },
        updateData,
        { new: true }
      );
      return updatedLegion;
    },

    removeLegion: async (parent, { legionId }) => {
      const deletedLegion = await Legion.findByIdAndDelete(legionId);
      if (!deletedLegion) {
        throw new Error('Legion not found.');
      }
      return deletedLegion;
    },
    createRound: async (_, { legionId, roundInput }) => {
      const legion = await Legion.findById(legionId);
      if (!legion) {
        throw new Error('Legion not found');
      }

      const newRound = {
        _id: new mongoose.Types.ObjectId(),
        ...roundInput,
        submissions: [],
        votes: [],
      };

      legion.rounds.push(newRound);
      await legion.save();
      return legion;
    },
    updateRound: async (_, { legionId, roundId, roundData }) => {
      const legion = await Legion.findById(legionId);
      if (!legion) {
        throw new Error('Legion not found');
      }

      const round = legion.rounds.id(roundId);
      if (!round) {
        throw new Error('Round not found');
      }

      Object.assign(round, roundData);
      await legion.save();
      return legion;
    },

    createSong: async (_, { userId, title, artist, url }) => {
      const newSong = new Song({ userId, title, artist, url });
      return await newSong.save();
    },
    updateSong: async (_, { _id, title, artist, url }) => {
      const updatedSong = await Song.findByIdAndUpdate(
        _id,
        { title, artist, url },
        { new: true }
      );
      return updatedSong;
    },
  },
};

module.exports = resolvers;
