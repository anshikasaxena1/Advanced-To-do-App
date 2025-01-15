import React, { useState } from 'react';
import WeatherInfo from '../components/WeatherInfo';
import TaskList from '../components/TaskList';
import UserInput from '../components/UserInput';
import ImportantTasks from '../components/ImportantTasks';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../components/authSlice';
import { Link, useNavigate } from 'react-router-dom';
import AuthSidebar from '../components/AuthSidebar';
import { useTheme } from '../context/ThemeContext';

const Home = () => {
  const { isAuthenticated, user } = useSelector(state => state.auth);
  const tasks = useSelector(state => state.tasks.tasks);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const { isDarkMode, toggleDarkMode } = useTheme();

  // Calculate task statistics
  const completedTasks = tasks.filter(task => task.completed).length;
  const pendingTasks = tasks.filter(task => !task.completed).length;

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const toggleAuth = () => {
    setIsAuthOpen(!isAuthOpen);
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  return (
    <div className={`flex h-screen ${isDarkMode ? 'bg-gray-900' : 'bg-gray-100'} overflow-hidden`}>
      {/* Main Left Sidebar */}
      <div
        className={`${
          isSidebarOpen ? 'w-80' : 'w-0'
        } ${isDarkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg transition-all duration-300 h-full flex-shrink-0 relative`}
      >
        <button
          onClick={toggleSidebar}
          className={`absolute right-0 top-1/2 transform translate-x-full -translate-y-1/2 ${
            isDarkMode ? 'bg-gray-800' : 'bg-white'
          } p-2 rounded-r shadow-md z-10`}
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={`w-6 h-6 ${isDarkMode ? 'text-gray-200' : 'text-gray-800'}`}>
            {isSidebarOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            )}
          </svg>
        </button>
        
        <div className={`${isSidebarOpen ? 'block' : 'hidden'} p-4 h-full overflow-y-auto`}>
          {isAuthenticated ? (
            <>
              {/* User Profile Section */}
              <div className="mb-6 text-center">
                <div className="w-24 h-24 rounded-full bg-gray-300 mx-auto mb-4 flex items-center justify-center overflow-hidden">
                  {user?.profilePicture ? (
                    <img
                      src={user.profilePicture}
                      alt={user.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <span className="text-3xl text-gray-600">
                      {user?.name?.charAt(0)?.toUpperCase() || '?'}
                    </span>
                  )}
                </div>
                <h2 className={`text-xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
                  {user?.name || 'Guest User'}
                </h2>
                <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                  {user?.email || 'No email'}
                </p>
              </div>

              {/* Weather Widget */}
              <div className="mb-6">
                <WeatherInfo city="New Delhi" />
              </div>

              {/* Task Statistics */}
              <div className="space-y-4">
                <div className={`p-4 ${isDarkMode ? 'bg-gray-700' : 'bg-gray-50'} rounded-lg`}>
                  <h3 className={`font-semibold ${isDarkMode ? 'text-gray-200' : 'text-gray-700'}`}>
                    Tasks Completed
                  </h3>
                  <p className="text-2xl font-bold text-blue-600">{completedTasks}</p>
                </div>
                <div className={`p-4 ${isDarkMode ? 'bg-gray-700' : 'bg-gray-50'} rounded-lg`}>
                  <h3 className={`font-semibold ${isDarkMode ? 'text-gray-200' : 'text-gray-700'}`}>
                    Pending Tasks
                  </h3>
                  <p className="text-2xl font-bold text-yellow-600">{pendingTasks}</p>
                </div>
              </div>

              {/* Important Tasks Section */}
              <div className="mt-6">
                <ImportantTasks />
              </div>
            </>
          ) : (
            <div className="h-full flex items-center justify-center">
              <p className={`text-center ${isDarkMode ? 'text-gray-300' : 'text-gray-500'}`}>
                Please login to view your profile and tasks
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Main Content */}
      <div className={`flex-1 transition-all duration-300 ${
        isSidebarOpen && isAuthOpen ? 'mx-4' : isSidebarOpen || isAuthOpen ? 'mx-2' : ''
      }`}>
        <div className="h-full p-8 overflow-auto">
          <div className="max-w-full mx-auto">
            <header className="mb-8">
              <div className="flex justify-between items-center">
                <div>
                  <h1 className={`text-3xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
                    {isAuthenticated ? `Welcome, ${user?.name}!` : 'Task Dashboard'}
                  </h1>
                  <p className={isDarkMode ? 'text-gray-300' : 'text-gray-600'}>
                    {isAuthenticated 
                      ? "Here's your task overview"
                      : 'Please login to manage your tasks'}
                  </p>
                </div>
                <div className="flex items-center space-x-4">
                  {/* Dark Mode Toggle */}
                  <button
                    onClick={toggleDarkMode}
                    className={`p-2 rounded-lg ${
                      isDarkMode ? 'bg-gray-700 text-yellow-300' : 'bg-gray-200 text-gray-600'
                    } hover:opacity-80 transition-colors`}
                    aria-label="Toggle dark mode"
                  >
                    {isDarkMode ? (
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                      </svg>
                    ) : (
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                      </svg>
                    )}
                  </button>
                  {/* Mobile Menu Button */}
                  <button
                    onClick={toggleAuth}
                    className={`md:hidden p-2 rounded-lg ${
                      isDarkMode ? 'bg-gray-700 text-gray-200' : 'bg-white text-gray-800'
                    } shadow-md`}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
                    </svg>
                  </button>
                </div>
              </div>
            </header>

            {isAuthenticated ? (
              <>
                {/* Task Summary Section */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
                  <div className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} p-6 rounded-lg shadow`}>
                    <h3 className={`font-semibold mb-2 ${isDarkMode ? 'text-gray-200' : 'text-gray-800'}`}>
                      Today's Tasks
                    </h3>
                    <p className={`text-2xl font-bold ${isDarkMode ? 'text-gray-100' : 'text-gray-900'}`}>
                      {tasks.length}
                    </p>
                  </div>
                  
                  <div className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} p-6 rounded-lg shadow`}>
                    <h3 className={`font-semibold mb-2 ${isDarkMode ? 'text-gray-200' : 'text-gray-800'}`}>
                      Completed
                    </h3>
                    <p className={`text-2xl font-bold ${isDarkMode ? 'text-gray-100' : 'text-gray-900'}`}>
                      {completedTasks}
                    </p>
                  </div>
                </div>

                {/* Task List Section */}
                <div className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow p-6`}>
                  <div className="flex justify-between items-center mb-6">
                    <h2 className={`text-xl font-bold ${isDarkMode ? 'text-gray-200' : 'text-gray-800'}`}>
                      Your Tasks
                    </h2>
                  </div>
                  <UserInput />
                  <TaskList />
                </div>
              </>
            ) : (
              <div className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow p-8 text-center`}>
                <p className={`text-lg ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                  Please login or sign up to start managing your tasks
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Auth Sidebar */}
      <AuthSidebar isAuthOpen={isAuthOpen} toggleAuth={toggleAuth} />
    </div>
  );
};

export default Home;
