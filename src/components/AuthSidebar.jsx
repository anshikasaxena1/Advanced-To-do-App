import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../components/authSlice';
import { Link, useNavigate } from 'react-router-dom';
import TaskDetail from './TaskDetail';

const AuthSidebar = ({ isAuthOpen, toggleAuth }) => {
  const { isAuthenticated, user } = useSelector(state => state.auth);
  const tasks = useSelector(state => state.tasks.tasks);
  const selectedTask = useSelector(state => state.tasks.selectedTask);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Calculate task statistics
  const completedTasks = tasks.filter(task => task.completed).length;
  const pendingTasks = tasks.filter(task => !task.completed).length;
  const importantTasks = tasks.filter(task => task.important).length;

  const handleLogout = () => {
    dispatch(logout());
    toggleAuth();
    navigate('/login', { replace: true });
  };

  return (
    <div
      className={`${
        isAuthOpen ? 'translate-x-0' : 'translate-x-full'
      } fixed right-0 top-0 h-full w-80 bg-white shadow-lg transition-transform duration-300 z-50 flex flex-col`}
    >
      <button
        onClick={toggleAuth}
        className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-full bg-white p-2 rounded-l shadow-md"
        aria-label={isAuthOpen ? "Close auth" : "Open auth"}
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
          {isAuthOpen ? (
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          ) : (
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          )}
        </svg>
      </button>

      {isAuthenticated ? (
        <>
          {/* Main content area with scroll */}
          <div className="flex-1 overflow-y-auto">
            {/* User Profile Section */}
            <div className="text-center mb-6">
              <div className="w-20 h-20 rounded-full mx-auto mb-4 overflow-hidden">
                
              </div>
              
            </div>

            {/* Conditional Rendering: Task Details or Statistics */}
            {selectedTask ? (
              <TaskDetail task={selectedTask} />
            ) : (
              <div className="p-4 space-y-4">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Task Overview</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 bg-blue-50 rounded-lg">
                    <h3 className="font-semibold text-blue-700">Total</h3>
                    <p className="text-2xl font-bold text-blue-600">{tasks.length}</p>
                  </div>
                  <div className="p-4 bg-green-50 rounded-lg">
                    <h3 className="font-semibold text-green-700">Done</h3>
                    <p className="text-2xl font-bold text-green-600">{completedTasks}</p>
                  </div>
                  <div className="p-4 bg-yellow-50 rounded-lg">
                    <h3 className="font-semibold text-yellow-700">Pending</h3>
                    <p className="text-2xl font-bold text-yellow-600">{pendingTasks}</p>
                  </div>
                  <div className="p-4 bg-purple-50 rounded-lg">
                    <h3 className="font-semibold text-purple-700">Important</h3>
                    <p className="text-2xl font-bold text-purple-600">{importantTasks}</p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Fixed logout button at bottom */}
          <div className="p-4 border-t border-gray-200">
            <button
              onClick={handleLogout}
              className="w-full bg-red-500 text-white p-3 rounded-lg hover:bg-red-600 transition-colors font-semibold"
            >
              Logout
            </button>
          </div>
        </>
      ) : (
        <div className="p-4 space-y-4">
          <Link
            to="/login"
            className="block w-full bg-blue-500 text-white p-2 rounded text-center hover:bg-blue-600 transition-colors"
          >
            Login
          </Link>
          <Link
            to="/signup"
            className="block w-full bg-green-500 text-white p-2 rounded text-center hover:bg-green-600 transition-colors"
          >
            Sign Up
          </Link>
        </div>
      )}
    </div>
  );
};

export default AuthSidebar;