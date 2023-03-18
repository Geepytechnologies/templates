const graphql = require("graphql");
const pool = require("../connection");
const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLSchema,
  GraphQLInt,
  GraphQLID,
  GraphQLList,
  GraphQLBoolean,
} = graphql;

const MovieType = new GraphQLObjectType({
  name: "movie",
  fields: () => ({
    id: { type: GraphQLString },
    title: { type: GraphQLString },
    description_: { type: GraphQLString },
    genre: { type: GraphQLString },
  }),
});

const UserType = new GraphQLObjectType({
  name: "user",
  fields: () => ({
    user_id: { type: GraphQLInt },
    email: { type: GraphQLString },
    password: { type: GraphQLString },
    message: { type: GraphQLString },
  }),
});

const UserQueryType = new GraphQLObjectType({
  name: "UserQuery",
  fields: {
    getUsers: {
      type: GraphQLList(UserType),
      async resolve(parent, args) {
        const users = await pool.query("SELECT * FROM users");
        return users.rows;
      },
    },
    getUserById: {
      type: GraphQLList(UserType),
      args: { user_id: { type: GraphQLInt } },
      async resolve(parent, args) {
        const users = await pool.query(
          "SELECT * FROM users WHERE user_id = $1",
          [args.user_id]
        );
        return users.rows;
      },
    },
    getUsersByEmail: {
      type: GraphQLList(UserType),
      args: { email: { type: GraphQLString } },
      async resolve(parent, args) {
        const users = await pool.query("SELECT * FROM users WHERE email = $1", [
          args.email,
        ]);
        return users.rows;
      },
    },
  },
});

// const MovieQueryType = new GraphQLObjectType({
//   name: "MovieQuery",
//   fields: {
//     getMovies: {
//       type: GraphQLList(MovieType),
//       resolve(parent, args) {
//         return Movie.find();
//       },
//     },
//     getMovieById: {
//       type: GraphQLList(MovieType),
//       args: { id: { type: GraphQLString }, genre: { type: GraphQLString } },
//       resolve(parent, args) {
//         return Movie.find({ genre: args.genre });
//       },
//     },
//   },
// });

const MovieMutationType = new GraphQLObjectType({
  name: "MovieMutation",
  fields: {
    addMovie: {
      type: MovieType,
      args: {
        title: { type: GraphQLString },
        description_: { type: GraphQLString },
        year: { type: GraphQLString },
        genre: { type: GraphQLString },
        isSeries: { type: GraphQLBoolean },
      },
      resolve(parent, args) {
        const newMovie = pool.query(
          "INSERT INTO movie(title, description_, img, imgTitle, imgSm, trailer, video, year_,genre, isSeries) VALUES ($title, $description_, $img, $imgTitle, $imgSm, $trailer, $video, $year_,$genre, $isSeries)"
        );
      },
    },
  },
});

const UserMutationType = new GraphQLObjectType({
  name: "UserMutation",
  fields: {
    addUser: {
      type: UserType,
      args: {
        email: { type: GraphQLString },
        password: { type: GraphQLString },
      },
      async resolve(parent, args) {
        const { rows } = await pool.query(
          "INSERT INTO users (email, password) VALUES ($1, $2) RETURNING *",
          [args.email, args.password]
        );
        return rows[0];
      },
    },
    deleteUser: {
      type: UserType,
      args: { user_id: { type: GraphQLInt } },
      async resolve(parent, args) {
        const response = await pool.query(
          "DELETE FROM users WHERE user_id = $1",
          [args.user_id]
        );
        const message = `${response.fields} user has been deleted`;
        return { message };
      },
    },
    deleteUsers: {
      type: UserType,
      async resolve(parent, args) {
        const response = await pool.query("DELETE FROM users");
        const message = `${response.rowCount} users have been deleted`;
        return { message };
      },
    },
  },
});

module.exports = {
  MovieMutationType,
  UserMutationType,
  UserQueryType,
};
