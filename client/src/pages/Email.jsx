import React, { useState } from 'react';
import emailjs from '@emailjs/browser';
import { Link } from 'react-router-dom';
import { links } from '../Data/profile';
import Starfield from '../components/Starfield.jsx';

const env = import.meta.env;
const emailjsReady = Boolean(env.VITE_APP_EMAILJS_SERVICE_ID && env.VITE_APP_EMAILJS_TEMPLATE_ID && env.VITE_APP_EMAILJS_PUBLIC_KEY);

const Email = () => {
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState(null);

  const handleChange = ({ target: { name, value } }) => {
    setForm({ ...form, [name]: value });
    setErrors({ ...errors, [name]: '' });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!form.name.trim()) newErrors.name = 'Name is required';
    if (!form.email.trim()) newErrors.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) newErrors.email = 'Invalid email address';
    if (!form.message.trim()) newErrors.message = 'Message is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSend = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    // No EmailJS keys configured: hand off to the visitor's mail client instead of failing silently.
    if (!emailjsReady) {
      const subject = encodeURIComponent(`Hello from ${form.name}`);
      const body = encodeURIComponent(`${form.message}\n\n${form.name} (${form.email})`);
      window.location.href = `mailto:${links.email}?subject=${subject}&body=${body}`;
      return;
    }

    setLoading(true);
    setStatus(null);
    try {
      await emailjs.send(
        env.VITE_APP_EMAILJS_SERVICE_ID,
        env.VITE_APP_EMAILJS_TEMPLATE_ID,
        { from_name: form.name, to_name: 'Mradul', from_email: form.email, to_email: links.email, message: form.message },
        env.VITE_APP_EMAILJS_PUBLIC_KEY
      );
      setForm({ name: '', email: '', message: '' });
      setStatus({ ok: true, msg: 'Sent. Thanks for reaching out, I will get back to you soon.' });
    } catch (err) {
      console.error('EmailJS error:', err);
      setStatus({ ok: false, msg: `Could not send. Please email ${links.email} directly.` });
    } finally {
      setLoading(false);
    }
  };

  const inputCls = (field) =>
    `border-[1px] w-[90%] border-purple-600 bg-purple-950 mx-10 font-inter font-semibold text-[0.75rem] py-2 px-2 rounded-xl text-white ${
      errors[field] ? 'border-red-500' : ''
    }`;

  return (
    <div className="relative bg-black min-h-screen w-screen flex flex-col justify-center items-center">
      <Starfield />
      <div className="relative z-10 flex flex-col text-white font-inter font-semibold items-center bg-gray-950/90 backdrop-blur-sm w-[90vw] max-w-[400px] py-6 border-[1px] border-purple-500 rounded-md">
        <div className="mb-8 self-start ml-4 flex w-[92%] justify-between items-center">
          <span>CRAFT A MAIL</span>
          <Link to={'/'} className="text-xs border-[1.6px] border-white px-3 py-[2px] rounded-lg">
            Back
          </Link>
        </div>
        <form className="flex flex-col w-full items-center" onSubmit={handleSend} noValidate>
          <input onChange={handleChange} value={form.name} className={inputCls('name')} type="text" name="name" placeholder="Your Name" autoComplete="name" />
          <span className="text-red-500 text-xs h-5 mt-1">{errors.name}</span>
          <input onChange={handleChange} value={form.email} className={inputCls('email')} type="email" name="email" placeholder="Your Email" autoComplete="email" />
          <span className="text-red-500 text-xs h-5 mt-1">{errors.email}</span>
          <textarea onChange={handleChange} value={form.message} className={inputCls('message')} name="message" rows={6} placeholder="Message..." />
          <span className="text-red-500 text-xs h-5 mt-1">{errors.message}</span>
          <button type="submit" disabled={loading} className="text-xs border-[1.5px] py-1 rounded-md min-w-[100px] mt-2 disabled:opacity-60 hover:bg-purple-900">
            {loading ? 'Sending...' : 'Send'}
          </button>
          {status && <p className={`mt-4 text-xs text-center px-4 ${status.ok ? 'text-green-400' : 'text-red-400'}`}>{status.msg}</p>}
        </form>
      </div>
      <a href={`mailto:${links.email}`} className="relative z-10 mt-6 text-xs text-gray-400 hover:text-white font-inter">
        or write to {links.email}
      </a>
    </div>
  );
};

export default Email;
