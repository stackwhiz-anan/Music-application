import React from 'react'
import { useLocation } from 'react-router-dom'
import { AlbumContextAPI } from '../../context/AlbumContext'
import { useContext } from 'react'
const AlbumDetails = () => {
    let data=useLocation()
    let {state:{album}}=data //nested destructuring
    let {songs,setSongs,isPlaying,setIsPlaying,currentSongIndex,setCurrentSongIndex}=useContext(AlbumContextAPI)

    let handleClick=(index)=>{
        setSongs(album.songs)
        setCurrentSongIndex(index)
        if(currentSongIndex===index){
            setIsPlaying(!isPlaying)
        }else{
            setIsPlaying(true)
        }
    }

  const formatduration=(durationInSeconds)=>{
    let minutes=Math.floor((durationInSeconds/60))
    let seconds=Math.floor((durationInSeconds%60))
    return`${minutes}:${seconds.toString().padStart(2,'0')}`
  }
  return (
    <section className='p-6'>
        <article className='flex gap-8'>
            <aside className='shrink-0'>
            <img src={album.albumPoster} alt="" className='h-[370px] w-[310px] rounded-md' />
            </aside>
            <aside>
                <h2 className='text-3xl'>{album.albumTitle}</h2>
                <ul className='mt-4 flex flex-col gap-3 text-lg'>
                    <li className='flex'>
                        <span className='w-[180px]'>Title</span>
                        <span>{album.albumTitle}</span>
                    </li>
                    <li className='flex'>
                        <span className='w-[180px]'>Number of tracks</span>
                        <span>{album.songs.length}</span>
                    </li>
                    <li className='flex'>
                        <span className='w-[180px]'>Release Date</span>
                        <span>{album.albumReleaseDate}</span>
                    </li>
                    <li className='flex'>
                        <span className='w-[180px]'>Languages</span>
                        <span>{album.albumLanguages}</span>
                    </li>
                    <li className='flex'>
                        <span className='w-[180px] shrink-0 '>Description</span>
                        <span>{album.albumDescription}</span>
                    </li>
                </ul>
            </aside>
        </article>
        <main className={`p-2 mt-4 bg-slate-900 rounded-lg text-xl ${currentSongIndex!==null &&"mb-[120px]"}`} >
        <h3 className='px-4 text-xl mt-4'>Songs List</h3>
        <table className='w-full mt-4 text-left rounded-lg overflow'>
         <thead className='w-full uppercase bg-slate-700 rounded-full'>
            <tr>
                <th className='px-4 py-3'></th>
                <th className='p-2'>Track</th>
                <th className='p-3 text-center '>Song Name</th>
                <th className='p-3 text-center'>Singers</th>
                <th className='p-3 text-center'>Director</th>
                <th className='p-3 text-center'>Mood</th>
                <th className='p-3 text-center'>Duration</th>
            </tr>
            </thead>
<tbody className='w-full'>
      {album.songs.map((song,index)=>{
       return <tr className='border-y-2 border-slate-700 hover:border-slate-500 cursor-pointer' onClick={()=>handleClick(index)}>
        <td className='py-2 text-center'>{index+1}</td>
<td className='py-2 text-center'>
    <img src={song.songThumbnailURL} className='h-12 w-[70%] rounded-lg' alt="" />
</td>
<td className='py-2 text-center'>
    {song.songName}
</td>
<td className='py-2 text-center'>
    {song.songSingers}
</td>
<td className='py-2 text-center'>
    {song.songDirector}
</td>
<td className='py-2 text-center'>
    {song.songMood}
</td>
<td className='py-2 text-center'>
    {formatduration(song.songDuration)}
</td>
       </tr>
       
      })}
</tbody>
              
        </table>
        </main>
    </section>
  )
}

export default AlbumDetails