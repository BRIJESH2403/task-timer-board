import { useState, useEffect } from "react";
import AddTaskForm from "./components/AddTaskForm";
import TodoList from "./components/TodoList";
import InProgress from "./components/InProgress";
import Done from "./components/Done";

const App = () => {
  const [todoTasks, setTodoTasks] = useState([]);
  const [inProgressTasks, setInProgressTasks] = useState([]);
  const [doneTasks, setDoneTasks] = useState([]);

  const addTask = (task) => {
    setTodoTasks([...todoTasks, task]);
  };

  const startTask = (index) => {
    const task = todoTasks[index];
    setTodoTasks(todoTasks.filter((_, i) => i !== index));
    setInProgressTasks([...inProgressTasks, { ...task, isRunning: true }]);
  };

  const handleDone = (index) => {
    const task = inProgressTasks[index];
    setInProgressTasks(inProgressTasks.filter((_, i) => i !== index));
    setDoneTasks([...doneTasks, task]);
  };

  const togglePause = (index) => {
    const updated = [...inProgressTasks];
    updated[index].isRunning = !updated[index].isRunning;
    setInProgressTasks(updated);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setInProgressTasks((prev) =>
        prev
          .map((task) => {
            if (task.isRunning && task.remainingTime > 0) {
              return { ...task, remainingTime: task.remainingTime - 1 };
            } else if (task.remainingTime === 0) {
              setDoneTasks((done) => [...done, task]);
              return null;
            }
            return task;
          })
          .filter(Boolean)
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
        <Done tasks={doneTasks} />
      </div>
      <div className="flex justify-center mt-10">
        <AddTaskForm addTask={addTask} />
      </div>
    </div>
  );
};

export default App;
