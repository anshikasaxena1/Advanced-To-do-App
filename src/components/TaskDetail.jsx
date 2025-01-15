import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { updateTask } from '../taskSlice';

const TaskDetail = ({ task }) => {
  const dispatch = useDispatch();
  const [details, setDetails] = useState(task?.details || '');
  const [dueDate, setDueDate] = useState(task?.dueDate || '');
  const [reminder, setReminder] = useState(task?.reminder || '');
  const [repeatOption, setRepeatOption] = useState(task?.repeatOption || 'never');

  const handleUpdate = (field, value) => {
    const updatedTask = {
      ...task,
      [field]: value
    };
    dispatch(updateTask(updatedTask));
  };

  const repeatOptions = [
    { value: 'never', label: 'Never' },
    { value: 'daily', label: 'Daily' },
    { value: 'weekly', label: 'Weekly' },
    { value: 'monthly', label: 'Monthly' }
  ];

  if (!task) {
    return (
      <div className="p-4 text-center text-gray-500">
        Select a task to view details
      </div>
    );
  }

  return (
    <div className="p-4 space-y-4">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">Task Details</h3>
      
      {/* Task Title */}
      <div className="mb-4">
        <h4 className="text-xl font-bold text-gray-900">{task.text}</h4>
        <span className={`inline-block px-2 py-1 rounded-full text-sm ${
          task.completed ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
        }`}>
          {task.completed ? 'Completed' : 'Pending'}
        </span>
      </div>

      {/* Details Section */}
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">
          Add Details
        </label>
        <textarea
          value={details}
          onChange={(e) => {
            setDetails(e.target.value);
            handleUpdate('details', e.target.value);
          }}
          className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          rows="3"
          placeholder="Add more details about this task..."
        />
      </div>

      {/* Due Date */}
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">
          Due Date
        </label>
        <input
          type="datetime-local"
          value={dueDate}
          onChange={(e) => {
            setDueDate(e.target.value);
            handleUpdate('dueDate', e.target.value);
          }}
          className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
      </div>

      {/* Reminder */}
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">
          Set Reminder
        </label>
        <input
          type="datetime-local"
          value={reminder}
          onChange={(e) => {
            setReminder(e.target.value);
            handleUpdate('reminder', e.target.value);
          }}
          className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
      </div>

      {/* Repeat Options */}
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">
          Repeat
        </label>
        <select
          value={repeatOption}
          onChange={(e) => {
            setRepeatOption(e.target.value);
            handleUpdate('repeatOption', e.target.value);
          }}
          className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        >
          {repeatOptions.map(option => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>

      {/* Priority Flag */}
      <div className="flex items-center justify-between pt-4 border-t">
        <span className="text-sm font-medium text-gray-700">Mark as Important</span>
        
      </div>
    </div>
  );
};

export default TaskDetail; 