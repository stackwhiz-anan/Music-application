import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'
import Spinner from '../helpers/Spinner'
import { sendPasswordResetEmail } from 'firebase/auth'
import { __AUTH } from '../backend/FirebaseConjig'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
const ForgetPassword = () => {
    let[email,setEmail]=useState("")
let[isLoading,setIsLoading]=useState(false)
let navigate=useNavigate()
    const handleChange=(e)=>{
        setEmail(e.target.value)
    }
    const handleSubmit=async (e)=>{
        e.preventDefault();
        try{
          await sendPasswordResetEmail(__AUTH,email)
          toast.success("Reset link is set to mail")
          navigate("/auth/login")
        } catch(error){
            toast.success(error.message)
        }
    }
  return (
<section
    className="h-[calc(100vh-70px)] w-[100%]
  bg-slate-900 flex justify-center items-center"
  >
    <div className=" w-[30%] bg-slate-800 rounded-lg p-4">
      <header>
        <h1 className="text-center text-2xl">Reset Password</h1>
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
          <button
            className="bg-blue-600 rounded-2xl py-2 mt-2 cursor-pointer w-[100%] hover:bg-blue-800 block"
          >
        Reset Password
          </button>
           <button className='bg-red-400 rounded-2xl py-2 mt-3 cursor-pointer w-[100%] hover:bg-red-700 block'><NavLink to="/auth/login">Cancel</NavLink>
           </button>
        </form>
      </main>
    </div>
   
  {isLoading && <Spinner />}
  </section>
  )
}

export default ForgetPassword