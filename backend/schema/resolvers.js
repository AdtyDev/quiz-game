import Question from "../models/Question.js";
import Result from "../models/Result.js";

const resolvers = {
  Query: {
    getQuestions: async () => await Question.find(),
    getResults: async () => await Result.find().sort({ score: -1 }).limit(10),
  },
  Mutation: {
    submitResult: async (_, { name, age, score }) => {
      const newResult = new Result({ name, age, score });
      return await newResult.save();
    },
  },
};

export default resolvers;
