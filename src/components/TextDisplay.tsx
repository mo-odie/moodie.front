type TextProps = {
  letterContent: string;
  status: "waiting" | "correct" | "wrong";
};

type WordProps = {
  wordContent: string;
};

type LineProps = {
  lineContent: string;
  isCurrentLine: boolean;
};

function Text({ letterContent, status = "waiting" }: TextProps) {
  const colorMap = {
    waiting: "text-white opacity-50",
    correct: "text-white",
    wrong: "text-secondary",
  };

  return (
    <span className={`font-body text-body-medium ${colorMap[status]}`}>
      {letterContent}
    </span>
  );
}

function Word({ wordContent }: WordProps) {
  return (
    <span className="mr-5">
      {wordContent.split("").map((letter) => (
        <Text letterContent={letter}></Text>
      ))}
    </span>
  );
}

function Line({ lineContent, isCurrentLine }: LineProps) {
  return (
    <p className="w-full pl-[30px]">
      {lineContent.split(" ").map((word) => (
        <Word wordContent={word}></Word>
      ))}
    </p>
  );
}

export default Line;
