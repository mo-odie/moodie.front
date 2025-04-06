export function splitTextToLines(
  content: string,
  maxLineWidth: number,
): string[] {
  const words = content.split(" ");
  const lines: string[] = [];
  let currentLine = "";

  for (const word of words) {
    if (currentLine && currentLine.length + word.length + 1 > maxLineWidth) {
      lines.push(currentLine);
      currentLine = word;
    } else {
      // 첫 단어이면 word로 설정, 그렇지 않으면 공백과 함께 추가
      currentLine = currentLine ? `${currentLine} ${word}` : word;
    }
  }

  return lines;
}
