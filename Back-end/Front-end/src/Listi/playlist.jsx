import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Playlist = () => {
    const [play, setPlay] = useState([]);
    const [playc,setplayc]=useState([]);
    const navigate = useNavigate();
    const id = localStorage.getItem('id');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.post(`${window.location.origin}/playlist/getuserplaylist`, { id });
                const playlistcollabarte = response.data.playlistcollabrate;
                const playlistsingle = response.data.playlistsingle;
              
                
                if (playlistsingle.length > 0) {
                    setPlay(prevPlay => [...prevPlay, ...playlistsingle]);
                }
    
                if (playlistcollabarte.length > 0) {
                    setplayc(prevplay => [...prevplay, ...playlistcollabarte]);
                }
            } catch (error) {
                console.error('Error fetching playlist:', error);
            }
        };
    
        if (id) {
            fetchData();
        }
    }, [id]);
    

    const handleClick = () => {
        if (!id) {
            alert('Please login to continue');
        } else {
            let name = prompt('Enter the playlist name', 'Happiness');
            if (name === null) {
                return;
            }
            if (name !== '') {
                setPlay(prevPlay => [...prevPlay, name]);
            }
        }
    };

    const handlePlaylistNameDiv = (name) => {
        navigate(`/playlist/Musicplus/${name}`);
        
    };
   function handleseesong(name){
        navigate(`/playlist/seesongs/${name}`);
    }

   async function handleClickC(){
       var choice= window.confirm('Click OK to send request CANCEL to see request');
       if(choice){
        var pid=window.prompt('Type the playlist id given by your friend');

        if(pid){
           await axios.post(`${window.location.origin}/playlist/sendreq`,{pid:pid,uid:id})
           .then((res)=>{
           alert(res.data);
           })
          .catch(err=>{
            alert('Playlist doesnt exist',err);
          })
        }
       }
       else{
        navigate('/playlist/seereq');
       }
        
    }
    

    return (
        <>
            <div className='playlist-div'>
                <h>Create Playlist</h>
                <button onClick={handleClick}><i className="fa-solid fa-plus" style={{ color: '#5C5D67' }}></i></button>
            </div>
            {play.map((playlist, index) => (
                <div className='playlistname-div' key={index}>
                    <button onClick={()=>{handleseesong(playlist)}}>See songs</button>
                    {playlist}
                    <button onClick={() => handlePlaylistNameDiv(playlist)}>Add Songs</button>
                </div>
            ))}
            <div className='playlist-div-c'>
                <h>Create Collabrative Playlist</h>
                <button onClick={handleClickC}><i className="fa-solid fa-plus" style={{ color: '#5C5D67' }}></i></button>
              
            </div>
            {playc.map((playlist, index) => (
                <div className='playlistname-div' key={index}>
                    <button onClick={()=>{handleseesong(playlist)}}>See songs</button>
                    {playlist}
                    <button onClick={() => handlePlaylistNameDiv(playlist)}>Add Songs</button>
                </div>
            ))}
             <footer style={{ background: '#5C5D67', color: 'white', textAlign: 'center', padding: '20px 0', marginTop: '20px' }}>
                                <p style={{ margin: '0', fontSize: '16px' }}>&copy; 2024 Listi. All Rights Reserved.</p>
                                <div style={{ marginTop: '10px' }}>
                                  <Link to="#" style={{ color: 'white', textDecoration: 'none', margin: '0 15px' }}>About</Link>
                                  <Link to="#" style={{ color: 'white', textDecoration: 'none', margin: '0 15px' }}>Contact</Link>
                                  <Link to="#" style={{ color: 'white', textDecoration: 'none', margin: '0 15px' }}>Privacy Policy</Link>
                                </div>
                              </footer>
        </>
    );
};

export default Playlist;
