import React from "react";

const TodoList = ({ tasks, startTask }) => (
  <div>
    <h2 className="text-2xl font-semibold mb-4"> Todo</h2>
    {tasks.map((task, i) => (
      <div key={i} className="bg-slate-700 p-4 rounded-lg mb-4 shadow">
        <h3 className="text-lg font-bold">{task.title}</h3>
        <p>{task.description}</p>
        <p>
          Time:{" "}
          {Math.floor(task.remainingTime / 3600) > 0 &&
            `${Math.floor(task.remainingTime / 3600)} hr : `}
          {Math.floor((task.remainingTime % 3600) / 60)} min
        </p>
        <button
          onClick={() => startTask(i)}
          className="mt-2 bg-blue-600 hover:bg-blue-700 px-4 py-1 rounded text-white"
        >
          Start
        </button>
      </div>
    ))}
  </div>
);

export default TodoList;
