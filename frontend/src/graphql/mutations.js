import { gql } from "@apollo/client";

export const SUBMIT_RESULT = gql`
  mutation SubmitResult($name: String!, $age: Int!, $score: Int!) {
    submitResult(name: $name, age: $age, score: $score) {
      _id
      name
      age
      score
      date
    }
  }
`;
