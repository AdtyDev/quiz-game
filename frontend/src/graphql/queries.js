import { gql } from "@apollo/client";

export const GET_QUESTIONS = gql`
  query GetQuestions {
    getQuestions {
      _id
      question
      options
      correctAnswer
    }
  }
`;

export const GET_RESULTS = gql`
  query GetResults {
    getResults {
      _id
      name
      age
      score
      date
    }
  }
`;
