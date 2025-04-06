import { useState, useEffect } from "react";
import { splitTextToLines } from "../utils/contentUtil";
import Line from "./TextDisplay";

type TypeContainerProps = {
  text: string;
  maxLineWidth: number;
};

function TypeContainer({ text, maxLineWidth }: TypeContainerProps) {
  const [lines, setLines] = useState<string[]>([]);
  const [currentLineIdx, setCurrentLineIdx] = useState<number>(0);

  useEffect(() => {
    const splitLines = splitTextToLines(text, maxLineWidth);
    setLines(splitLines);
  }, [text, maxLineWidth]);

  const visibleLines = () => {
    if (currentLineIdx === 0) {
      // 첫 번째 줄인 경우 (첫 번째, 두 번째, 세 번째 줄 표시)
      return lines.slice(0, Math.min(3, lines.length));
    } else if (currentLineIdx === lines.length - 1) {
      // 마지막 줄인 경우 (마지막 세 줄 표시)
      return lines.slice(Math.max(0, lines.length - 3), lines.length);
    } else {
      // 중간 줄인 경우 (이전, 현재, 다음 줄 표시)
      return lines.slice(currentLineIdx - 1, currentLineIdx + 2);
    }
  };

  // 현재 줄이 화면에서 몇 번째 줄인지 계산
  const getCurrentLinePosition = () => {
    if (currentLineIdx === 0) return 0;
    if (currentLineIdx === lines.length - 1) return 2;
    return 1;
  };

  return (
    <div className="bg-gray-basic flex h-screen w-full flex-col items-center justify-center">
      {visibleLines().map((lineContent: string, index: number) => (
        <Line
          key={currentLineIdx - 1 + index}
          lineContent={lineContent}
          isCurrentLine={index === getCurrentLinePosition()}
        />
      ))}
    </div>
  );
}

export default TypeContainer;
