import { Popconfirm, Button, message } from "antd";

const Done = ({ tasks, deleteTask }) => {
  const handleConfirm = (id) => {
    deleteTask(id);
    message.success("Task deleted");
  };

  const handleCancel = () => {
    message.info("Delete cancelled");
  };

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Done</h2>
      {tasks.map((task) => (
        <div
          key={task.id}
          className="bg-slate-700 p-4 rounded-lg mb-4 shadow flex justify-between items-center"
        >
          <div>
            <h3 className="text-lg font-bold">{task.title}</h3>
            <p>{task.description}</p>
            <p className="text-green-400 font-semibold">Completed!</p>
          </div>
          <Popconfirm
            title="Are you sure you want to delete this task?"
            onConfirm={() => handleConfirm(task.id)}
            onCancel={handleCancel}
            okText="Yes"
            cancelText="No"
          >
            <Button className="!bg-red-600 !hover:bg-red-700 !text-white">
              Delete
            </Button>
          </Popconfirm>
        </div>
      ))}
    </div>
  );
};

export default Done;
