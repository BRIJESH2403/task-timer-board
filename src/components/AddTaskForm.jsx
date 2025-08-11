import { useState } from "react";

const AddTaskForm = ({ addTask }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [time, setTime] = useState("");
  const [showForm, setShowForm] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title || !description) return;

    const newTask = {
      id: Date.now(),
      title,
      description,
      time: time ? parseInt(time) : null,
      remainingTime: time ? parseInt(time) * 60 : null,
      isRunning: false,
      isExpired: false,
    };

    addTask(newTask);
    setTitle("");
    setDescription("");
    setTime("");
    setShowForm(false);
  };

  return (
    <div className="flex justify-center mt-10">
      <button
        onClick={() => setShowForm(true)}
        className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded text-white font-semibold"
      >
        Add Task
      </button>

      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-slate-700 p-6 rounded-xl shadow-lg w-full max-w-md relative">
            <button
              onClick={() => setShowForm(false)}
              className="absolute top-2 right-3 text-white text-2xl"
            >
              ×
            </button>

            <form onSubmit={handleSubmit} className="flex flex-col gap-4 mt-6">
              <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Title"
                required
                className="p-2 rounded bg-slate-800 text-white outline-none"
              />
              <input
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Description"
                required
                className="p-2 rounded bg-slate-800 text-white outline-none"
              />
              <input
                type="number"
                min="1"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                placeholder="Time (minutes)"
                className="p-2 rounded bg-slate-800 text-white outline-none"
              />
              <button
                type="submit"
                className="w-full md:w-auto px-6 bg-green-600 hover:bg-green-700 py-2 rounded text-white font-semibold"
              >
                Add Task
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddTaskForm;
