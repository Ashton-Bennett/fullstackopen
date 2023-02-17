const { GraphQLError } = require("graphql");
const jwt = require("jsonwebtoken");
const Author = require("./models/authors_schema");
const Book = require("./models/books_schema");
const User = require("./models/user_schema");
const { PubSub } = require("graphql-subscriptions");
const pubsub = new PubSub();

const resolvers = {
  Query: {
    me: async (root, args, context) => {
      return context.currentUser;
    },
    bookCount: async () => Book.collection.countDocuments(),
    authorCount: async () => Author.collection.countDocuments(),
    allBooks: async (root, args) => {
      if (args.genres && args.author) {
        return Book.find({ genres: args.genres, author: args.author });
      }
      if (args.author) {
        return Book.find({ author: args.author });
      }

      if (args.genres) {
        return Book.find({ genres: args.genres });
      }

      return Book.find({});
    },

    allAuthors: async () => {
      // try {
      //   await Author.collection.updateMany({}, { $set: { bookCount: 0 } });
      // } catch (e) {
      //   console.log(e);
      // }
      const authors = await Author.find({});
      const books = await Book.find({});

      authors.map((author) =>
        books.map((book) => {
          if (book.author === author.name) {
            Author.findOneAndUpdate(
              { name: author.name },
              { $set: { bookCount: (author.bookCount += 1) } },
              { new: true }
            );
          }
        })
      );

      return Author.find({});
    },
  },

  // Book: {
  //   author: (root) => {
  //     return {
  //       name: root.name,
  //     };
  //   },
  // },

  Mutation: {
    createUser: async (root, args) => {
      const user = new User({
        username: args.username,
        favouriteGenre: args.favouriteGenre,
      });
      return user.save().catch((error) => {
        throw new GraphQLError("creating the user failed", {
          extensions: {
            code: "BAD_USER_INPUT",
            invalidArgs: args.name,
            error,
          },
        });
      });
    },
    login: async (root, args) => {
      const user = await User.findOne({ username: args.username });
      if (!user || args.password !== "secret") {
        throw new GraphQLError("wrong credentials", {
          extensions: {
            code: "BAD_USER_INPUT",
          },
        });
      }
      const userForToken = {
        username: user.username,
        id: user._id,
      };

      return {
        value: jwt.sign(userForToken, process.env.JWT_SECRET),
        user: user,
      };
    },

    addBook: async (root, args, context) => {
      const book = new Book({ ...args });
      const currentUser = context.currentUser;

      if (!currentUser) {
        throw new GraphQLError("not authenticated must login", {
          extensions: {
            code: "BAD_USER_INPUT",
          },
        });
      }

      try {
        await book.save();
      } catch (error) {
        throw new GraphQLError(
          "Saving book failed, name needs to be at least 5 characters long and author name needs to be included.",
          {
            extensions: {
              code: "BAD_USER_INPUT",
              invalidArgs: args.name,
              error,
            },
          }
        );
      }
      pubsub.publish("BOOK_ADDED", { bookAdded: book });
      return book;
    },

    editAuthor: async (root, args, context) => {
      const author = await Author.findOne({ name: args.name });
      const currentUser = context.currentUser;

      if (!currentUser) {
        throw new GraphQLError("not authenticated", {
          extensions: {
            code: "BAD_USER_INPUT",
          },
        });
      }

      if (!author) {
        return null;
      }
      author.born = args.born;
      return author.save();
    },
    addAuthor: async (root, args) => {
      const author = new Author({ ...args });
      try {
        await author.save();
      } catch (error) {
        throw new GraphQLError(
          "Saving author failed, name needs to be at least 4 characters long",
          {
            extensions: {
              code: "BAD_USER_INPUT",
              invalidArgs: args.name,
              error,
            },
          }
        );
      }
      return author;
    },
  },
  Subscription: {
    bookAdded: {
      subscribe: () => pubsub.asyncIterator("BOOK_ADDED"),
    },
  },
};

module.exports = resolvers;
