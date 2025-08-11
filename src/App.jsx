import { useState, useEffect } from "react";
import AddTaskForm from "./components/AddTaskForm";
import TodoList from "./components/Todolist";
import InProgress from "./components/InProgress";
import Done from "./components/Done";

const App = () => {
  const [todoTasks, setTodoTasks] = useState([]);
  const [inProgressTasks, setInProgressTasks] = useState([]);
  const [doneTasks, setDoneTasks] = useState([]);

  const addTask = (task) => {
    setTodoTasks((prev) => [...prev, task]);
  };

  const startTask = (id) => {
    const task = todoTasks.find((t) => t.id === id);
    if (!task) return;
    setTodoTasks((prev) => prev.filter((t) => t.id !== id));
    setInProgressTasks((prev) => [...prev, { ...task, isRunning: true }]);
  };

  const handleDone = (id) => {
    const task = inProgressTasks.find((t) => t.id === id);
    if (!task || task.isExpired) return; // Don't move expired tasks
    setInProgressTasks((prev) => prev.filter((t) => t.id !== id));
    setDoneTasks((prev) => [...prev, task]);
  };

  const togglePause = (id) => {
    setInProgressTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, isRunning: !t.isRunning } : t))
    );
  };

  const deleteTask = (id) => {
    setDoneTasks((prev) => prev.filter((t) => t.id !== id));
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setInProgressTasks((prev) =>
        prev.map((task) => {
          if (task.isRunning && task.remainingTime > 0) {
            return { ...task, remainingTime: task.remainingTime - 1 };
          } else if (task.remainingTime === 0 && !task.isExpired) {
            return { ...task, isRunning: false, isExpired: true };
          }
          return task;
        })
      );
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-800 to-gray-900 text-white px-4 py-8">
      <h1 className="text-4xl font-bold text-center mb-8">Task Timer Board</h1>

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
