import React, { useContext, useState } from 'react';
import axios from 'axios';
import { AuthContext } from '../contexts/AuthContext';

export const Login = () => {
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const {setLoggedin}=useContext(AuthContext);
    
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response=await axios({
                method: 'post',
                url: 'https://eventhive-62am.onrender.com/api/login',
                data: {
                  username: name,
                  password: password
                },
                withCredentials: true
              });
                setLoggedin(true);
                setError('');
                alert("Logged in successfully");
            alert("loggedin");
        } catch (error) {
            setError('Login failed. Please check your credentials and try again.');
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <label htmlFor="name">UserName</label>
                <input
                    type="text"
                    id='name'
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                <label htmlFor="password">Password</label>
                <input
                    type="password"
                    id='password'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button type='submit'>Submit</button>
            </form>
            {error && <p>{error}</p>}
        </div>
    );
};
