import { gql } from "graphql-tag"; 

const typeDefs = gql`
  type Question {
    _id: ID!
    question: String!
    options: [String!]!
    correctAnswer: String!
  }

  type Result {
    _id: ID!
    name: String!
    age: Int!
    score: Int!
    date: String!
  }

  type Query {
    getQuestions: [Question!]!
    getResults: [Result!]!
  }

  type Mutation {
    submitResult(name: String!, age: Int!, score: Int!): Result!
  }
`;

export default typeDefs;
