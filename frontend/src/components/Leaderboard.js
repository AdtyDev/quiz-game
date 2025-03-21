import React from "react";
import { useQuery } from "@apollo/client";
import { GET_RESULTS } from "../graphql/queries";
import "./Leaderboard.css";

const Leaderboard = () => {
  const { data, loading } = useQuery(GET_RESULTS);

  if (loading) return <p className="loading-text">Loading...</p>;

  return (
    <div className="leaderboard-container">
      <h1 className="leaderboard-heading">Leaderboard</h1>
      <div className="leaderboard-list">
        {data.getResults.map((result) => (
          <div key={result._id} className="leaderboard-item">
            <span className="leaderboard-name">{result.name}</span>
            <span className="leaderboard-score">Score: {result.score}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Leaderboard;
