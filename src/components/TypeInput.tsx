import { useEffect, useRef } from "react";

type TypeInputProps = {
  setTypeText: React.Dispatch<React.SetStateAction<string>>;
};

function TypeInput({ setTypeText }: TypeInputProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  function onKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {
    // console.log(event.key);
    setTypeText(event.key);
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
    />
  );
}

export default TypeInput;
