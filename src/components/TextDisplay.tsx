type TextProps = {
  letterContent: string;
  status: "waiting" | "correct" | "wrong" | "cursor";
};

type WordProps = {
  wordContent: string;
  startPosition: number;
  typingStatus?: {
    typedText: string;
    cursorPosition: number;
    mistakes: number[];
  };
};

type LineProps = {
  lineContent: string;
  isCurrentLine: boolean;
  typingStatus?: {
    typedText: string;
    cursorPosition: number;
    mistakes: number[];
  };
};

function Text({ letterContent, status = "waiting" }: TextProps) {
  const colorMap = {
    waiting: "text-white opacity-50",
    correct: "text-white",
    wrong: "text-red-500",
    cursor: "bg-white text-black",
  };

  return (
    <span className={`font-body text-body-medium ${colorMap[status]}`}>
      {letterContent}
    </span>
  );
}

function Word({ wordContent, startPosition, typingStatus }: WordProps) {
  return (
    <span className="mr-5">
      {wordContent.split("").map((letter, index) => {
        const absolutePosition = startPosition + index;
        let status: "waiting" | "correct" | "wrong" | "cursor" = "waiting";

        // 타이핑 상태가 있는 경우에만 처리
        if (typingStatus) {
          const { typedText, cursorPosition, mistakes } = typingStatus;

          if (absolutePosition < cursorPosition) {
            // 이미 타이핑한 글자
            status = mistakes.includes(absolutePosition) ? "wrong" : "correct";
          } else if (absolutePosition === cursorPosition) {
            // 현재 커서 위치
            status = "cursor";
          }
        }

        return (
          <Text
            key={`letter-${absolutePosition}`}
            letterContent={letter}
            status={status}
          />
        );
      })}
    </span>
  );
}

function Line({ lineContent, isCurrentLine, typingStatus }: LineProps) {
  // 단어의 시작 위치 계산
  let position = 0;
  const wordsWithPosition = lineContent.split(" ").map((word) => {
    const wordPosition = position;
    position += word.length + 1; // +1 for space
    return { word, position: wordPosition };
  });

  return (
    <p className="w-full pl-[30px]">
      {wordsWithPosition.map(({ word, position }, index) => (
        <Word
          key={`word-${index}`}
          wordContent={word}
          startPosition={position}
          typingStatus={isCurrentLine ? typingStatus : undefined}
        />
      ))}
    </p>
  );
}

export default Line;
