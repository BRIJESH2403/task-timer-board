import React from "react";

const Done = ({ tasks }) => (
  <div>
    <h2 className="text-2xl font-semibold mb-4"> Done</h2>
    {tasks.map((task, i) => (
      <div key={i} className="bg-slate-700 p-4 rounded-lg mb-4 shadow">
        <h3 className="text-lg font-bold">{task.title}</h3>
        <p>{task.description}</p>
        <p className="text-green-400 font-semibold"> Completed!</p>
      </div>
    ))}
  </div>
);

export default Done;
