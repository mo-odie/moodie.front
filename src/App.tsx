import { useState, useEffect } from "react";
import "./App.css";
import { mockData } from "./data/mock";
import TypeContainer from "./components/TypeContainer";
import LayeredBackground from "./components/LayeredBackground";

function App() {
  const [text, setText] = useState<string>("");

  useEffect(() => {
    const mockText = mockData;
    setText(mockText);
  }, []);

  return (
    <LayeredBackground>
      <TypeContainer text={text} maxLineWidth={37} />
    </LayeredBackground>
  );
}

export default App;
