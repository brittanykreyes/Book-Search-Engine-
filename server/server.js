const express = require("express");
const { ApolloServer } = require("apollo-server-express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();
const path = require("path")

const { typeDefs, resolvers } = require("./schemas");
const {authMiddleware} = require("./utils/auth");
const { requiredPaths, path } = require("./models/Book");

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/mern-graphql-book-search", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());


const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: authMiddleware
  // context: ({ req }) => {
  //   const token = req.headers.authorization || "";
  //   return { token };
  // },
});
async function init (){
    await server.start()
server.applyMiddleware({ app });

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/dist')));

  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/dist/index.html'));
  });
}



app.listen(PORT, () => {
  console.log(`API server running on http://localhost:${PORT}${server.graphqlPath}`);
});
}
init()