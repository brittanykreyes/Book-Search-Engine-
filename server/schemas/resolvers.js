const { User } = require("../models");
const { signToken } = require("../utils/auth");

const resolvers = {
  Query: {
    me: async (parent, args, context) => {
      if (context.token) {
        const user = await User.findById(context.token.userId);
        return user;
      }
      throw new Error("Not authenticated");
    },
  },
  Mutation: {
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new Error("User not found");
      }

      const isValidPassword = await user.isCorrectPassword(password);
      if (!isValidPassword) {
        throw new Error("Incorrect password");
      }

      const token = signToken(user);
      return { token, user };
    },
    addUser: async (parent, { username, email, password }) => {
      const user = await User.create({ username, email, password });
      const token = signToken(user);
      return { token, user };
    },
    saveBook: async (parent, { bookId, title, authors, description, image, link }, context) => {
      if (context.token) {
        const user = await User.findByIdAndUpdate(
          context.token.userId,
          {
            $addToSet: { savedBooks: { bookId, title, authors, description, image, link } },
          },
          { new: true }
        );
        return user;
      }
      throw new Error("Not authenticated");
    },
    removeBook: async (parent, { bookId }, context) => {
      if (context.token) {
        const user = await User.findByIdAndUpdate(
          context.token.userId,
          {
            $pull: { savedBooks: { bookId } },
          },
          { new: true }
        );
        return user;
      }
      throw new Error("Not authenticated");
    },
  },
};

module.exports = resolvers;
