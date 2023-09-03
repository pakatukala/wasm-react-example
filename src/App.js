import React, { useState } from "react";
import './App.css';
import init, { add } from "wasm-lib";

function App() {
  const [ans, setAns] = useState(0);

  const [first, setFirst] = useState(0);

  const [second, setSecond] = useState(0);


  const handleClick = () => {
    init().then(() => {
      setAns(add(first, second));
    })
  }

  return (
    <div className="App">
      <div><h1>Enter the first value : </h1><input value={first} onChange={(event) => setFirst(event.target.value)}/></div>
      <div><h1>Enter the second value : </h1><input value={second} onChange={(event) => setSecond(event.target.value)}/></div>
      <div><h1>Result</h1></div>
      <div>{ans}</div>
      <br></br>
      <div><button onClick={() => handleClick()}>Submit</button></div>
    </div>
  );
}

export default App;
