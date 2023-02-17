const typeDefs = `

type User {
  username: String!
  favouriteGenre: String!
  id: ID!
}

type Token {
  value: String!
  user: User
}

type Author {
  name: String!,
  bookCount: Int,
  born: Int,
}

type Mutation {

  createUser(
    username: String!
    favouriteGenre: String!
  ): User

  login(
    username: String!
    password: String!
  ): Token
  
  addBook(
    title: String!
    author: String! 
    published: String!
    genres:[String!]!
  ): Book!

  editAuthor(
    name: String!,
    born: Int!,
  ):Author

  addAuthor(
    name: String!,
    born: Int,
    id: ID,
  ):Author
}

  type Book {
    title: String!
    published: String
    author: String!
    id: ID!
    genres: [String]!
  }

  type Query {
    authorCount: Int!,
    bookCount: Int!,
    allBooks(author: String, genres: String):[Book!]!,
    allAuthors:[Author!]!,
    me: User,
  },

  type Subscription { 
    bookAdded: Book!
  }
`;
module.exports = typeDefs;
