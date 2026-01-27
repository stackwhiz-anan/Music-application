import React, { useState } from 'react'
import { AuthContextAPI } from '../../context/AuthContext'
import { useContext } from 'react'
import { __DB } from '../../backend/FirebaseConjig'
import { setDoc } from 'firebase/firestore'
import toast from 'react-hot-toast'
import { doc } from 'firebase/firestore'
import Spinner from "../../helpers/Spinner";
import { useNavigate } from "react-router-dom";
import { UserContextAPI } from '../../context/UserContext'


const UpdateProfile = () => {
  let{authUser}=useContext(AuthContextAPI)
  let{userProfile}=useContext(UserContextAPI)
    let navigate=useNavigate()
  let[isLoading,setIsLoading]=useState(false)
  let[data,setData]=useState({
    phoneNo:userProfile?.phoneNumber,
    dob:userProfile?.dateOfBirth,
    languages:userProfile?.languages,
    gender:userProfile?.gender,
    address:userProfile?.address,
  })
  let {phoneNo,dob,languages,gender,address}=data
  let handleChange=(e)=>{
let key=e.target.name
let value=e.target.value
setData({...data,[key]:value})
  }

let handleSubmit = async (e)=> {
  e.preventDefault()
  //console.log(data);
  let{displayName,email,photoURL,uid}=authUser
  let payload={
     name:displayName,
     email:email,
     photo:photoURL,
     id:uid,
     phoneNumber:phoneNo,
     dateOfBirth:dob,
     gender:gender,
     languages:languages,
     address:address,
     role:"user"
  }
  console.log(payload);
  

try{
  setIsLoading(true)
  let user_collection=doc(__DB,"user_profile",uid)
  await setDoc(user_collection,payload)
  toast.success("Details added")
  navigate("/user-profile")
}catch (error){
  console.log(error);
  
toast.error(error.message)
}finally{
  setIsLoading(false)
}
};
  return (
   <section className="h-[100%] w-[100%]  flex items-center justify-center " >
    <article className="min-h-[400px] w-[60%] bg-slate-900 rounded-xl p-4">
<h2 className='text-center text-2xl'>Upload Profile Data</h2>
<form className='mt-8' onSubmit={handleSubmit}>
  <article className=' flex  gap-5'>
  <div className='flex gap-2 flex-col w-[48%]'>
    <label htmlFor='phoneNo' className='block text-[18px]'>Phone Number</label>
    <input type="tel" id="phoneNo" placeholder='Enter a phone number' className=' block outline-none bg-white py-2 px-4 rounded-lg text-black' onChange={handleChange} name="phoneNo"
    value={phoneNo}/>
  </div>
  <div className='flex gap-2 flex-col w-[48%]'>
    <label htmlFor='dob' className='block text-[18px]'>Date of birth</label>
    <input type="date" id="dob" placeholder='Enter your date of birth' className=' block outline-none bg-white py-2 px-4 rounded-lg text-black 'onChange={handleChange}
    name="dob" value={dob}/>
  </div>
  </article>
  <article className=' flex gap-5'>
  <div className='flex gap-2 flex-col w-[48%]'>
    <label htmlFor='languages' className='block text-[18px]'>Languages</label>
    <input type="text" id="languages" placeholder='Enter the languages' className=' block outline-none bg-white py-2 px-4 rounded-lg text-black'
    onChange={handleChange} name="languages" value={languages}/>
  </div>
  <div className='flex gap-2 flex-col w-[48%]'>
    <label htmlFor='' className='block text-[18px]'>Gender</label>
    <div className='flex gap-2 font-semibold text-lg'>
    <input type="radio" onChange={handleChange} name="gender" value="Male" checked={gender==="Male"}/>
    <span>Male</span>
    <input type="radio"onChange={handleChange} name="gender" value="Female" checked={gender==="Female"}/>
    <span>Female</span>
    <input type="radio" onChange={handleChange} name="gender" value="Others" checked={gender==="Others"}/>
    <span>Others</span>
    </div>
  </div>
  </article>
  <article className=' flex flex-wrap  gap-5'>
  <div className='flex gap-2 flex-col w-[100%] '>
    <label htmlFor='address' className='block text-[18px]'>Address</label>
    <textarea  id="address"placeholder="Enter the address here.." className='bg-white rounded-lg text-black ' onChange={handleChange} name="address" value={address}
    ></textarea>
  </div>
  </article>
  <article className='flex flex-wrap gap-6'>
      <button className='bg-blue-600 py-2 w-[100%] hover:bg-blue-800 cursor-pointer rounded-lg font-semibold text-lg mt-3'>Submit</button>
  </article>
</form>
    </article>
    {isLoading && <Spinner/>}
   </section>
  )
}

export default UpdateProfile