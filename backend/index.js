import express from "express";
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import typeDefs from "./schema/typeDefs.js";
import resolvers from "./schema/resolvers.js";

dotenv.config(); // ✅ Load .env variables at the start

const app = express();
const server = new ApolloServer({ typeDefs, resolvers });

app.use(cors());
app.use(express.json());

const startServer = async () => {
  await server.start();
  app.use("/graphql", expressMiddleware(server));

  mongoose
    .connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log("✅ MongoDB Connected");
      app.listen(process.env.PORT || 5000, () => 
        console.log(`🚀 Server running on port ${process.env.PORT || 5000}`)
      );
    })
    .catch((err) => console.error("❌ MongoDB Connection Error:", err));
};

startServer();
