import './App.css'
import {Routes,Route } from 'react-router-dom'
import LandingPage from './pages/LangingPage'
import Register from './pages/Register'
import Login from './pages/Login'
import  { Toaster } from 'react-hot-toast';
import PageNotFound from './pages/PageNotFound'
import HomePage from './pages/HomePage'
function App() {
  const url = 'http://localhost:4000'
  return (
    <>
    <Toaster />
    <Routes>
      <Route path='/' element={<LandingPage />}/>
      <Route path='/register' element={<Register url={url}/>}/>
      <Route path='/login' element={<Login url={url}/>}/>
      <Route path='/homepage' element={<HomePage url={url}/>}/>

      <Route path='*' element={<PageNotFound/>}/>

    </Routes>
    </>
      
      
  )
}

export default App
