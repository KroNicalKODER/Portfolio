import React, { useState } from 'react';
import emailjs from '@emailjs/browser';

const Email = () => {
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState({});

  const handleChange = ({ target: { name, value } }) => {
    setForm({ ...form, [name]: value });
    setErrors({ ...errors, [name]: '' });
  }

  const validateForm = () => {
    const newErrors = {};
    if (!form.name.trim()) {
      newErrors.name = 'Name is required';
    }
    if (!form.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      newErrors.email = 'Invalid email address';
    }
    if (!form.message.trim()) {
      newErrors.message = 'Message is required';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  const handleSend = (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setLoading(true);

    emailjs.send(
      import.meta.env.VITE_APP_EMAILJS_SERVICE_ID,
      import.meta.env.VITE_APP_EMAILJS_TEMPLATE_ID,
      {
        from_name: form.name,
        to_name: "Mradul-P",
        from_email: form.email,
        to_email: "mradul18varshney@gmail.com",
        message: form.message,
      },
      import.meta.env.VITE_APP_EMAILJS_PUBLIC_KEY
    ).then(() => {
      setLoading(false);
      alert("Email Sent Successfully. Thank You for contacting.");
      setForm({ name: "", email: "", message: "" });
    }).catch((err) => {
      console.log("Error: ", err);
    })
  }

  return (
    <div className='bg-black h-screen w-screen flex justify-center items-center'>
      <div className='flex flex-col text-white font-inter font-semibold items-center bg-gray-950 h-[500px] max-w-[400px] border-[1px] border-purple-500 rounded-md'>
        <div className='mt-4 mb-10 self-start ml-4'>
          CRAFT A MAIL
        </div>
        <form className='flex flex-col w-full items-center' action="">
          <input
            required
            onChange={handleChange}
            value={form.name}
            className={`border-[1px] w-[90%] border-purple-600 bg-purple-950 mx-10 font-inter font-semibold text-[0.75rem] py-2 px-2 rounded-xl text-white ${errors.name && 'border-red-500'}`}
            type="text"
            name="name"
            id="name"
            placeholder='Your Name' /><br />
          {errors.name && <span className="text-red-500">{errors.name}</span>}
          <input
            required
            onChange={handleChange}
            value={form.email}
            className={`border-[1px] w-[90%] border-purple-600 bg-purple-950 mx-10 font-inter font-semibold text-[0.75rem] py-2 px-2 rounded-xl text-white ${errors.email && 'border-red-500'}`}
            type="email"
            name="email"
            id="email"
            placeholder='Your Email' /><br />
          {errors.email && <span className="text-red-500">{errors.email}</span>}
          <textarea
            required
            onChange={handleChange}
            value={form.message}
            className={`border-[1px] w-[90%] border-purple-600 bg-purple-950 mx-10 font-inter font-semibold text-[0.75rem] py-2 px-2 rounded-xl text-white ${errors.message && 'border-red-500'}`}
            name="message"
            id="message"
            cols={30}
            rows={6}
            placeholder='Message...'></textarea><br />
          {errors.message && <span className="text-red-500">{errors.message}</span>}
          <button type="submit" className='text-xs border-[1.5px] py-1 rounded-md min-w-[100px] max-w-full' onClick={handleSend}>
            {loading ? <span> Sending... </span> : <span>Send</span>}
          </button>
        </form>
      </div>
    </div>
  )
}

export default Email;
