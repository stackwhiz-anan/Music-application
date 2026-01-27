import React from 'react'
import { NavLink } from 'react-router-dom'
import { MdDashboardCustomize } from "react-icons/md";
import { PiMusicNotesFill } from "react-icons/pi";
const Sidebar = () => {
  return (
    <div className='h-[calc(100vh-70px)] sticky top-[70px]  w-[18%] bg-slate-900 px-4 py-8 flex flex-col shrink-0'>
    <ul className='space-y-4'>
    <li>
            <NavLink  to="/" end
                        className={(obj) => {
                          let { isActive } = obj;
                          return `py-2 px-4 rounded-lg cursor-pointer flex items-center w-[100%] gap-2 text-lg hover:bg-blue-800 ${
                            isActive && "bg-blue-600"
                          }`;
                        }}>
                      <MdDashboardCustomize  className='size-6'/>Dashboard
                      </NavLink></li>
            
                    
    </ul>
</div>
  )
}

export default Sidebar