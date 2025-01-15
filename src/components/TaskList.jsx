import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { toggleComplete, deleteTask, selectTask } from '../taskSlice';

const TaskList = () => {
  const tasks = useSelector(state => state.tasks.tasks);
  const selectedTaskId = useSelector(state => state.tasks.selectedTask?.id);
  const dispatch = useDispatch();

  const handleTaskClick = (taskId) => {
    dispatch(selectTask(taskId));
  };

  if (tasks.length === 0) {
    return (
      <div className="text-center text-gray-500 mt-4">
        No tasks yet. Add some tasks to get started!
      </div>
    );
  }

  return (
    <div className="mt-4 space-y-2">
      {tasks.map(task => (
        <div
          key={task.id}
          className={`flex items-center justify-between p-4 bg-white rounded-lg border transition-all cursor-pointer hover:shadow-md ${
            selectedTaskId === task.id ? 'border-blue-500 shadow-md' : 'border-gray-200'
          }`}
          onClick={() => handleTaskClick(task.id)}
        >
          <div className="flex items-center space-x-4 flex-1">
            <input
              type="checkbox"
              checked={task.completed}
              onChange={(e) => {
                e.stopPropagation();
                dispatch(toggleComplete(task.id));
              }}
              className="h-5 w-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
            <div className="flex-1">
              <p className={`text-gray-800 ${task.completed ? 'line-through text-gray-500' : ''}`}>
                {task.text}
              </p>
              {task.dueDate && (
                <p className="text-sm text-gray-500">
                  Due: {new Date(task.dueDate).toLocaleDateString()}
                </p>
              )}
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            {task.important && (
              <span className="text-yellow-500">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              </span>
            )}
            <button
              onClick={(e) => {
                e.stopPropagation();
                dispatch(deleteTask(task.id));
              }}
              className="text-red-500 hover:text-red-700 p-1"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TaskList;

