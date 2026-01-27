import React,{useState} from "react";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import toast from "react-hot-toast";
import { createUserWithEmailAndPassword, sendEmailVerification, updateProfile } from "firebase/auth";
import { __AUTH } from "../backend/FirebaseConjig";
import { NavLink, useNavigate } from "react-router-dom";
import Spinner from "../helpers/Spinner";
const Register = () => {
  let[togglePassword,setTogglePassword]=useState(false);
  let[toggleConfirmPassword,setToggleConfirmPassword]=useState(false);
  let navigate=useNavigate()
  let[isLoading,setIsLoading]=useState(false)
  let[data,setData]=useState({
    username:"",
    email:"",
    password:"",
    confirmPassword:""
  })
  let{username,email,password,confirmPassword}=data;
  let handleChange=(e)=>{
    let value=e.target.value;
    let key=e.target.name;
    setData({...data,[key]:value})
    };
    let handleSubmit= async (e)=>{
      e.preventDefault();
      try{
        setIsLoading(true)
         if(password !== confirmPassword){
          toast.error("Confirm password does not match")
          setData({...data,confirmPassword:""})
         }else{
    let obj=await createUserWithEmailAndPassword(__AUTH,email,password)
    let{user}=obj;
        console.log(user);
       await updateProfile(user,{
          displayName:username,
          photoURL:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTRRNQy-ExC3UWE0WC2SqwTTqMdgd3XvWfO-Q&s"
        })
        sendEmailVerification(user)
        toast("Verification link sent")
        toast.success("user registered")
        navigate("/auth/login")
         }
      }catch (error){
console.log(error.message);
toast.error(error.message.slice(22,error.message.length-2))
}finally{
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
          <h1 className="text-center text-2xl">Register</h1>
        </header>
        <main className="p-2">
          <form className="flex flex-col" onSubmit={handleSubmit}>
            <div>
              {" "}
              <label htmlFor="username" className="block text-md">
                Username
              </label>
              <input
                type="text"
                placeholder="Enter Username"
                className="outline-none border-1 w-[100%] py-1 my-2 rounded-md p-2 "
                onChange={handleChange}
                name="username"
                value={username}
                title="please fill out this field"
              />
            </div>

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
            <div className="relative">
              <label htmlFor="password" className="block text-md">
                {" "}
                Confirm Password
              </label>
              <input
                type={toggleConfirmPassword ? "text":"password"}
                placeholder="Enter Confirm Password"
                className="outline-none border-1 w-[100%] py-1 my-2 rounded-md p-2"
                id="confirmPassword"
                onChange={handleChange}
                name="confirmPassword"
                value={confirmPassword}
                title="please fill out this field"
              />
              {toggleConfirmPassword ? (
              <FaEye className="absolute top-10 right-3 cursor-pointer" onClick={()=>setToggleConfirmPassword(!toggleConfirmPassword)} />) :
              (<FaEyeSlash className="absolute top-10 right-3 cursor-pointer" onClick={()=>setToggleConfirmPassword(!toggleConfirmPassword)} />)}
            </div>
            <button
              className="bg-blue-600 rounded-2xl py-2 cursor-pointer"
            >
            Register
            </button>
            <div className="mt-2 text-center p-2 flex justify-between">
              <span>Already have an account ?</span>
              <NavLink to="/auth/login" className='hover:underline'>Login</NavLink>
            </div>
          </form>
        </main>
      </div>
     
    {isLoading && <Spinner />}
    </section>
  );
};

export default Register;
