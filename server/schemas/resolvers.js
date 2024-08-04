const { User, Legion } = require("../models");
const { signToken, AuthenticationError } = require("../utils/auth");

const resolvers = {
  Query: {
    users: async () => {
      return await User.find();
    },

    user: async (parent, { username }) => {
      return await User.findOne({ username });
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
        throw new Error("User not found.");
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

    addLegion: async (parent, { legionData }) => {
      const newLegion = await Legion.create(legionData);
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
        throw new Error("Legion not found.");
      }
      return deletedLegion;
    },
  },
};

module.exports = resolvers;
