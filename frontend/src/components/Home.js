import React from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>Welcome to the Quiz Game!</h1>
      <p style={styles.subText}>Test your knowledge and challenge your friends.</p>
      <div style={styles.buttonContainer}>
        <button onClick={() => navigate("/quiz")} style={styles.button}>Play Quiz</button>
        <button onClick={() => navigate("/leaderboard")} style={styles.button}>View Leaderboard</button>
      </div>
    </div>
  );
};

const styles = {
  container: {
    textAlign: "center",
    padding: "20px",
    backgroundColor: "#f4f4f4",
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  heading: {
    fontSize: "32px",
    fontWeight: "bold",
    marginBottom: "10px",
  },
  subText: {
    fontSize: "18px",
    color: "#555",
    marginBottom: "20px",
  },
  buttonContainer: {
    display: "flex",
    gap: "20px",
  },
  button: {
    backgroundColor: "#007BFF",
    color: "white",
    border: "none",
    padding: "12px 24px",
    fontSize: "18px",
    borderRadius: "8px",
    cursor: "pointer",
    transition: "background 0.3s",
  },
};

export default Home;
