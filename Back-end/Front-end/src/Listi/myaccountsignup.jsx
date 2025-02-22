import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';

const SignUp = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const navigate = useNavigate();

  const handleSignUp = (e) => {
    e.preventDefault();
    localStorage.setItem('id', '');
   
    axios.post(`${window.location.origin}/myacc/signup`, { username, password, email })
      .then((res) => {
        console.log('Response received:', res);
        const userid = res.data.id;
        localStorage.setItem('id', userid);
        localStorage.setItem('token',res.data.token);
        navigate(`/myacc/${userid}`);
      })
      .catch((error) => {
        console.error('Error during signup:', error);
        alert('Email already exists, please go to login');
      });
  };

  return (
    <>
    <div className="signup-container">
      <form onSubmit={handleSignUp} className="signup-form">
        <h2 className="signup-heading">Sign Up</h2>
        <div className="input-group">
          <label htmlFor="username" className="signup-label">Username</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="signup-input"
            required
          />
        </div>
        <div className="input-group">
          <label htmlFor="password" className="signup-label">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="signup-input"
            required
          />
        </div>
        <div className="input-group">
          <label htmlFor="email" className="signup-label">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="signup-input"
            required
          />
        </div>
        <button type="submit" className="signup-button">Sign Up</button>
      </form>
      
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

export default SignUp;
