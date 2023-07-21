import React, { useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import Home from "./components/CRUD/Home";
import TodoList from "./components/Todo/TodoList";
import Todoo from "./components/Todo/Todoo";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="App">
      {/* <button onClick={() => setCount(count + 1)}>INC</button>
      <h1>{count}</h1>
      <button onClick={() => setCount(count - 1)}>DEC</button> */}

      <Home />
      <TodoList />
      <Todoo />
    </div>
  );
}

export default App;

// import React, { useState } from "react";
// import logo from "./logo.svg";
// import "./App.css";

// function App() {
//   const [count, setCount] = useState(0);

//   const handleIncrement = () => {
//     setCount(count + 1);
//   };

//   const handleDecrement = () => {
//     setCount(count - 1);
//   };

//   return (
//     <div className="App">
//       <button onClick={handleIncrement}>INC</button>
//       <h1>{count}</h1>
//       <button onClick={handleDecrement}>DEC</button>
//     </div>
//   );
// }

// export default App;
