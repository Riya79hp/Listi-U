import React, { useEffect, useState } from 'react';
import axios from 'axios';

import { Link } from 'react-router-dom';
const Seereq = () => {
    const id = localStorage.getItem('id');
    const [cuser, setCuser] = useState([]);

    useEffect(() => {
        const fetchRequests = async () => {
            if (id) {
                try {
                    const res = await axios.post(`${window.location.origin}/playlist/seereq`, { id });
                    setCuser(res.data);
                } catch (error) {
                    console.error('Error fetching requests:', error);
                }
            } else {
                console.error('No ID found in localStorage');
            }
        };

        fetchRequests();
    }, [id]);

    async function Handleaccept(id1sender, playlistid) {
        console.log(id1sender,playlistid)
        try {
            
            const res = await axios.post(`${window.location.origin}/playlist/seereq/accept`, { id1sender, playlistid });
            if (res.data === 'Success') {
                setCuser(prevCuser =>
                    prevCuser.filter(ele => !(ele.id1sender === id1sender && ele.playlistid === playlistid))
                );
            } else {
                alert(res.data);
            }
        } catch (error) {
            console.error('Error accepting request:', error);
            alert('An error occurred while accepting the request.');
        }
    }

    async function Handlereject(id1sender, playlistid) {
        try {
            const res = await axios.post(`${window.location.origin}/playlist/seereq/reject`, { id1sender, playlistid });
            if (res.data.message === 'Request rejected successfully') {
                setCuser(prevCuser =>
                    prevCuser.filter(ele => !(ele.id1sender === id1sender && ele.playlistid === playlistid))
                );
                alert('Request rejected');
            } else {
                alert(res.data.message);
            }
        } catch (error) {
            console.error('Error rejecting request:', error);
            alert('An error occurred while rejecting the request.');
        }
    }
    

    return (
        <>
        <div className="seereq-container">
            {cuser.length > 0 ? (
                cuser.map((ele, index) => (
                    <div className="seereq-notification" key={index}>
                        <li className="seereq-text">
                            <span className="seereq-username">{ele.usernameofrequest}</span>
                            {" sent a request to collaborate on "}
                            <span className="seereq-playlist">{ele.playlistname}</span>
                        </li>
                        <div className="seereq-buttons">
                            <button className="seereq-button accept" onClick={() => Handleaccept(ele.id1sender, ele.playlistid)}>Accept</button>
                            <button className="seereq-button reject" onClick={() =>Handlereject(ele.id1sender, ele.playlistid)}>Reject</button>
                        </div>
                    </div>
                ))
            ) : (
                <p>No requests available.</p>
            )}
            
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
};

export default Seereq;
