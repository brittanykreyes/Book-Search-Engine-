const express = require("express");
const { ApolloServer } = require("apollo-server-express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const { typeDefs, resolvers } = require("./schemas");
const authMiddleware = require("./controllers/auth");

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());


const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => {
    const token = req.headers.authorization || "";
    return { token };
  },
});

server.applyMiddleware({ app });


mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/mern-graphql-book-search", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});


app.listen(PORT, () => {
  console.log(`API server running on http://localhost:${PORT}${server.graphqlPath}`);
});
