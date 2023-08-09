import { useEffect } from "react";
import "../styles/Result.css";

interface Props {
  numOfAnswers: number;
  allQuestions: number;
}

const Result = ({ numOfAnswers, allQuestions }: Props) => {
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      id: new Date(),
      correctAns: numOfAnswers,
      allQuestions,
    }),
  };

  useEffect(() => {
    fetch("http://localhost:3001/results", requestOptions);
  }, []);

  return (
    <div className="result">
      Количество правильных ответов : {numOfAnswers}/{allQuestions}
    </div>
  );
};

export default Result;
