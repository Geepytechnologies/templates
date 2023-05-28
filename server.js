const express = require("express");
const app = express();
const { graphqlHTTP } = require("express-graphql");
const dotenv = require("dotenv");
const cors = require("cors");
const mongoose = require("mongoose");
const schema = require("./schema/schema");
dotenv.config();

app.use(cors());
app.use(express.json());
app.use("/graphql", graphqlHTTP({ schema, graphiql: true }));

const connect = () => {
  mongoose.set("strictQuery", false);
  mongoose
    .connect(process.env.MONGODB_URI)
    .then(() => {
      console.log("MongoDB is connected");
    })
    .catch((err) => {
      throw err;
    });
};
const port = process.env.PORT || 3000;

app.get("/", (req,res)=>{
   res.send("<h1>hello Geepy</h1>");
})

app.listen(port, () => {
  connect();
  console.log("Backend server is running");
});
