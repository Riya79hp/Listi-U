import React from 'react';
import musicnames from './music_storage.json';
import { Link, useParams } from 'react-router-dom';

import axios from 'axios';
const Musicplus = () => {
    const { query } = useParams();
    console.log(query);
    function HandleClick(name){
       const id=localStorage.getItem('id');
        axios.patch(`${window.location.origin}/playlist/musicplus/addsong/`+ query,{name,id})
        .then((res)=>{
            alert(res.data.message);
        })


    }
    return (
        <div className='Music_Storage'>
            {musicnames.map((ele, index) => {
                return (
                    <div className='Music_element' key={ele.Name}>
                        <button>
                            <i className="fa-solid fa-circle-play"></i>
                        </button>
                        <div className='image-div-song'>
                            <img src={ele.src} style={{ width: '100%', height: '100%', backgroundSize: 'cover' }} alt={ele.Name} />
                        </div>
                        <div>
                            <h3>{ele.Name}</h3>
                            <h5>{ele.Artist}</h5>
                        </div>
                        <button onClick={()=>HandleClick(ele.Name)}>
                            +
                        </button>
                        <p>{ele.Duration}</p>
                    </div>
                );
            })}
              <footer style={{ background: '#5C5D67', color: 'white', textAlign: 'center', padding: '20px 0', marginTop: '20px' }}>
                                 <p style={{ margin: '0', fontSize: '16px' }}>&copy; 2024 Listi. All Rights Reserved.</p>
                                 <div style={{ marginTop: '10px' }}>
                                   <Link to="#" style={{ color: 'white', textDecoration: 'none', margin: '0 15px' }}>About</Link>
                                   <Link to="#" style={{ color: 'white', textDecoration: 'none', margin: '0 15px' }}>Contact</Link>
                                   <Link to="#" style={{ color: 'white', textDecoration: 'none', margin: '0 15px' }}>Privacy Policy</Link>
                                 </div>
                               </footer>
        </div>
    );
};

export default Musicplus;
