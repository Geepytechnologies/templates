const graphql = require("graphql");
const books = require("../data");
const {
  MovieQueryType,
  MovieMutationType,
  UserMutationType,
  UserQueryType,
} = require("../queries/movie");

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLSchema,
  GraphQLInt,
  GraphQLList,
} = graphql;

const RootQuery = new GraphQLObjectType({
  name: "RootQuery",
  fields: {
    movie: {
      type: MovieQueryType,
      resolve: () => ({}),
    },
    user: {
      type: UserQueryType,
      resolve: () => ({}),
    },
  },
});

const Mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    movie: {
      type: MovieMutationType,
      resolve: () => ({}),
    },
    user: {
      type: UserMutationType,
      resolve: () => ({}),
    },
  },
});

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation,
});
