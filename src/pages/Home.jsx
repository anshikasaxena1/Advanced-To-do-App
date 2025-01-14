import React, { useState } from 'react';
import WeatherInfo from '../components/WeatherInfo';

const Home = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar/User Information Section */}
      <div
        className={`${
          isSidebarOpen ? 'w-3/4 sm:w-1/4' : 'w-0'
        } bg-white shadow-lg transition-all duration-300 lg:relative fixed h-full z-10`}
      >
        <button
          onClick={toggleSidebar}
          className=" right-10 top-4 bg-white p-2 rounded-r shadow-md "
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            {isSidebarOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
            )}
          </svg>
         
        </button>
        
        <div className={`${isSidebarOpen ? 'block' : 'hidden'} p-4`}>
          {/* User Profile Section */}
          <div className="mb-6 text-center">
            <div className="w-24 h-24 rounded-full bg-gray-300 mx-auto mb-4">
              {/* User Avatar will go here */}
            </div>
            <h2 className="text-xl font-bold">User Name</h2>
            <p className="text-gray-600">user@email.com</p>
          </div>

          {/* Weather Widget */}
          <div className="mb-6">
            <WeatherInfo city="New York" />
          </div>

          {/* Additional User Stats */}
          <div className="space-y-4">
            <div className="p-4 bg-gray-50 rounded-lg">
              <h3 className="font-semibold">Tasks Completed</h3>
              <p className="text-2xl font-bold text-blue-600">24</p>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg">
              <h3 className="font-semibold">Pending Tasks</h3>
              <p className="text-2xl font-bold text-yellow-600">12</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Dashboard Section */}
      <div className="flex-1 p-8 overflow-auto">
        <div className="max-w-7xl mx-auto">
          <header className="mb-8">
            <h1 className="text-3xl font-bold text-gray-800">Task Dashboard</h1>
            <p className="text-gray-600">Welcome back! Here's your task overview</p>
          </header>

          {/* Task Summary Section */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="font-semibold mb-2">Today's Tasks</h3>
              <p className="text-2xl font-bold">8</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="font-semibold mb-2">In Progress</h3>
              <p className="text-2xl font-bold">5</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="font-semibold mb-2">Completed</h3>
              <p className="text-2xl font-bold">3</p>
            </div>
          </div>

          {/* Task List Section */}
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold">Your Tasks</h2>
              {/* Add Task Button Component will go here */}
            </div>
            
            {/* TaskList Component will be inserted here */}
            {/* <TaskList /> */}

            {/* Task Categories Component will be inserted here */}
            {/* <TaskCategories /> */}

            {/* Task Priority Filter Component will be inserted here */}
            {/* <TaskPriorityFilter /> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
