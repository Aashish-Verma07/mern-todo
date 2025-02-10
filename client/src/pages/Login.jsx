import { useContext, useState } from "react";
import { Link } from "react-router-dom"
import axios from 'axios';
import toast from 'react-hot-toast';
import {useNavigate} from 'react-router-dom'
import { TaskContext } from "../context/TaskContext";

const Login = () => {
  const {url,setLoggedIn} = useContext(TaskContext)
  const navigate = useNavigate();
   const[user,setUser] = useState({
      email: "",
      password: "",
    })
    const handleInputChange = (e)=>{
      const{name,value} = e.target;
      setUser({
        ...user,
        [name]: value
        })
    }
  
    const handleformSubmit = async(e)=>{
      e.preventDefault();
      console.log(user);
      try {
        const response = await axios.post(`${url}/api/v1/auth/login`,user);
        localStorage.setItem("UsersDetails", JSON.stringify(response.data.user));
        if(response.data.success){
          toast.success(response.data.message);
          setLoggedIn(true);
          navigate('/homepage')
        }
        else{
          toast.error(response.data.message)
        }
  
        return
      } catch (error) {
        console.log(error);
        toast.error('Something went wrong!')
        
      }
      
    }
  return (
    <>
     <section className="h-screen mx-4 sm:mx-16 flex justify-center items-center">
        <form
        onSubmit={handleformSubmit} 
        className="w-full lg:w-96 border p-2 rounded-lg">
          <h1 className="text-3xl font-bold mb-4">Log In</h1>
          <div className="mb-5">
           
          </div>
          <div className="mb-5">
            <label
              htmlFor="email"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Your email
            </label>
            <input
              type="email"
              id="email"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="name@gamil.com"
              required
              name="email"
              value={user.email}
              onChange={handleInputChange}
            />
          </div>
          <div className="mb-5">
            <label
              htmlFor="password"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Your password
            </label>
            <input
              type="password"
              id="password"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              required
              name="password"
              value={user.password}
              onChange={handleInputChange}
            />
          </div>
          <div className="flex items-start mb-5">
            <div className="flex items-center h-5">
              <input
                id="remember"
                type="checkbox"
                value=""
                className="w-4 h-4 border border-gray-300 rounded-sm bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800"
                required
              />
            </div>
            <label
              htmlFor="terms and conditions"
              className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >
              Agree to terms and conditions
            </label>
            
          </div>
          <div className="my-2">
            Dont have an account ? <span className="text-purple-700"><Link to="/register">Click here!</Link></span>
            </div>

          <div className="flex justify-center items-center">
          <button
            type="submit"
            className="text-white bg-pink-600 hover:bg-pink-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
          >
            Submit
          </button>
          </div>
         
        </form>
      </section>
    </>
  )
}

export default Login