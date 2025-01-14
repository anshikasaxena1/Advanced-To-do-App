import React, { useState } from 'react';
import TaskList from './components/TaskList';
import TaskForm from './components/TaskForm';
import WeatherInfo from './components/WeatherInfo';

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [city, setCity] = useState('New York');

  const addTask = (task) => {
    setTasks([...tasks, { ...task, id: Date.now() }]);
  };

  const completeTask = (id) => {
    setTasks(tasks.map((task) => (task.id === id ? { ...task, completed: true } : task)));
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Advanced To-Do App</h1>
      <WeatherInfo city={city} />
      <TaskForm onAddTask={addTask} />
      <TaskList tasks={tasks} onComplete={completeTask} />
    </div>
  );
};

export default App;
