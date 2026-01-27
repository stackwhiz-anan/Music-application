import React from 'react'
import { NavLink } from 'react-router-dom'
import { MdAccountCircle } from "react-icons/md";
import { GrDocumentUser } from "react-icons/gr";
import { FaUserEdit } from "react-icons/fa";
import { TbPasswordUser } from "react-icons/tb";
import { TiUserDelete } from "react-icons/ti"
const UserSidebar = () => {
  return (
    <div className='h-[100%] w-[18%] bg-slate-600 px-4 py-8 flex flex-col shrink-0'>
        <ul className='space-y-4'>
        <li>
                <NavLink  to="/user-profile" end
                            className={(obj) => {
                              let { isActive } = obj;
                              return `py-2 px-4 rounded-lg cursor-pointer flex items-center w-[100%] gap-2 text-lg hover:bg-blue-800 ${
                                isActive && "bg-blue-600"
                              }`;
                            }}>
                          <MdAccountCircle className='size-6'/>My Account
                          </NavLink></li>
                   <li>       <NavLink  to="/user-profile/update-picture"
                   className={(obj) => {
                    let { isActive } = obj;
                    return `py-2 px-4 rounded-lg cursor-pointer flex items-center w-[100%]  gap-2 text-lg hover:bg-blue-800 ${
                      isActive && "bg-blue-600"
                    }`;
                  }}
                           >
                          <GrDocumentUser className='size-6'/>Update picture
                          </NavLink> </li>
                          <li>       <NavLink  to="/user-profile/update-profile"
                            className={(obj) => {
                              let { isActive } = obj;
                              return `py-2 px-4 rounded-lg cursor-pointer flex w-[100%] items-center gap-2 text-lg hover:bg-blue-800 ${
                                isActive && "bg-blue-600"
                              }`;
                            }}>
                         <FaUserEdit className='size-6' /> Update profile
                          </NavLink></li>
                          <li>       <NavLink  to="/user-profile/update-password"
                           className={(obj) => {
                            let { isActive } = obj;
                            return `py-2 px-4 rounded-lg cursor-pointer flex w-[100%] items-center gap-2 text-lg hover:bg-blue-800 ${
                              isActive && "bg-blue-600"
                            }`;
                          }}>
                         <TbPasswordUser className='size-6' />Update password
                          </NavLink></li>

                          <li>       <NavLink  to="/user-profile/delete-account"
                           className={(obj) => {
                            let { isActive } = obj;
                            return `py-2 px-4 rounded-lg cursor-pointer flex w-[100%] items-center gap-2 text-lg hover:bg-red-800 ${
                              isActive && "bg-red-600"
                            }`;
                          }}>
                         <TiUserDelete className='size-6' />Delete Account
                          </NavLink></li>
            
               
        </ul>
    </div>
  )
}

export default UserSidebar