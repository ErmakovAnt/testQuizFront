import "../styles/Quiz.css";
import { useState, useEffect } from "react";
interface Answer {
  title: string;
  correct: boolean;
}
interface questionProps {
  questionArr: {
    id: number;
    question: string;
    answers: Answer[];
  };
  setStep: React.Dispatch<React.SetStateAction<number>>;
  setNumOfAnswers: React.Dispatch<React.SetStateAction<number>>;
  handleEndQuiz: () => void;
}

const Quiz = ({
  questionArr,
  setStep,
  setNumOfAnswers,
  handleEndQuiz,
}: questionProps) => {
  const [chosenAnswer, setChosenAnswer] = useState<string>("");
  const [correctAnswer, setCorrectAnswer] = useState<string>("");
  const [className, setClassName] = useState<string>("answer");
  const [disable, setDisable] = useState<boolean>(false);
  const [timer, setTimer] = useState<number>(60000);

  useEffect(() => {
    let interval = setInterval(() => {
      setTimer((prev) => prev - 1000);
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  const minutes = Math.floor(timer / 1000 / 60) % 60;
  const seconds = Math.floor(timer / 1000) % 60;
  const handleClick = (item: { title: string; correct: boolean }) => {
    if (!disable) {
      setChosenAnswer(item.title);
      setClassName(item.correct ? "answer correct" : "answer incorrect");
      setDisable(true);
      if (!item.correct) {
        setCorrectAnswer(
          questionArr.answers?.filter((item) => item.correct)[0].title
        );
      }
    }
  };

  const nextQuestion = () => {
    if (disable) {
      setDisable(false);
      setStep((prev) => prev + 1);
      if (correctAnswer === "") {
        setNumOfAnswers((prev) => prev + 1);
      }
      setCorrectAnswer("");
    }
  };

  return (
    <div>
      <div className={"window"} key={questionArr.id}>
        <div className={"header"}>{questionArr.question}</div>
        <div>
          Minutes: {minutes} Seconds:{seconds}
        </div>
        <ul>
          {questionArr.answers?.map(
            (item: { title: string; correct: boolean }) => {
              return (
                <li
                  key={item.title}
                  onClick={() => handleClick(item)}
                  className={chosenAnswer === item.title ? className : "answer"}
                >
                  {item.title}
                </li>
              );
            }
          )}
        </ul>
        {correctAnswer && (
          <div className="answer correct">
            Правильный ответ: {correctAnswer}
          </div>
        )}

        <button className="button" onClick={nextQuestion}>
          Next
        </button>
        <button className="button" onClick={handleEndQuiz}>
          End
        </button>
      </div>
    </div>
  );
};

export default Quiz;
