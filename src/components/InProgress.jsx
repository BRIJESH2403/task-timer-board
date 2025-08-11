function InProgress({ tasks, handleDone, togglePause }) {
  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">In Progress</h2>
      {tasks.map((task) => {
        const isTimeSet = task.remainingTime !== null && task.remainingTime !== undefined;
        const isTimeUp = task.isExpired || (isTimeSet && task.remainingTime <= 0);

        return (
          <div key={task.id} className="bg-slate-700 p-4 rounded-lg mb-4 shadow">
            <h3 className="text-lg font-bold">{task.title}</h3>
            <p>{task.description}</p>

            <p>
              {isTimeSet && !isTimeUp && (
                <>
                  Time Left:{" "}
                  {Math.floor(task.remainingTime / 3600) > 0 &&
                    `${Math.floor(task.remainingTime / 3600)} hr : `}
                  {Math.floor((task.remainingTime % 3600) / 60)} min{" "}
                  {Math.floor(task.remainingTime % 60)} sec
                </>
              )}
              {isTimeUp && (
                <span className="text-red-500 font-semibold">Time's up!</span>
              )}
            </p>

            <div className="mt-2 flex gap-2">
              {isTimeSet && !isTimeUp && (
                <button
                  onClick={() => togglePause(task.id)}
                  className="bg-yellow-500 hover:bg-yellow-600 px-4 py-1 rounded text-black"
                >
                  {task.isRunning ? "Pause" : "Resume"}
                </button>
              )}

              {!isTimeUp && (
                <button
                  onClick={() => handleDone(task.id)}
                  className="bg-green-600 hover:bg-green-700 px-4 py-1 rounded text-white"
                >
                  Done
                </button>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default InProgress;
