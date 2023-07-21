import React, { useState } from "react";

const Todoo = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");

  const handleAddTask = () => {
    if (newTask.trim() !== "") {
      setTasks([...tasks, newTask]);
      setNewTask("");
    }
  };
  const handleDeleteTask = (index) => {
    // const filterdata = tableData.filter((item, i) => i !== index);
    const filterData = tasks.filter((item, i) => i !== index);
    setTasks(filterData);
  };

  return (
    <div>
      <h2>Todo List</h2>
      <input
        type="text"
        value={newTask}
        onChange={(e) => setNewTask(e.target.value)}
        placeholder="Entr a new Tasks"
      />
      <button onClick={handleAddTask}> Add</button>

      <ul>
        {tasks.map((task, index) => (
          <li key={index}>
            <h1> {task}</h1>
            <button onClick={() => handleDeleteTask(index)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};
export default Todoo;
