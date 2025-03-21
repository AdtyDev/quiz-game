import React, { useState } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { GET_QUESTIONS } from "../graphql/queries";
import { SUBMIT_RESULT } from "../graphql/mutations";
import { useNavigate } from "react-router-dom";

const Quiz = () => {
  const { data, loading, error } = useQuery(GET_QUESTIONS);
  const [submitResult] = useMutation(SUBMIT_RESULT);
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [score, setScore] = useState(0);
  const [quizStarted, setQuizStarted] = useState(false);
  const [quizFinished, setQuizFinished] = useState(false);
  const navigate = useNavigate();

  if (loading) return <p style={styles.loadingText}>Loading...</p>;
  if (error) return <p style={styles.errorText}>Error loading questions.</p>;

  const questions = data?.getQuestions || [];

  const handleStartQuiz = () => {
    if (!name || !age) {
      alert("Please enter your name and age!");
      return;
    }
    setQuizStarted(true);
  };

  const handleNextQuestion = () => {
    if (selectedAnswer === null) {
      alert("Please select an answer before proceeding.");
      return;
    }

    if (selectedAnswer === questions[currentQuestionIndex].correctAnswer) {
      setScore((prevScore) => prevScore + 1);
    }

    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
      setSelectedAnswer(null);
    } else {
      setQuizFinished(true);
    }
  };

  const handleSubmitQuiz = async () => {
    await submitResult({ variables: { name, age: parseInt(age), score } });
    navigate("/leaderboard");
  };

  return (
    <div style={styles.container}>
      {!quizStarted && (
        <div style={styles.startContainer}>
          <h1 style={styles.heading}>Welcome to the Quiz!</h1>
          <input
            type="text"
            placeholder="Enter Your Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            style={styles.input}
          />
          <input
            type="number"
            placeholder="Enter Your Age"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            style={styles.input}
          />
          <button onClick={handleStartQuiz} style={styles.button}>
            Start Quiz
          </button>
        </div>
      )}

      {quizStarted && !quizFinished && (
        <div style={styles.quizContainer}>
          <h2 style={styles.questionCounter}>
            Question {currentQuestionIndex + 1} / {questions.length}
          </h2>
          <h3 style={styles.question}>{questions[currentQuestionIndex].question}</h3>
          <div style={styles.optionsContainer}>
            {questions[currentQuestionIndex].options.map((option) => (
              <button
                key={option}
                style={{
                  ...styles.optionButton,
                  background: selectedAnswer === option ? "#4CAF50" : "#fff",
                }}
                onClick={() => setSelectedAnswer(option)}
              >
                {option}
              </button>
            ))}
          </div>
          <button onClick={handleNextQuestion} style={styles.button}>
            {currentQuestionIndex < questions.length - 1 ? "Next" : "Submit"}
          </button>
        </div>
      )}

      {quizFinished && (
        <div style={styles.resultContainer}>
          <h2 style={styles.heading}>Quiz Completed!</h2>
          <p style={styles.scoreText}>Your Score: {score} / {questions.length}</p>
          <button onClick={handleSubmitQuiz} style={styles.button}>Submit</button>
        </div>
      )}
    </div>
  );
};

const styles = {
  container: {
    textAlign: "center",
    padding: "20px",
    fontFamily: "Arial, sans-serif",
    backgroundColor: "#f4f4f4",
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  startContainer: {
    backgroundColor: "#fff",
    padding: "30px",
    borderRadius: "10px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
  },
  quizContainer: {
    backgroundColor: "#fff",
    padding: "30px",
    borderRadius: "10px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
    width: "80%",
    maxWidth: "600px",
  },
  resultContainer: {
    backgroundColor: "#fff",
    padding: "30px",
    borderRadius: "10px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
  },
  heading: {
    fontSize: "24px",
    marginBottom: "20px",
  },
  input: {
    width: "80%",
    padding: "10px",
    margin: "10px 0",
    borderRadius: "5px",
    border: "1px solid #ccc",
    fontSize: "16px",
  },
  button: {
    backgroundColor: "#007BFF",
    color: "white",
    border: "none",
    padding: "12px 20px",
    fontSize: "16px",
    borderRadius: "5px",
    cursor: "pointer",
    marginTop: "10px",
    transition: "background 0.3s",
  },
  buttonHover: {
    backgroundColor: "#0056b3",
  },
  questionCounter: {
    fontSize: "18px",
    color: "#333",
  },
  question: {
    fontSize: "20px",
    marginBottom: "20px",
  },
  optionsContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  optionButton: {
    width: "80%",
    padding: "12px",
    margin: "5px 0",
    border: "1px solid #007BFF",
    borderRadius: "5px",
    cursor: "pointer",
    fontSize: "16px",
    transition: "background 0.3s, color 0.3s",
  },
  scoreText: {
    fontSize: "22px",
    fontWeight: "bold",
  },
  loadingText: {
    fontSize: "20px",
    color: "#007BFF",
  },
  errorText: {
    fontSize: "20px",
    color: "red",
  },
};

export default Quiz;
