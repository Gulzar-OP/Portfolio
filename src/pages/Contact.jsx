import React, { useState } from 'react';
import axios from 'axios';
import '../styles/Contact.css';

export default function Contact() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  const handleChange = e => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setSuccess('');
    setError('');

    const URI = import.meta.env.VITE_API_URL || 'http://localhost:3000';
    try {
      const res = await axios.post(
        `${URI}/api/send/mail`,
        form,
        {
          headers: { 'Content-Type': 'application/json' },
          withCredentials: true
        }
      );
      if (res.data.success) {
        setSuccess(res.data.message);
        setForm({ name: '', email: '', phone: '', message: '' });
      } else {
        setError(res.data.message || 'Something went wrong');
      }
    } catch (err) {
      console.error(err);
      setError('Server Error: Could not send message');
    }
  };

  return (
    <div className="contact-page">
      <h1>Hire Me / Contact</h1>
      <p>If you like my work, drop me a message below!</p>
      <form className="contact-form" onSubmit={handleSubmit}>
        <label>
          Name:
          <input type="text" name="name" value={form.name} onChange={handleChange} required />
        </label>
        <label>
          Email:
          <input type="email" name="email" value={form.email} onChange={handleChange} required />
        </label>
        <label>
          Phone:
          <input type="tel" name="phone" value={form.phone} onChange={handleChange} />
        </label>
        <label>
          Message:
          <textarea name="message" value={form.message} onChange={handleChange} required />
        </label>
        <button type="submit">Send Message</button>
      </form>
      {success && <p className="success-message">{success}</p>}
      {error && <p className="error-message">{error}</p>}
    </div>
  );
}
