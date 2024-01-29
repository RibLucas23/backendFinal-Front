"use client"
import React, { useState } from 'react'
import { useRouter } from 'next/navigation';


export default function RegisterForm() {
   const router = useRouter()

   const [formData, setFormData] = useState({
      first_name: '',
      last_name: '',
      email: '',
      age: '',
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
         const response = await fetch(`${process.env.NEXT_PUBLIC_RUTA_FETCH}/api/session/signup`, {
            method: 'POST',
            headers: {
               'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
         });

         if (response.ok) {
            alert('Registration successful!')
            console.log('Registration successful!');
            router.push('/login');
         } else {
            console.error('Registration failed.');
         }
      } catch (error) {
         console.error('Error during registration:', error);
      }
   };
   return (
      <form onSubmit={handleSubmit} className='flex flex-col gap-8'>
         <div className='flex gap-10 '>
            {/* first name */}
            <div className='flex flex-col w-1/2'>
               <label className=' text-gray-400 '>First Name</label>
               <input
                  type='text'
                  name='first_name'
                  value={formData.first_name}
                  pattern='[A-Za-z]+'
                  minLength={3}
                  maxLength={50}
                  title='The name must contain only letters'
                  onChange={handleChange}
                  required
                  className=' border-b-2 border-blue-300 text-black'
               />
            </div>
            {/* last name */}

            <div className='flex flex-col w-1/2'>
               <label className=' text-gray-400 '>Last Name</label>
               <input
                  type='text'
                  name='last_name'
                  value={formData.last_name}
                  pattern='[A-Za-z]+'
                  minLength={3}
                  maxLength={50}
                  title='The lastname must contain only letters'
                  onChange={handleChange}
                  required
                  className=' border-b-2 border-blue-300 text-black'
               />
            </div>
         </div>

         {/* email */}
         <div className='flex flex-col'>
            <label className=' text-gray-400'>Email</label>
            <input
               type='email'
               name='email'
               pattern='[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}'
               value={formData.email}
               onChange={handleChange}
               title='Please enter a valid email address format'
               required
               className=' border-b-2 border-blue-300 text-black'
            />
         </div>
         {/* Age */}
         <div className='flex flex-col'>
            <label className=' text-gray-400'>Age</label>
            <input
               type='age'
               name='age'
               value={formData.age}
               pattern='[0-9]{2}'
               maxLength={2}
               title='The Age number must be in a valid format(max 2 digits)'
               onChange={handleChange}
               required
               className=' border-b-2 border-blue-300 text-black '
            />
         </div>
         {/* password */}
         <div className='flex flex-col'>
            <label className=' text-gray-400'>Password</label>
            <input
               type='password'
               name='password'
               value={formData.password}
               // pattern='(?=.*[A-Z])(?=.*[@#$%^&+=]).{8,}'
               title='The password must be at least 8 characters, one uppercase letter and one special character (@#$%^&+=)'
               onChange={handleChange}
               required
               className=' border-b-2 border-blue-300 text-black '
            />
         </div>
         <div className='flex justify-center'>
            <button
               type='submit'
               className='py-4 my-8 bg-blue-800 rounded-3xl text-white px-14 text-center'
            >
               Register
            </button>
         </div>
      </form>
   )
}
