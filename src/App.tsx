import { useEffect, useState } from "react";
import "./App.css";
import Quiz from "./components/Quiz";
import Result from "./components/Result";
import Start from "./components/Start";
interface Answer {
  title: string;
  correct: boolean;
}

interface Question {
  id: number;
  question: string;
  answers: Answer[];
}

function App() {
  const [quizStart, setQuizStart] = useState<boolean>(false);
  const [step, setStep] = useState<number>(0);
  const [numOfAnswers, setNumOfAnswers] = useState<number>(0);
  const [timerExpired, setTimerExpired] = useState<boolean>(false);
  const [questions, setQuestions] = useState<Question[]>([]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setTimerExpired(true);
    }, 60000);

    fetch("http://localhost:3001/questions")
      .then((data) => data.json())
      .then(setQuestions);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  const handleEndQuiz = () => {
    setQuizStart(false);
    setStep(0);
    setNumOfAnswers(0);
    setTimerExpired(false);
  };
  const questionArr = questions[step];
  return (
    <>
      {quizStart ? (
        <div className="App">
          {!questionArr || timerExpired ? (
            <Result
              numOfAnswers={numOfAnswers}
              allQuestions={questions.length}
            />
          ) : (
            <Quiz
              questionArr={questionArr}
              setStep={setStep}
              setNumOfAnswers={setNumOfAnswers}
              handleEndQuiz={handleEndQuiz}
            />
          )}
        </div>
      ) : (
        <Start setQuizStart={setQuizStart} />
      )}
    </>
  );
}

export default App;
