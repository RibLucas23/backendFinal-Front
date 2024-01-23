"use client"
import React, { useEffect, useState } from 'react'
import Link from 'next/link';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';

export default function NavBar() {
   const router = useRouter()

   const [user, setUser] = useState({})
   useEffect(() => {
      const obtenerUsuarioDesdeCookie = async () => {
         const token = Cookies.get('usuario');

         if (token) {
            // console.log(token);

            setUser(JSON.parse(token));
            // console.log(user);
         }
      };

      obtenerUsuarioDesdeCookie();
   }, [router]);

   const CustomLink = ({ href, title, className = '' }) => {
      const router = useRouter();
      return (
         <Link href={href} className={`${className} relative group`}>
            {title}
            <span
               className={`h-[1px] inline-block  bg-[#f5f5f5] absolute left-0 -bottom-0.5 group-hover:w-full transition-[width] ease duration-300
            ${router.asPath === href ? 'w-full' : 'w-0'}
            
            `}
            >
               &nbsp;
            </span>
         </Link>
      );
   };
   const handlelogout = async (e) => {

      try {
         const response = await fetch('https://backendfinal-production-c834.up.railway.app/api/session/logout', {
            method: 'GET',
            headers: {
               'Content-Type': 'application/json',
            },
            credentials: 'include',
         });
         Cookies.remove('usuario')
         router.push('/login');

      } catch (error) {
         console.error('Error during login:', error);
      }
   };
   return (
      <nav className=' bg-[#111928] w-full text-white p-5 flex justify-around items-center'>
         <div>
            <p>CoderProyect</p>
         </div>
         <div>
            <ul className='flex gap-5'>
               <li> <CustomLink href='/' title='Home' className='mr-4' /></li>
               <li> 	<CustomLink href='/products' title='Products' className='mx-4' /> </li>
               {/* <li><CustomLink href='/chat' title='Chat' className='mx-4' /></li> */}
               {user.rol === "admin" ? <li><CustomLink href='/users' title='Users' className='mx-4' /></li>
                  : <span></span>}
            </ul>
         </div>
         <div className='flex gap-4'>
            {user.cart ?
               <>
                  <Link href={`cart/${user.cart}`}>

                     <span className=' bg-transparent bg-slate-800 rounded-full p-2'>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                           <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
                        </svg>
                     </span>
                  </Link>
               </> : <> </>}

            <div className=' flex gap-2 items-center' >
               {user.isLogged ? <button onClick={handlelogout}>LogOut</button> : <CustomLink href='/login' title='Sign In' className='' />}

            </div>


         </div>
      </nav>
   )
}
