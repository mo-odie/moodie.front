import { useState, useEffect } from "react";
import "./App.css";
import { mockData } from "./data/mock";
import TypeContainer from "./components/TypeContainer";
import background from "./assets/Background.png";

function App() {
  const [text, setText] = useState<string>("");

  useEffect(() => {
    const mockText = mockData;
    setText(mockText);
  }, []);

  return (
    // App.tsx
    <div className="fixed inset-0 flex items-center justify-center bg-black">
      <div className="relative h-[1080px] w-[1920px]">
        <img
          src={background}
          className="absolute left-0 top-0 h-full w-full object-cover"
          draggable={false}
        />
        <TypeContainer text={text} maxLineWidth={35} />
      </div>
    </div>
  );
}

export default App;
