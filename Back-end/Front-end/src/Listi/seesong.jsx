import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const Seesong = () => {
    const id = localStorage.getItem('id');
    const { query } = useParams();
    const [play, setPlay] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.post(`${window.location.origin}/playlist/seesong/getuserplaylistsongs`, { query, id });
                setPlay(prevPlay => [...prevPlay, ...response.data.playlist]);
            } catch (error) {
                console.error('Error fetching playlist songs:', error);
            }
        };

        fetchData();
    }, [id, query]); 

   async  function Handlegetid(){
   await axios.post(`${window.location.origin}/playlist/seesong/getpidc`,{id,query})
   .then(res=>{
    alert(res.data);

   })
   .catch(err=>{
    console.log(err);
   })
   }

    

    return (
        <>
        <div className="seesong-container">
            <h2>{query} Playlist</h2>
            <div className="playlist-items">
                {
                    play.map((ele, index) => (
                        <div className="playlist-item" key={index}>{ele}</div>
                    ))
                }
            </div>
            <button className='playlist-item-button' onClick={Handlegetid}>Get ID</button>
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

export default Seesong;
