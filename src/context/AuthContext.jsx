//making my content global
import { onAuthStateChanged } from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import { __AUTH } from "../backend/FirebaseConjig";

export const AuthContextAPI=createContext()

const AuthProvider=(props)=>{
let[authUser,setAuthUser]=useState(null)
//in userinfo we have ? which means optional chaining,it will check if the data is present ,if it is there it checks dot otherwise 
//it will go to else block ie,if the user is not present..
useEffect(()=>{
    onAuthStateChanged(__AUTH,(userInfo)=>{
        console.log(userInfo);
        if(userInfo?.emailVerified===true){
            setAuthUser(userInfo)
            window.localStorage.setItem("TOKEN",userInfo.accessToken);
        }else{
            setAuthUser(null)
            window.localStorage.removeItem("TOKEN")
        }
      })
},[__AUTH])
return(
<AuthContextAPI.Provider value={{authUser,setAuthUser}}>
     {props.children}
</AuthContextAPI.Provider>
)}
export default AuthProvider