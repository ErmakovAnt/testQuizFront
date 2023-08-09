interface startProps {
  setQuizStart: React.Dispatch<React.SetStateAction<boolean>>;
}

const Start = ({ setQuizStart }: startProps) => {
  return (
    <div className="result">
      <button className="button" onClick={() => setQuizStart(true)}>
        Start
      </button>
    </div>
  );
};

export default Start;
