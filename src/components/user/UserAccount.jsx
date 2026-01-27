import React, { useContext, useState } from 'react'
import { AuthContextAPI } from '../../context/AuthContext'
import { NavLink } from 'react-router-dom'
import {UserContextAPI} from '../../context/UserContext'
import Spinner from '../../helpers/Spinner'
const UserAccount = () => {
  let {authUser}=useContext(AuthContextAPI)
  //let [profile,setProfile]=useState(null)
  let {userProfile,isLoading}=useContext(UserContextAPI)
  return (
    <section className='h-[100%] w-[100%]  flex items-center justify-center'>
<article className='min-h-[300px] w-[40%] bg-slate-900 rounded-xl p-4'>
  <header className='h-[110px] w-[100%] bg-slate-700 rounded-t-xl  items-center flex-col flex'>
<img src={authUser?.photoURL}  className='h-28 w-28  rounded-full -mt-16' alt="" />
<h2 className='font-semibold  text-md'>{authUser?.displayName}</h2>
<p className='font-semibold text-md'>{authUser?.email}</p>
  </header>
  {userProfile ? <div className='mt-2'>
    <h2 className='text-xl text-indigo-400 text-center'>Personal Info</h2>
    <article className='flex flex-wrap gap-4 mt-2'>
      <div className='w-[48%] bg-slate-700 py-2 px-4 rounded-lg'>
        <h3 className='text-indigo-500 font-semibold'>Phone Number</h3>
        <p>{userProfile?.phoneNumber}</p>
      </div>
      <div className='w-[48%]  bg-slate-700 py-2 px-4 rounded-lg'>
        <h3 className='text-indigo-500 font-semibold'>Date of birth</h3>
        <p>{userProfile?.dateOfBirth}</p>
      </div>
      <div className='w-[48%]  bg-slate-700 py-2 px-4 rounded-lg'>
        <h3 className='text-indigo-500 font-semibold'>Languages
        </h3>
        <p>{userProfile?.languages}</p>
      </div>
      <div className='w-[48%]  bg-slate-700 py-2 px-4 rounded-lg'>
        <h3 className='text-indigo-500 font-semibold'>Gender</h3>
        <p>{userProfile?.gender}</p>
      </div>
      <div className='w-[100%]  bg-slate-700 py-2 px-4 rounded-lg'>
        <h3 className='text-indigo-500 font-semibold'>Address</h3>
        <p>{userProfile?.address}</p>
      </div>
    </article>
  </div>:<>
  <div className='h-[150px] w-[100%]  flex items-center justify-center flex-col space-y-3'>
    <h2>User data not present</h2>
    < NavLink to="/user-profile/update-profile" className="py-2 px-4 rounded-lg bg-blue-600">Add user data </NavLink>
  </div>
  </>
  }
</article>
{isLoading &&<Spinner/>}
    </section>
  )
}
export default UserAccount
