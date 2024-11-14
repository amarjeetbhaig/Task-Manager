import { useState } from 'react';

const TaskManager = ({ tasks, setTasks }) => {
  const [title, setTitle] = useState('');
  const [search, setSearch] = useState('');
  const [sortCriteria, setSortCriteria] = useState('default');

  const handleAddTask = (e) => {
    e.preventDefault();
    if (title.trim()) {
      setTasks([...tasks, { title, completed: false, priority: 'normal' }]);
      setTitle('');
    }
  };

  const handleDeleteTask = (index) => {
    setTasks(tasks.filter((_, i) => i !== index));
  };

  const handleToggleCompletion = (index) => {
    const updatedTasks = tasks.map((task, i) =>
      i === index ? { ...task, completed: !task.completed } : task
    );
    setTasks(updatedTasks);
  };

  const handlePriorityChange = (index, priority) => {
    const updatedTasks = tasks.map((task, i) =>
      i === index ? { ...task, priority } : task
    );
    setTasks(updatedTasks);
  };

  const filteredTasks = tasks
    .filter((task) => task.title.toLowerCase().includes(search.toLowerCase()))
    .sort((a, b) => {
      if (sortCriteria === 'priority') return a.priority.localeCompare(b.priority);
      if (sortCriteria === 'completed') return a.completed - b.completed;
      return 0;
    });

  return (
    <div className="p-6 max-w-[800px] mx-auto md:h-auto mt-8 bg-slate-50 rounded-lg shadow-lg">
        <h1 className="text-2xl text-start font-bold mb-8">Task Manager</h1>
      <form onSubmit={handleAddTask} className="flex mb-4">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Add a task..."
          className="p-2 border border-gray-300 rounded-md flex-grow"
        />
        <button
          type="submit"
          className="ml-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-700 transition"
        >
          Add
        </button>
      </form>

      <div className="flex items-center space-x-4 mb-4">
        <input
          type="text"
          placeholder="Search tasks..."
          onChange={(e) => setSearch(e.target.value)}
          className="p-2 border border-gray-300 rounded-lg flex-grow"
        />

        <select
          value={sortCriteria}
          onChange={(e) => setSortCriteria(e.target.value)}
          className="p-2 border border-gray-300 rounded-lg"
        >
          <option value="default">Default</option>
          <option value="priority">Sort by Priority</option>
          <option value="completed">Sort by Completed</option>
        </select>
      </div>
  
     <div className='table-container border-4 overflow-hidden border-gray-500 rounded-xl '>
      <table className="w-full bg-white ">
        <thead>
          <tr className="bg-gray-400 border-b ">
            <th className="p-2 text-left">Task</th>
            <th className="p-2 text-left">Priority</th>
            <th className="p-2 text-left">Completed</th>
            <th className="p-2 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredTasks.map((task, index) => (
            <tr key={index} className="bg-gray-50 hover:bg-gray-100">
              <td className="p-2">
                <span className={task.completed ? 'line-through text-gray-400' : ''}>{task.title}</span>
              </td>
              <td className="p-2">
                <select
                  value={task.priority}
                  onChange={(e) => handlePriorityChange(index, e.target.value)}
                  className="p-1 border border-gray-300 rounded-md"
                >
                  <option value="low">Low</option>
                  <option value="normal">Normal</option>
                  <option value="high">High</option>
                </select>
              </td>
              <td className="p-2 pl-[20px]">
                <input
                  type="checkbox"
                  checked={task.completed}
                  onChange={() => handleToggleCompletion(index)}
                  className="text-blue-600 rounded focus:ring-0"
                />
              </td>
              <td className="p-2">
                <button
                  onClick={() => handleDeleteTask(index)}
                  className="text-red-500 hover:text-red-700 transition"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>
    </div>
  );
};

export default TaskManager;
