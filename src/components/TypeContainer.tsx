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

  const visibleLines = lines.slice(
    Math.max(0, currentLineIdx - 1),
    Math.min(lines.length, currentLineIdx + 2),
  );

  return (
    <div className="bg-gray-basic flex h-screen w-full flex-col items-center justify-center">
      {visibleLines.map((lineContent, index) => (
        <Line key={currentLineIdx - 1 + index} lineContent={lineContent} />
      ))}
    </div>
  );
}

export default TypeContainer;
