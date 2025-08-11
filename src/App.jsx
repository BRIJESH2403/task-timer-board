import { useState, useEffect } from "react";
import AddTaskForm from "./components/AddTaskForm";
import TodoList from "./components/Todolist";
import InProgress from "./components/InProgress";
import Done from "./components/Done";

const App = () => {
  const [tasks, setTasks] = useState([]);

  const [searchText, setSearchText] = useState("");

  const [statusFilter, setStatusFilter] = useState("all");

  const addTask = (task) => {
    setTasks((prev) => [...prev, task]);
  };

  const startTask = (id) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id
          ? { ...task, status: "in-progress", isRunning: true }
          : task
      )
    );
  };

  const handleDone = (id) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, status: "done", isRunning: false } : task
      )
    );
  };

  const togglePause = (id) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, isRunning: !task.isRunning } : task
      )
    );
  };

  const deleteTask = (id) => {
    setTasks((prev) => prev.filter((task) => task.id !== id));
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setTasks((prev) =>
        prev.map((task) => {
          if (
            task.status === "in-progress" &&
            task.isRunning &&
            task.remainingTime > 0
          ) {
            return {
              ...task,
              remainingTime: task.remainingTime - 1,
              timeSpent: (task.timeSpent || 0) + 1, // increment timeSpent
            };
          } else if (
            task.status === "in-progress" &&
            task.remainingTime === 0 &&
            task.isRunning
          ) {
            return {
              ...task,
              isRunning: false,
              remainingTime: 0,
              timeSpent: task.timeSpent || 0,
            };
          }
          return task;
        })
      );
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const filteredTasks = tasks.filter((task) => {
    const matchesTitle = task.title
      .toLowerCase()
      .includes(searchText.toLowerCase());

    const matchesStatus =
      statusFilter === "all" ? true : task.status === statusFilter;

    return matchesTitle && matchesStatus;
  });

  const todoTasks = filteredTasks.filter((task) => task.status === "todo");
  const inProgressTasks = filteredTasks.filter(
    (task) => task.status === "in-progress"
  );
  const doneTasks = filteredTasks.filter((task) => task.status === "done");

  const formatTime = (seconds) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hrs > 0 ? `${hrs} hr : ` : ""}${mins} min : ${secs} sec`;
  };

  const totalTimeSpent = tasks.reduce(
    (total, task) => total + (task.timeSpent || 0),
    0
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-800 to-gray-900 text-white px-4 py-8">
      <h1 className="text-4xl font-bold text-center mb-8">Task Timer Board</h1>

      <div className="flex flex-col md:flex-row justify-center items-center gap-4 mb-8">
        <input
          type="text"
          placeholder="Search by Title..."
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          className="p-2 rounded bg-slate-700 text-white outline-none w-full max-w-md"
        />
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="p-2 rounded bg-slate-700 text-white outline-none w-full max-w-xs"
        >
          <option value="all">All Statuses</option>
          <option value="todo">Todo</option>
          <option value="in-progress">In Progress</option>
          <option value="done">Done</option>
        </select>
      </div>
      <div className="mb-8 p-4 bg-slate-700 rounded shadow max-w-md mx-auto text-center">
        <h2 className="text-xl font-semibold mb-2">
          Total Time Spent on All Tasks
        </h2>
        <p className="text-green-400 font-mono text-lg">
          {formatTime(totalTimeSpent)}
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <TodoList tasks={todoTasks} startTask={startTask} />
        <InProgress
          tasks={inProgressTasks}
          handleDone={handleDone}
          togglePause={togglePause}
        />
        <Done tasks={doneTasks} deleteTask={deleteTask} />
      </div>

      <div className="flex justify-center mt-10">
        <AddTaskForm addTask={addTask} />
      </div>
    </div>
  );
};

export default App;
