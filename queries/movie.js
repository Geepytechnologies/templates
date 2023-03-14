const graphql = require("graphql");
const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLSchema,
  GraphQLInt,
  GraphQLID,
  GraphQLList,
} = graphql;
const Movie = require("../models/Movie");

const MovieType = new GraphQLObjectType({
  name: "movie",
  fields: () => ({
    id: { type: GraphQLString },
    title: { type: GraphQLString },
    desc: { type: GraphQLString },
    genre: { type: GraphQLString },
  }),
});

const MovieQueryType = new GraphQLObjectType({
  name: "MovieQuery",
  fields: {
    getMovies: {
      type: GraphQLList(MovieType),
      resolve(parent, args) {
        return Movie.find();
      },
    },
    getMovieById: {
      type: GraphQLList(MovieType),
      args: { id: { type: GraphQLString }, genre: { type: GraphQLString } },
      resolve(parent, args) {
        return Movie.find({ genre: args.genre });
      },
    },
  },
});

module.exports = MovieQueryType;
