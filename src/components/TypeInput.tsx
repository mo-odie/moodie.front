import { useEffect, useRef } from "react";

type TypeInputProps = {
  setTypeText: (key: string) => void;
};

function TypeInput({ setTypeText }: TypeInputProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  function onKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {
    // 특수 키 처리
    if (event.key === "Backspace") {
      setTypeText("Backspace");
    } else if (event.key.length === 1) {
      // 일반 키 입력만 처리
      setTypeText(event.key);
    }

    // 기본 동작 방지 (페이지 스크롤 등)
    event.preventDefault();
  }

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }

    const focusByClick = () => {
      if (inputRef.current) inputRef.current.focus();
    };

    document.addEventListener("click", focusByClick);
    return () => document.removeEventListener("click", focusByClick);
  }, []);

  return (
    <input
      ref={inputRef}
      onKeyDown={onKeyDown}
      className="absolute -z-10 h-px w-px opacity-0"
      autoFocus
    />
  );
}

export default TypeInput;
