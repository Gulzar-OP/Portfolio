import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom'; // <- Link import karna zaruri hai
import '../styles/Register.css';
import Login from './Login';

export default function Register() {
    const navigate = useNavigate(); // registration ke baad redirect ke liye

    const [form, setForm] = useState({
        name: "",
        email: "",
        password: ""
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const res = await axios.post(
                'http://localhost:3000/api/auth/register',
                form,
                { withCredentials: true }
            );
            console.log('Response:', res.data);
            alert('User Registered Successfully');
            navigate('/login'); // register ke baad login page
        } catch (error) {
            console.error('Error:', error.response?.data || error.message);
            alert(error.response?.data?.message || 'Something went wrong');
        }
    };

    return (
        <>
            <div className="register-container">
                <h1>Register Page</h1>
                <div className="box">
                    <form onSubmit={handleSubmit} className='register-form'>
                        <input
                            name='name'
                            type="text"
                            onChange={handleChange}
                            placeholder='Enter Your Name'
                            value={form.name}
                            required
                        />
                        <input
                            name='email'
                            type="email"
                            onChange={handleChange}
                            placeholder='Enter Your Email'
                            value={form.email}
                            required
                        />
                        <input
                            name='password'
                            type="password"
                            onChange={handleChange}
                            placeholder='Enter Your Password'
                            value={form.password}
                            required
                        />

                        <p>
                            Already a user?{' '}
                            <Link to="/login" style={{ color: 'blue', textDecoration: 'underline' }}>
                                Login
                            </Link>
                        </p>

                        <input type="submit" value='Register' />
                    </form>
                </div>
            </div>
        </>
    );
}
