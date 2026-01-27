import React, { useContext, useState } from 'react'
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { NavLink, useNavigate } from 'react-router-dom';
import toast from "react-hot-toast";
import { sendEmailVerification, signInWithEmailAndPassword } from 'firebase/auth';
import { __AUTH } from "../backend/FirebaseConjig";
import Spinner from "../helpers/Spinner";
import ForgetPassword from './ForgetPassword';
import { AuthContextAPI } from '../context/AuthContext';
const Login = () => {
  let[togglePassword,setTogglePassword]=useState(false);
  let[isLoading,setIsLoading]=useState(false)
  let[data,setData]=useState({
    email:"",
    password:""
  })
  let{email,password}=data
  let navigate=useNavigate();
  let{setAuthUser} =useContext(AuthContextAPI)

  let handleChange=(e)=>{
    let value=e.target.value;
    let key=e.target.name;
    setData({...data,[key]:value})
    };
  const handleSubmit= async (e)=>{
    e.preventDefault()
    try{
      setIsLoading(true)
    let obj=await signInWithEmailAndPassword(__AUTH,email,password);
    //console.log(obj);
    let {user}=obj;
    console.log(user);
  if(user.emailVerified===true){
    toast.success("Login successful")
    setAuthUser(user)
    navigate("/")
  } else {
    toast.error("Verify your email")
    sendEmailVerification(user)
    
  }
    } catch (error){
      toast.error(error.message)
    }
    finally{
      setIsLoading(false)
    }
         
  }
  return (
    <section
    className="h-[calc(100vh-70px)] w-[100%]
  bg-slate-900 flex justify-center items-center"
  >
    <div className=" w-[30%] bg-slate-800 rounded-lg p-4">
      <header>
        <h1 className="text-center text-2xl">Login</h1>
      </header>
      <main className="p-2">
        <form className="flex flex-col" onSubmit={handleSubmit}>
         
          <div>
            {" "}
            <label htmlFor="email" className="block text-md">
              Email
            </label>
            <input
              type="email"
              placeholder="Enter Email"
              className="outline-none border-1 w-[100%] py-1 my-2 rounded-md p-2"
              onChange={handleChange}
              name="email"
              value={email}
              title="please fill out this field"
            />
          </div>
          <div className="relative">
            {" "}
            <label htmlFor="password" className="block text-md">
              Password
            </label>
            <input
              type={togglePassword ? "text":"password"}
              placeholder="Enter Password"
              className="outline-none border-1 w-[100%] py-1 my-2 rounded-md p-2"
              id="password"
              onChange={handleChange}
              name="password"
              value={password}
              title="please fill out this field"
            />
            {togglePassword ? (
            <FaEye className="absolute top-10 right-3 cursor-pointer" onClick={()=>setTogglePassword(!togglePassword)} />) :
            (<FaEyeSlash className="absolute top-10 right-3 cursor-pointer" onClick={()=>setTogglePassword(!togglePassword)} />)}
          </div>
          <button
            className="bg-blue-600 rounded-2xl py-2 cursor-pointer"
          >
          Login
          </button>
          <div className="mt-2 text-center p-2 flex justify-between">
            <span>Don't have an account ?</span>
            <NavLink to="/auth/register" className='hover:underline'>Register</NavLink>
          </div>
          <div className="mt-1 text-center">
          <NavLink to="/auth/forget-password" className='hover:underline'>Forget Password?</NavLink>
          </div>
        </form>
      </main>
    </div>
   
  {isLoading && <Spinner />}
  </section>
  )
}

export default Login