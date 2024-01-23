'use client';
import React, { useEffect } from 'react'
import Image from 'next/image';
import ramImg from '../../../../public/ram.png'
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';

export default function Card({ product }) {
   if (!product || Object.keys(product).length === 0) {
      // Si el objeto json es undefined, null o una cadena vacía, redirigir a "/error404"
      router.push('/error404');
   }
   const router = useRouter();
   const [quantity, setQuantity] = useState(1);
   const [user, setUser] = useState({})
   useEffect(() => {
      const obtenerUsuarioDesdeCookie = async () => {
         const token = Cookies.get('usuario');

         if (token) {

            setUser(JSON.parse(token));
         }
      };

      obtenerUsuarioDesdeCookie();
   }, []); // Dependencia vacía para que se ejecute solo una vez al montar el componente


   const handleIncrement = () => {
      setQuantity(quantity + 1);
   };

   const handleDecrement = () => {
      if (quantity > 1) {
         setQuantity(quantity - 1);
      }
   };
   const handleBuy = async () => {

      try {
         const response = await fetch(`https://backendfinal-production-c834.up.railway.app/api/carts/mongo/${user.cart}/product/${product._id}`, {
            method: 'PUT',
            headers: {
               'Content-Type': 'application/json',
            },
            body: JSON.stringify({
               pQuantity: quantity // Reemplaza esto con el valor que desees pasar
            }),

            credentials: 'include',

         });
         console.log(response)
         if (response.ok) {
            console.log('Registration successful!');
         } else {
            console.error(error);
         }
      } catch (error) {
         console.error(error);
      }
   };
   return (
      <div className='  flex justify-center w-4/6 mt-6 gap-6'>
         <Image src={ramImg} className=' rounded-lg w-1/2   ' alt='memoria ram' />
         <div className='w-1/2 text-white flex flex-col gap-6'>
            <h1 className=' text-white text-5xl font-bold'>{product.title}  </h1>
            {
               product.stock > 0 ?
                  <p>In Stock</p> :
                  <p>Not In Stock</p>
            }
            <p>{product.description}</p>
            <div className='flex justify-between items-center'>
               <div className='flex flex-col gap-2  '>
                  <p>Quantity</p>
                  <div className='flex '>
                     <button onClick={handleDecrement} className=' text-white rounded-l-lg bg-blue-700 w-5 pl-4 pr-4 flex justify-center items-center'>-</button>
                     <span className=' text-black  bg-white w-5 pl-4 pr-4 flex justify-center items-center '>{quantity}</span>
                     <button onClick={handleIncrement} className=' text-white rounded-r-lg bg-blue-700 w-5 pl pl-4 pr-4 h-8  flex justify-center items-center' >+</button>
                  </div>
               </div>
               <p className=' font-semibold text-xl'><b>${product.price}</b></p>
            </div>
            <button onClick={() => handleBuy()} className='bg-blue-700 rounded-lg pt-4 pb-4'>
               Add to Cart
            </button>
         </div>


      </div>
   )
}
