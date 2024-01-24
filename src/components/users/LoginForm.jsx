'use client';
import Image from 'next/image';
import React, { useContext, useState } from 'react';
import loginImg from '../../../public/login.png';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';
import Link from 'next/link';

function LoginForm() {

   //use Navigate
   const router = useRouter()
   const [credentials, setCredentials] = useState({ email: '', password: '' });
   const [formData, setFormData] = useState({
      email: '',
      password: '',
   });

   const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData((prevData) => ({
         ...prevData,
         [name]: value,
      }));
   };

   const handleSubmit = async (e) => {
      e.preventDefault();

      try {
         const response = await fetch('https://backendfinal-production-c834.up.railway.app/api/session/login', {
            method: 'POST',
            headers: {
               'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
            credentials: 'include',
         });

         // Check if the response is ok
         if (response.ok) {
            const data = await response.json();
            console.log(data);
            // Almacena la información de la sesión en el estado o en las cookies
            if (data.userInfo) {
               const userData = JSON.stringify(data.userInfo);
               console.log(userData);
               // Accede a la cookie 'user' y haz lo que necesites con la sesión del usuario
               Cookies.set('usuario', userData);
               router.push('/');
            }
         } else {
            console.error('Login failed.');
         }
      } catch (error) {
         console.error('Error during login:', error);
      }
   };

   const handlelogout = async (e) => {
      e.preventDefault();

      try {
         const response = await fetch('https://backendfinal-production-c834.up.railway.app/api/session/logout', {
            method: 'GET',
            headers: {
               'Content-Type': 'application/json',
            },
            credentials: 'include',
         });


      } catch (error) {
         console.error('Error during login:', error);
      }
   };

   return (
      <main className='flex bg-login-bg w-full h-full'>
         <article className='flex mx-12 my-8 shadow-2xl shadow-blue-800 rounded-3xl'>
            <div className='py-12 flex flex-col items-center justify-center  w-2/3 '>
               <Image src={loginImg} alt='rocket' className='w-1/2'></Image>
               <p className='text-white text-center px-8 text-sm'>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Veniam, maiores? Vel maxime fuga eius quas officiis corrupti,
                  voluptatum obcaecati explicabo assumenda.
               </p>
            </div>
            <div className='flex flex-col  bg-white w-1/3 relative  rounded-r-3xl'>
               {/* title */}
               <div className='absolute bg-gray-800 w-2 h-full opacity-10' />
               <span className='bg-login-bg text-white py-2 mt-3 w-2/3 rounded-r-full text-center pr-6  font-medium text-md '>
                  Welcome back
               </span>

               {/* login section */}
               <div className='mt-12 px-8 '>
                  <h2 className='text-center text-violet-600 text-xl  my-6'>
                     Login your account
                  </h2>

                  {/* form */}
                  <form
                     onSubmit={handleSubmit}
                     className='flex flex-col gap-8 '
                  >
                     <div className='flex flex-col gap-10  '>
                        {/* user */}
                        <div className='flex flex-col'>
                           <label className=' text-violet-400'>Email</label>
                           <input
                              type='text'
                              name='email'
                              value={formData.email}
                              onChange={handleChange}
                              required
                              className=' border-b-2 border-violet-300'
                           />
                        </div>

                        {/* password */}
                        <div className='flex flex-col'>
                           <label className='text-violet-400'>Password</label>
                           <input
                              type='password'
                              name='password'
                              value={formData.password}
                              onChange={handleChange}
                              required
                              className='border-b-2 border-violet-300'
                           />
                        </div>
                        <div className='flex justify-center flex-col items-center'>
                           <button
                              type='submit'
                              className='py-4 bg-login-bg rounded-3xl text-white px-14 text-center'
                           >
                              Login
                           </button>
                           <span className='mt-6'>
                              <Link href="/register">
                                 Create Account
                              </Link>

                           </span>
                           <span className='mt-16 mb-6'>
                              <a
                                 href=''
                                 className='text-violet-400 border-b-2 border-violet-500'
                              >
                                 Forgot Password?
                              </a>
                           </span>
                        </div>
                     </div>
                  </form>
               </div>
            </div>
         </article>

      </main>
   );
}

export default LoginForm;
