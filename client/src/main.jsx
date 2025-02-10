import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {BrowserRouter} from 'react-router-dom';
import TaskContextProvider from './context/TaskContext.jsx';
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
    <TaskContextProvider>
    <App />
    </TaskContextProvider>
  </BrowserRouter>
  </StrictMode>
)
