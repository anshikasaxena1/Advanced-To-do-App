import React from 'react';
import { useSelector } from 'react-redux';

const ImportantTasks = () => {
  const tasks = useSelector(state => 
    state.tasks.tasks.filter(task => task.important && !task.completed)
  );

  if (tasks.length === 0) {
    return (
      <div className="p-4 text-gray-500 text-sm">
        No important tasks
      </div>
    );
  }

  return (
    <div className="p-4 space-y-2">
      <h2 className="font-semibold text-lg mb-3">Important Tasks</h2>
      {tasks.map(task => (
        <div
          key={task.id}
          className="p-2 bg-yellow-50 rounded-md text-sm"
        >
          {task.text}
        </div>
      ))}
    </div>
  );
};

export default ImportantTasks; 