// src/components/TaskList.jsx
import React from 'react';

const TaskList = ({ tasks, onComplete }) => {
  return (
    <ul>
      {tasks.map((task) => (
        <li key={task.id} className="flex items-center justify-between p-2 border-b">
          <div>
            <h3 className={`${task.completed ? 'line-through' : ''}`}>{task.title}</h3>
            <p>{task.description}</p>
          </div>
          <button
            onClick={() => onComplete(task.id)}
            className="bg-green-500 text-white px-2 py-1 rounded"
          >
            Complete
          </button>
        </li>
      ))}
    </ul>
  );
};

export default TaskList;
