import { useState, useEffect } from "react";
import "./App.css";
import { mockData } from "./data/mock";
import TypeContainer from "./components/TypeContainer";

function App() {
  const [text, setText] = useState<string>("");

  useEffect(() => {
    const mockText = mockData;
    setText(mockText);
  }, []);

  return (
    <>
      <TypeContainer text={text} maxLineWidth={70} />
    </>
  );
}

export default App;
