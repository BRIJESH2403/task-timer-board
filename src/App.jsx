import { useState, useEffect } from "react";
import AddTaskForm from "./components/AddTaskForm";
import TodoList from "./components/Todolist";
import InProgress from "./components/InProgress";
import Done from "./components/Done";

const App = () => {
  const [tasks, setTasks] = useState([]);

  // Search text for title
  const [searchText, setSearchText] = useState("");

  // Status filter: "all", "todo", "in-progress", "done"
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
            };
          }
          return task;
        })
      );
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  // Filter tasks based on searchText and statusFilter
  const filteredTasks = tasks.filter((task) => {
    const matchesTitle = task.title
      .toLowerCase()
      .includes(searchText.toLowerCase());

    const matchesStatus =
      statusFilter === "all" ? true : task.status === statusFilter;

    return matchesTitle && matchesStatus;
  });

  // Separate filtered tasks by status for passing to components
  const todoTasks = filteredTasks.filter((task) => task.status === "todo");
  const inProgressTasks = filteredTasks.filter(
    (task) => task.status === "in-progress"
  );
  const doneTasks = filteredTasks.filter((task) => task.status === "done");

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-800 to-gray-900 text-white px-4 py-8">
      <h1 className="text-4xl font-bold text-center mb-8">Task Timer Board</h1>

      {/* Filter/Search bar */}
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
