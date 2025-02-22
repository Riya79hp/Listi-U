import React from 'react';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import musicnames from './music_storage.json';
import axios from 'axios';

function SearchResult() {
  const { query } = useParams();

  const [Play,setplay]=useState(['','','','','']);
  const [heart, setHeart] = useState(Array(musicnames.length).fill("fa-regular fa-heart"));
  var [likedsongs,setlikedsongs]=useState([]);

  const [r,setr]=useState([]);
  function Handleclick(Name,Src,Artist){
    setplay([Name,Src,Artist])

    if(query==''){
      return <div>nothing provided</div>
    }

    
    
  }
  async function Handleheart(name) {
    const id = localStorage.getItem('id');
    console.log(id);
    if (!id) {
      alert('You haven\'t logged in. Please log in to continue.');
      return;
    }
  
    try {
      const res = await axios.post(`${window.location.origin}/findinheart`, { id });
      if (res.data.result === 'Exist') {
        const index = musicnames.findIndex(ele => ele.Name === name);
        const Element = musicnames.find(ele => ele.Name === name);
  
        const updatedHeart = [...heart];
        updatedHeart[index] = updatedHeart[index] === "fa-regular fa-heart" ? "fa-solid fa-heart" : "fa-regular fa-heart";
        setHeart(updatedHeart);
  
        const updatedLikedsongs = [...res.data.likedsongs, Element.Name]; 
        setlikedsongs(updatedLikedsongs);
  
        await axios.patch(`${window.location.origin}/myacc/like/`+ id, { likedsongs: updatedLikedsongs });
      } else {
        alert('You haven\'t logged in. Please log in to continue.');
      }
    } catch (error) {
      console.error(error);
     
    }
  }
  async function HandlePlaylist(name){
    const id=localStorage.getItem('id');
   
    try {
      
      let res = await axios.post(`${window.location.origin}/playlist/musicplus/addsong/search/getplaylist`, { id });
      console.log(res.data);
      setr(res.data.playlist);
      console.log(r);
      
      let v = prompt('Which playlist do you want to put it in? \n' + r);
  
     
      if (v === null || v.trim() === '') {
          alert('Please specify a valid playlist');
      } else {

          let response = await axios.patch(`${window.location.origin}/playlist/musicplus/addsong/` + v, { name, id });
          alert(response.data.message);
      }
  } catch (error) {
      console.error('Error occurred:', error);
  }
}
  
  return (
    <>
      <div className='Music_Storage'>
   { 
   musicnames.map((ele,index)=>{
    if (
        ele.Name.toUpperCase().includes(query.toUpperCase()) ||
        ele.Artist.toUpperCase().includes(query.toUpperCase())
      ){
        return (
            <div className='Music_element'>
              <button onClick={()=>{Handleclick(ele.Name,ele.src,ele.Artist)}}><i class="fa-solid fa-circle-play"></i></button>
              <div className='image-div-song'><img src={ele.src} style={{width:'100%',height:'100%',backgroundSize:'cover'}}></img></div>
              <div>
              <h3>{ele.Name}</h3>
              <h5>{ele.Artist}</h5>
             </div>
             <button onClick={() => { Handleheart(ele.Name) }}>
                <i className={heart[index]} style={{ fontSize: '16px' }}></i>
              </button>
              <button onClick={()=>HandlePlaylist(ele.Name)}>
                            +
              </button>
             <p>{ele.Duration}</p>
            </div>

        )
    }

    

        })
       
        
        
        }
        </div>
      <div className='now-playing'>
      <div className='now-playing-img-div'><img src={Play[1]} style={{width:'100%',height:'100%',backgroundSize:'cover'}}></img></div>
      <div>{Play[0]}</div>
      <div  className='playingdivwrap'>
      <div className='playdiv'>
      <i class="fas fa-step-backward"></i> <i class="fa-solid fa-pause"></i><i class="fas fa-step-forward"></i></div>
      <p style={{alignSelf:'center'}}>Now playing</p>
      </div>
      <div>{Play[2]}</div>
     
    </div>
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
}

export default SearchResult;
