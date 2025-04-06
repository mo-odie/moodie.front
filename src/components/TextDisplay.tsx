type TextProps = {
  letterContent: string;
};

type WordProps = {
  wordContent: string;
};

type LineProps = {
  lineContent: string;
  isCurrentLine: boolean;
};

function Text({ letterContent }: TextProps) {
  return (
    <span className="font-body text-gray-light text-body-medium">
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
    <p className="w-4/5 whitespace-nowrap">
      {lineContent.split(" ").map((word) => (
        <Word wordContent={word}></Word>
      ))}
    </p>
  );
}

export default Line;
