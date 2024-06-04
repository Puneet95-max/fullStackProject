"use client"
import React from 'react'
import { HiEye, HiEyeOff } from 'react-icons/hi';
import { useState } from 'react'

function LoginPageContainer() {

    const [formData, setFormData] = useState({ Email: "", Password: "" })
    const [showPassword, setShowPassword] = useState(false);

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    return (
        <main className='w-full h-screen bg-gradient-to-r from-cyan-500 to-blue-500  grid place-items-center '>
            <div className=' w-[40%] h-[65%] bg-white rounded-3xl flex  shadow-lg' >
                <div className='w-full '>

                    <p className='font-bold flex justify-center pt-10 text-3xl'>Welcome back!</p>
                    <p className='flex justify-center text-gray-500 text-[11px]'>Please sign in to continue</p>

                    <form className='flex flex-col  items-center  pt-10'>
                        <div className='flex flex-col my-2 '>
                            <label className='font-bold p-1'> Email: </label>
                            <div className='relative'>
                                <input
                                    type="email"
                                    name='Email'
                                    value={formData.Email}
                                    onChange={handleChange}
                                    placeholder='Your Email'
                                    className='pl-7 p-1 pr-8 border'
                                />
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="black" class="bi bi-envelope" viewBox="0 0 16 16" style={{ position: 'absolute', top: 8, left: 8 }}>
                                    <path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2zm2-1a1 1 0 0 0-1 1v.217l7 4.2 7-4.2V4a1 1 0 0 0-1-1zm13 2.383-4.708 2.825L15 11.105zm-.034 6.876-5.64-3.471L8 9.583l-1.326-.795-5.64 3.47A1 1 0 0 0 2 13h12a1 1 0 0 0 .966-.741M1 11.105l4.708-2.897L1 5.383z" />
                                </svg>
                            </div>
                        </div>
                        <div className='flex flex-col my-2'>
                            <label className='font-bold p-1'>Password:</label>
                            <div className='relative'>
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    name='Password'
                                    value={formData.Password}
                                    onChange={handleChange}
                                    placeholder='Your Password'
                                    className='pl-7 pr-8 p-1 border' 
                                />
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="black" class="bi bi-shield-lock" viewBox="0 0 16 16" style={{ position: 'absolute', top: 8, left: 8 }}>
                                    <path d="M5.338 1.59a61 61 0 0 0-2.837.856.48.48 0 0 0-.328.39c-.554 4.157.726 7.19 2.253 9.188a10.7 10.7 0 0 0 2.287 2.233c.346.244.652.42.893.533q.18.085.293.118a1 1 0 0 0 .101.025 1 1 0 0 0 .1-.025q.114-.034.294-.118c.24-.113.547-.29.893-.533a10.7 10.7 0 0 0 2.287-2.233c1.527-1.997 2.807-5.031 2.253-9.188a.48.48 0 0 0-.328-.39c-.651-.213-1.75-.56-2.837-.855C9.552 1.29 8.531 1.067 8 1.067c-.53 0-1.552.223-2.662.524zM5.072.56C6.157.265 7.31 0 8 0s1.843.265 2.928.56c1.11.3 2.229.655 2.887.87a1.54 1.54 0 0 1 1.044 1.262c.596 4.477-.787 7.795-2.465 9.99a11.8 11.8 0 0 1-2.517 2.453 7 7 0 0 1-1.048.625c-.28.132-.581.24-.829.24s-.548-.108-.829-.24a7 7 0 0 1-1.048-.625 11.8 11.8 0 0 1-2.517-2.453C1.928 10.487.545 7.169 1.141 2.692A1.54 1.54 0 0 1 2.185 1.43 63 63 0 0 1 5.072.56" />
                                    <path d="M9.5 6.5a1.5 1.5 0 0 1-1 1.415l.385 1.99a.5.5 0 0 1-.491.595h-.788a.5.5 0 0 1-.49-.595l.384-1.99a1.5 1.5 0 1 1 2-1.415" />
                                </svg>

                                <button
                                    type="button"
                                    onClick={togglePasswordVisibility}
                                    className="absolute inset-y-0 right-0 flex items-center px-3"
                                >
                                    {showPassword ? <HiEyeOff /> : <HiEye />}
                                </button>
                            </div>
                        </div>
                    </form>

                    <div className='flex justify-center pt-16'>
                        <button type='submit' className='w-[40%] bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full'>Sign In</button>
                    </div>

                </div>

            </div>
        </main>
    )
}

export default LoginPageContainer;



