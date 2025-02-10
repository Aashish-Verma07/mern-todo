import './App.css'
import {Routes,Route } from 'react-router-dom'
import LandingPage from './pages/LangingPage'
import Register from './pages/Register'
import Login from './pages/Login'
import  { Toaster } from 'react-hot-toast';
import PageNotFound from './pages/PageNotFound'
import HomePage from './pages/HomePage'
import { useContext } from 'react'
import { TaskContext } from './context/TaskContext'
function App() {
  const {loggedIn} = useContext(TaskContext);
  return (
    <>
    <Toaster />
    <Routes>
      <Route path='/' element={<LandingPage />}/>
      <Route path='/register' element={<Register/>}/>
      <Route path='/login' element={<Login />}/>
      {!loggedIn ?
      <Route path='*' element={<PageNotFound/>}/>
       :
      <Route path='/homepage' element={<HomePage />}/>
       }

    </Routes>
    </>
      
      
  )
}

export default App
