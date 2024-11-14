
import { useState, useEffect } from 'react';
import TaskManager from './Component/Taskmanager';


function App() {
  const [tasks, setTasks] = useState(() => JSON.parse(localStorage.getItem('tasks')) || []);

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  return (
    <div className="container mx-auto p-4">
    
      <TaskManager tasks={tasks} setTasks={setTasks} />
    </div>
  );
}

export default App;
