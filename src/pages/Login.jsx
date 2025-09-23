import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // <- ye import karo
import '../styles/Login.css';

export default function Login() {
    const [form, setForm] = useState({
        email: "",
        password: ""
    });

    const navigate = useNavigate(); // <- useNavigate hook initialize

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const res = await axios.post(
                'http://localhost:3000/api/auth/login',
                form,
                { withCredentials: true }
            );
            console.log('Response:', res.data);

            alert('Login Successful!');
            navigate('/admin'); // <- login ke baad dashboard par navigate
        } catch (error) {
            console.error('Error:', error.response?.data || error.message);
            alert(error.response?.data?.message || 'Something went wrong');
        }
    };

    return (
        <div>
            <h1>Login Page</h1>
            <div className="login-box">
                <form className='login-form' onSubmit={handleSubmit}>
                    <input 
                        name='email' 
                        onChange={handleChange} 
                        value={form.email} 
                        type="email" 
                        placeholder='Enter Your Email' 
                        required
                    />
                    <input 
                        name='password' 
                        onChange={handleChange} 
                        value={form.password} 
                        type="password" 
                        placeholder='Enter Your Password' 
                        required
                    />
                    <input type="submit" value='Login' />
                </form>
            </div>
        </div>
    )
}
