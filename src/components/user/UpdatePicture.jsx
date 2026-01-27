import React, { useContext, useState } from "react";
import toast from "react-hot-toast";
import { AuthContextAPI } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import Spinner from "../../helpers/Spinner";
import { updateProfile } from "firebase/auth";

const UpdatePicture = () => {
  let [picture, setPicture] = useState(null);
  let [preview, setPreview] = useState(null);
  let{authUser}=useContext(AuthContextAPI)
  let navigate=useNavigate()
  let[isLoading,setIsLoading]=useState(false)
  const handleChange = (e) => {
    //console.dir(e.target.files[0]);
    let file = e.target.files[0];
    setPicture(file);

    if (file) {
      let url = URL.createObjectURL(file);
      console.log(url);
      setPreview(url);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try{
      setIsLoading(true)
    if(!picture){
      toast.error("Select a photo")
      return;
    }else{
      const data=new FormData()
      data.append("file",picture)
      data.append("upload_preset","innovators-hub-music")
      let response=await fetch("https://api.cloudinary.com/v1_1/dovo0yjfy/image/upload",{
        method:"POST",
        body:data
      })
      let result= await response.json()
      console.log(result);
      await updateProfile(authUser,{
        photoURL:result.url
      })
      toast.success("photo is successfully updated")
      navigate("/user-profile")
    }
    }catch(error){
      toast.error(error.message)
    }finally{
      setIsLoading(false)
    }
         
  };
  return (
    <section className="h-[100%] w-[100%]  flex items-center justify-center ">
      <article className="min-h-[300px] w-[40%] bg-slate-900 rounded-xl p-4">
        <h2 className="text-center text-2xl ">Upload profile picture</h2>
        <div className="w-32 h-32 m-auto bg-gray-800 rounded-full">
          {preview ? (
            <img
              src={preview}
              alt=""
              className="h-[100%] w-[100%] rounded-full mt-5"
            />
          ) : (
            <div className="h-[100%] w-[100%] rounded-full flex items-center justify-center">
              No file selected
            </div>
          )}
        </div>
        <form className="flex flex-col gap-4 mt-12" onSubmit={handleSubmit}>
          <label
            htmlFor="picture"
            className="block py-2 w-[100%]  text-center rounded-lg border-2 border-dotted"
            accept="image/*"
          >
            Select a photo
          </label>
          <input
            type="file"
            id="picture"
            className="hidden"
            onChange={handleChange}
            name="picture"
          />
          <button className="py-2 w-[100%] bg-blue-600 rounded-lg cursor-pointer hover:bg-blue-400 ">
            Upload Photo{" "}
          </button>
        </form>{" "}
      </article>
      {isLoading && <Spinner/>}
    </section>
  );
};

export default UpdatePicture;
