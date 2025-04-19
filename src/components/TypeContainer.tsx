import { useState, useEffect } from "react";
import { splitTextToLines } from "../utils/contentUtil";
import Line from "./TextDisplay";
import TypeInput from "./TypeInput";

type TypeContainerProps = {
  text: string;
  maxLineWidth: number;
};

function TypeContainer({ text, maxLineWidth }: TypeContainerProps) {
  const [lines, setLines] = useState<string[]>([]);
  const [currentLineIdx, setCurrentLineIdx] = useState<number>(0);
  const [typedText, setTypedText] = useState<string>("");
  const [cursorPosition, setCursorPosition] = useState<number>(0);
  const [mistakes, setMistakes] = useState<number[]>([]);

  useEffect(() => {
    const splitLines = splitTextToLines(text, maxLineWidth);
    setLines(splitLines);
  }, [text, maxLineWidth]);

  // 키 입력 처리
  const handleKeyPress = (key: string) => {
    if (!lines.length) return;

    const currentLine = lines[currentLineIdx];

    // 백스페이스 처리
    if (key === "Backspace") {
      if (cursorPosition > 0) {
        setTypedText((prev) => prev.slice(0, -1));
        setCursorPosition((prev) => prev - 1);

        // 실수 목록에서 제거
        setMistakes((prev) => prev.filter((pos) => pos !== cursorPosition - 1));
      }
      return;
    }

    // 일반 키 입력 처리
    if (key.length === 1) {
      if (cursorPosition < currentLine.length) {
        // 현재 위치의 정확한 문자 확인
        const correctChar = currentLine[cursorPosition];

        // 실수 체크 및 기록
        if (key !== correctChar) {
          setMistakes((prev) => [...prev, cursorPosition]);
        }

        setTypedText((prev) => prev + key);
        setCursorPosition((prev) => prev + 1);

        // 라인을 모두 입력했으면 다음 라인으로
        if (cursorPosition + 1 >= currentLine.length) {
          if (currentLineIdx < lines.length - 1) {
            setTimeout(() => {
              setCurrentLineIdx((prev) => prev + 1);
              setTypedText("");
              setCursorPosition(0);
              setMistakes([]);
            }, 500); // 500ms 후에 다음 줄로 이동
          }
        }
      }
    }
  };

  // TypeInput으로부터 입력 받기
  const handleTypeInput = (key: string) => {
    handleKeyPress(key);
  };

  const visibleLines = () => {
    if (currentLineIdx === 0) {
      // 첫 번째 줄인 경우 (첫 번째, 두 번째, 세 번째 줄 표시)
      return lines.slice(0, Math.min(3, lines.length));
    } else if (currentLineIdx === lines.length - 1) {
      // 마지막 줄인 경우 (마지막 세 줄 표시)
      return lines.slice(Math.max(0, lines.length - 3), lines.length);
    } else {
      // 중간 줄인 경우 (이전, 현재, 다음 줄 표시)
      return lines.slice(
        Math.max(0, currentLineIdx - 1),
        Math.min(lines.length, currentLineIdx + 2),
      );
    }
  };

  // 현재 줄이 화면에서 몇 번째 줄인지 계산
  const getCurrentLinePosition = () => {
    if (currentLineIdx === 0) return 0;
    if (currentLineIdx === lines.length - 1)
      return Math.min(2, lines.length - 1);
    return 1;
  };

  // 타이핑 진행 상태 계산 (각 줄별로)
  const getLineStatus = (lineIndex: number) => {
    const displayLineIndex =
      lineIndex + (currentLineIdx - getCurrentLinePosition());

    // 현재 줄이 아닌 경우
    if (displayLineIndex !== currentLineIdx) return null;

    return {
      typedText,
      cursorPosition,
      mistakes,
    };
  };

  return (
    <div className="absolute left-[612px] top-[300px] flex h-[562px] w-[700px] flex-col items-center justify-start bg-[rgba(63,77,79,0.2)] pt-5">
      {visibleLines().map((lineContent: string, index: number) => (
        <Line
          key={`line-${currentLineIdx - getCurrentLinePosition() + index}`}
          lineContent={lineContent}
          isCurrentLine={index === getCurrentLinePosition()}
          typingStatus={getLineStatus(index)}
        />
      ))}
      <TypeInput setTypeText={handleTypeInput} />
    </div>
  );
}

export default TypeContainer;
