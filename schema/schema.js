const graphql = require("graphql");
const _ = require("lodash");
const books = require("../data");
const Movie = require("../models/Movie");
const MovieQueryType = require("../queries/movie");

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
  },
});

module.exports = new GraphQLSchema({
  query: RootQuery,
});
