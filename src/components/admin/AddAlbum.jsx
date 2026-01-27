import React, { use, useState } from "react";
import toast from "react-hot-toast";
import Spinner from "../../helpers/Spinner";
import { setDoc } from "firebase/firestore";
import { __DB } from "../../backend/FirebaseConjig";
import { doc } from "firebase/firestore";
const AddAlbum = () => {
    let[isLoading,setIsLoading]=useState(false)
  
  let [album, setAlbum] = useState({
    albumTitle: "",
    albumPoster: null,
    albumReleaseDate: "",
    albumLanguages: "",
    albumDescription: "",
  });
  let {
    albumTitle,
    albumPoster,
    albumReleaseDate,
    albumLanguages,
    albumDescription,
  } = album;
  let handleAlbumChange=(e)=>{
    let value=e.target.value
    let key=e.target.name
    setAlbum({...album,[key]:value})
  }
  let handleAlbumPosterChange=(e)=>{
    let file=e.target.files[0]
    setAlbum({...album,albumPoster:file})
  }
let initialSongData={
  songName:"",
  songFile:null,
  songThumbnail:null,
  songSingers:"",
  songMood:"",
  songDirector:""
}
let[songs,setSongs]=useState([initialSongData])
let addSongs=()=>{
  setSongs([...songs,{...initialSongData}])
}
let removeSong=(ind)=>{
let newSongs=songs.filter((value,index)=>index!==ind)
setSongs(newSongs)
}
let handleSongChange=(e,index)=>{
  let value=e.target.value
  let key=e.target.name
  let copy=[...songs]
  copy[index][key]=value
  setSongs(copy)
}
let handleSongFileChange=(e,index)=>{
  let file=e.target.files[0]
  let key=e.target.name
  let copy=[...songs]
  copy[index][key]=file
  setSongs(copy)
}
  let handleSubmit= async (e)=>{
    e.preventDefault()
    setIsLoading(true)
    //console.log(album);
    try{
      

     let albumPosterData=new FormData()
     albumPosterData.append("file",albumPoster)
     albumPosterData.append("upload_preset","innovators-hub-music")
     let posterResponse=await fetch("https://api.cloudinary.com/v1_1/dovo0yjfy/image/upload",{
      method:"POST",
      body:albumPosterData
    })
    let posterResult=await posterResponse.json()
    //console.log(posterResult);
    let albumId=posterResult.asset_id;
    let albumPosterURL=posterResult.url

    let albumData={
      albumId:albumId,
      albumTitle:albumTitle,
      albumPoster:albumPosterURL,
      albumReleaseDate:albumReleaseDate,
      albumLanguages:albumLanguages,
      albumDescription:albumDescription
    }
    console.log(albumData);
    let songData=[]
    await Promise.all(songs.map(async (value,index)=>{
      console.log(value);
      
      let songThumbnailData=new FormData()
      songThumbnailData.append("file",value.songThumbnail)
      songThumbnailData.append("upload_preset","innovators-hub-music")
       let songThumbnailResponse=await fetch("https://api.cloudinary.com/v1_1/dovo0yjfy/image/upload",{
      method:"POST",
      body:songThumbnailData,
     })
     let songThumbnailResult=await songThumbnailResponse.json();

     let songThumbnailURL=songThumbnailResult.url

     let songFileData=new FormData()
     songFileData.append("file",value.songFile)
     songFileData.append("upload_preset","innovators-hub-music")
     let songFileResponse=await fetch("https://api.cloudinary.com/v1_1/dovo0yjfy/upload",{
      method:"POST",
      body:songFileData,
     })
     let songFileResult=await songFileResponse.json();
    
     
     let songFileURL=songFileResult.url
     let songFileFormat=songFileResult.format
     let songFileBytes=songFileResult.bytes
     let songFileId=songFileResult.asset_id
     let songFileDuration=songFileResult.duration
     console.log(songThumbnailURL);
     console.log(songFileURL);
     console.log(songFileFormat);
     console.log(songFileBytes);
     console.log(songFileId);
     console.log(songFileDuration);
let songPayload={
  songId:songFileId,
  songName:value.songName,
  songURL:songFileURL,
  songThumbnailURL:songThumbnailURL,
  songFormat:songFileFormat,
  songBytes:songFileBytes,
  songDuration:songFileDuration,
  songSingers:value.songSingers,
  songMood:value.songMood,
  songDirector:value.songDirector
}
songData.push(songPayload)


     }))
     let payload={...albumData,songs:songData}
     console.log(payload);
     let album_collection=doc(__DB,"album_collection",albumData.albumId)
     await setDoc(album_collection,payload)
    
    }catch(error){
      console.log(error);
      //toast.error(error)
    }finally{
      setIsLoading(false)
    }
    
  }
  return (
    <section className="h-[100%] w-[100%]  flex p-6 justify-center ">
      <article className="min-h-[800px] w-[75%] bg-slate-900 rounded-xl p-4">
        <h2 className="text-center text-2xl ">Add Album</h2>
        <form className="mt-3" onSubmit={handleSubmit}>
          <h3 className="text-xl">Album details</h3>
          <article className="mt-3 flex flex-wrap gap-3">
            <div className="flex gap-2 flex-col w-[48%]">
              <label htmlFor="albumTitle" className="block text-[18px]">
                Album title
              </label>
              <input
                type="text"
                id="albumTitle"
                placeholder="Enter album title"
                className=" block outline-none bg-white py-2 px-4 rounded-lg text-black"
                value={albumTitle}
                name="albumTitle"
                onChange={handleAlbumChange}

              />
            </div>
            <div className="flex gap-2 flex-col w-[48%]">
              <label htmlFor="albumPoster" className="block text-[18px]">
                Album Poster
              </label>
              <input
                type="file"
                id="albumPoster"
                className=" block outline-none bg-white py-2 px-4 rounded-lg text-black file:bg-slate-700 file:px-3 file:text-white
                file:rounded-sm"
                name="albumPoster"
                onChange={handleAlbumPosterChange}
              />
            </div>
            <div className="flex gap-2 flex-col w-[48%]">
              <label htmlFor="releaseDate" className="block text-[18px]">
                Release Date
              </label>
              <input
                type="date"
                id="releaseDate"
                placeholder="Enter release date"
                className=" block outline-none bg-white py-2 px-4 rounded-lg text-black"
                value={albumReleaseDate}
                name="albumReleaseDate"
                onChange={handleAlbumChange}
              />
            </div>
            <div className="flex gap-2 flex-col w-[48%]">
              <label htmlFor="languages" className="block text-[18px]">
                Languages
              </label>
              <input
                type="text"
                id="languages"
                placeholder="Enter languages"
                className=" block outline-none bg-white py-2 px-4 rounded-lg text-black"
                value={albumLanguages}
                name="albumLanguages"
                onChange={handleAlbumChange}
              />
            </div>
            <div className="flex gap-2 flex-col w-[98%]">
              <label htmlFor="albumDescription" className="block text-[18px]">
                Album description
              </label>
              <textarea
                id="albumDescription"
                placeholder="Enter album description"
                className=" block outline-none bg-white py-2 px-4 rounded-lg text-black"
                value={albumDescription}
                name="albumDescription"
                onChange={handleAlbumChange}
              />
            </div>
          </article>
          <h3 className=" mt-3 text-xl">Song Details</h3>
          <article className="mt-3 flex flex-col gap-4">
            {songs.map((value,index)=>{
              return (
                <section className="bg-slate-700 rounded-lg p-4" key={index}>
                  <h4 className="text-center text-lg">Song {index+1}</h4>
                  <main className="flex flex-wrap gap-3">
                  <div className="flex gap-2 flex-col w-[32%]">
              <label htmlFor="songName" className="block text-[18px]">
                Song Name
              </label>
              <input
                type="text"
                id="songName"
                placeholder="Enter song name"
                className=" block outline-none bg-white py-2 px-4 rounded-lg text-black"
               value={value.songName}
               name="songName"
               onChange={(e)=>handleSongChange(e,index)}
              />
            </div>
            <div className="flex gap-2 flex-col w-[32%]">
              <label htmlFor="songFile" className="block text-[18px]">
                Song File
              </label>
              {/* do not put value for type file */}
              <input
                type="file"
                id="songFile"
                className=" block outline-none bg-white py-2 px-4 rounded-lg text-black  file:bg-slate-700 file:px-3 file:text-white
                file:rounded-sm"
                name="songFile"
                onChange={(e)=>handleSongFileChange(e,index)}
              />
            </div>
            <div className="flex gap-2 flex-col w-[32%]">
              <label htmlFor="songThumbnail" className="block text-[18px]">
                Song Thumbnail
              </label>
              <input
                type="file"
                id="songThumbnail"
                className=" block outline-none bg-white py-2 px-4 rounded-lg text-black  file:bg-slate-700 file:px-3 file:text-white
                file:rounded-sm"
               name="songThumbnail"
               onChange={(e)=>handleSongFileChange(e,index)}
              />
            </div>
            <div className="flex gap-2 flex-col w-[32%]">
              <label htmlFor="singers" className="block text-[18px]">
                Singers
              </label>
              <input
                type="text"
                id="singers"
                placeholder="Enter singers"
                className=" block outline-none bg-white py-2 px-4 rounded-lg text-black"
               value={value.songSingers}
               name="songSingers"
               onChange={(e)=>handleSongChange(e,index)}
              />
            </div>
            <div className="flex gap-2 flex-col w-[32%]">
              <label htmlFor="mood" className="block text-[18px]">
                Mood
              </label>
              <input
                type="text"
                id="mood"
                placeholder="Enter mood"
                className=" block outline-none bg-white py-2 px-4 rounded-lg text-black"
               value={value.songMood}
               name="songMood"
               onChange={(e)=>handleSongChange(e,index)}
              />
            </div>
            <div className="flex gap-2 flex-col w-[32%]">
              <label htmlFor="director" className="block text-[18px]">
                Director
              </label>
              <input
                type="text"
                id="director"
                placeholder="Enter director"
                className=" block outline-none bg-white py-2 px-4 rounded-lg text-black"
                value={value.songDirector}
                name="songDirector"
                onChange={(e)=>handleSongChange(e,index)}
              />
            </div>
            <div className="justify-between flex w-[100%]">
              
                
                  <div>
                    {songs.length - 1 ===index &&(
                  <input type="button" value="Add Song" className="py-2 px-4 bg-green-500 rounded-lg cursor-pointer" onClick={addSongs}/>)}
                  </div>
                
                <div>
                  {songs.length>1 &&(
                <input type="button" value="Remove Song" className="py-2 px-4 bg-red-500 rounded-lg cursor-pointer" onClick={()=>removeSong(index)}/>)}
                </div>
              </div>
          

                  </main>
                </section>
              )
            })}
          </article>
          <button className="w-[98%] py-2 cursor-pointer bg-blue-600 mt-3 rounded-lg">
            Upload Album
          </button>
        </form>
      </article>
      {isLoading && <Spinner/>}

    </section>
    
          )
        
  
};

export default AddAlbum;
