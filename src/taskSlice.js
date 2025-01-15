import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  tasks: JSON.parse(localStorage.getItem('tasks')) || [],
  selectedTask: null
};

const taskSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    addTask: (state, action) => {
      const newTask = {
        id: Date.now(),
        text: action.payload,
        completed: false,
        important: false,
        details: '',
        dueDate: '',
        reminder: '',
        repeatOption: 'never',
        createdAt: new Date().toISOString()
      };
      state.tasks.push(newTask);
      localStorage.setItem('tasks', JSON.stringify(state.tasks));
    },
    toggleComplete: (state, action) => {
      const task = state.tasks.find(task => task.id === action.payload);
      if (task) {
        task.completed = !task.completed;
        localStorage.setItem('tasks', JSON.stringify(state.tasks));
      }
    },
    deleteTask: (state, action) => {
      state.tasks = state.tasks.filter(task => task.id !== action.payload);
      if (state.selectedTask?.id === action.payload) {
        state.selectedTask = null;
      }
      localStorage.setItem('tasks', JSON.stringify(state.tasks));
    },
    updateTask: (state, action) => {
      const index = state.tasks.findIndex(task => task.id === action.payload.id);
      if (index !== -1) {
        state.tasks[index] = action.payload;
        if (state.selectedTask?.id === action.payload.id) {
          state.selectedTask = action.payload;
        }
        localStorage.setItem('tasks', JSON.stringify(state.tasks));
      }
    },
    selectTask: (state, action) => {
      state.selectedTask = state.tasks.find(task => task.id === action.payload) || null;
    }
  }
});

export const { 
  addTask, 
  toggleComplete, 
  deleteTask, 
  updateTask,
  selectTask 
} = taskSlice.actions;

export default taskSlice.reducer; 