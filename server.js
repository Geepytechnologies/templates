const express = require("express");
const app = express();
const { graphqlHTTP } = require("express-graphql");
const dotenv = require("dotenv");
const cors = require("cors");
const schema = require("./schema/schema");
dotenv.config();

app.use(cors());
app.use(express.json());
app.use("/graphql", graphqlHTTP({ schema, graphiql: true }));

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log("Backend server is running");
});
