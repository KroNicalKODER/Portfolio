import React, { useState } from 'react'
import emailjs from '@emailjs/browser'

const Email = () => {
    const [loading,setLoading] = useState(false)
    const [form, setForm] = useState({name: "", email: "", message: ""})

    const handleChange = ({ target: { name, value } }) => {
        setForm({ ...form, [name]: value });
    }

    const handleSend = (e) => {
        e.preventDefault()
        setLoading(true)
        console.log(import.meta.env.VITE_APP_EMAILJS_SERVICE_ID,
            import.meta.env.VITE_APP_EMAILJS_TEMPLATE_ID,import.meta.env.VITE_APP_EMAILJS_PUBLIC_KEY)
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
        ).then (()=>{
            setLoading(false)
            alert("Email Sent Successfully. Thank You for contacting.")
            setForm({
                name:"",
                email:"",
                message:""
            })
        }).catch((err)=>{
            console.log("Error: ",err);
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
                    onChange={handleChange} 
                    value={form.name}
                    className='border-[1px] w-[90%] border-purple-600 bg-purple-950 mx-10 font-inter font-semibold text-[0.75rem] py-2 px-2 rounded-xl text-white ' 
                    type="text" 
                    name="name" 
                    id="name" 
                    placeholder='Your Name'/><br />
                <input 
                    onChange={handleChange} 
                    value={form.email}
                    className='border-[1px] w-[90%] border-purple-600 bg-purple-950 mx-10 font-inter font-semibold text-[0.75rem] py-2 px-2 rounded-xl text-white ' 
                    type="email" 
                    name="email" 
                    id="email" 
                    placeholder='Your Email'/><br />
                <textarea 
                    onChange={handleChange} 
                    value={form.message}
                    className='border-[1px] w-[90%] border-purple-600 bg-purple-950 mx-10 font-inter font-semibold text-[0.75rem] py-2 px-2 rounded-xl text-white ' 
                    name="message" 
                    id="message" 
                    cols={30} 
                    rows={6} 
                    placeholder='Message...'></textarea><br />
                <button type="submit" className='text-xs border-[1.5px] py-1 rounded-md min-w-[100px] max-w-full' onClick={handleSend}> 
                    {loading ? <span> Sending... </span> : <span>Send</span>}
                </button>
            </form>
        </div>
    </div>
  )
}

export default Email