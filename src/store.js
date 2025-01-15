import { configureStore } from '@reduxjs/toolkit';
import taskReducer from './taskSlice';
import authReducer from './components/authSlice';

// Middleware to save state to localStorage
const localStorageMiddleware = store => next => action => {
  const result = next(action);
  const state = store.getState();
  
  // Save auth state
  if (action.type?.startsWith('auth/')) {
    if (state.auth.isAuthenticated) {
      localStorage.setItem('user', JSON.stringify(state.auth.user));
    }
  }
  
  // Save tasks state
  if (action.type?.startsWith('tasks/')) {
    localStorage.setItem('tasks', JSON.stringify(state.tasks.tasks));
  }
  
  return result;
};

const store = configureStore({
  reducer: {
    tasks: taskReducer,
    auth: authReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(localStorageMiddleware)
});

export default store;



