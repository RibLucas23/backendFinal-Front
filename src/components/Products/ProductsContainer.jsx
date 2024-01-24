"use client"
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation';
import ramImg from '../../../public/ram.png'
import Image from 'next/image';
import Link from 'next/link';
export default function ProductsContainer() {
   const router = useRouter()

   const [products, setProducts] = useState([]);
   useEffect(() => {
      const fetchProducts = async () => {

         try {
            // Realizar la solicitud solo si el usuario está autenticado
            const response = await fetch('https://backendfinal-production-c834.up.railway.app/api/products/mongo', {
               method: 'GET',
               headers: {
                  'Content-Type': 'application/json',
               }, // Incluye las credenciales en la solicitud
               credentials: 'include',

            });
            if (response.ok) {
               const data = await response.json();
               setProducts(data.responseDto.payload);
            } else {
               console.error('Error fetching products:', response.statusText);
            }
         } catch (error) {
            router.push("/")
         }
      }
         ;
      fetchProducts()
   }, []); // Dependencias vacías para que se ejecute solo una vez al montar el componente

   return (

      <div className='flex flex-col justify-center items-center'>
         <h2 className='text-white text-2xl m-6 '>Best Sellers</h2>
         <div className='flex flex-wrap  w-4/6  gap-8'>
            {
               products.map((product, index) => {
                  return <Link key={index} href={`/product/${product._id}`} className='flex'>
                     <div className='flex flex-col justify-between bg-white w-60 rounded-t-lg ' >
                        <Image src={ramImg} className=' rounded-t-lg ' alt='memoria ram' />
                        <h3 className='m-4 font-semibold text-lg '> <b> {product.title}</b></h3>
                        <p className='m-4 mt-8'>{product.description}</p>
                        <div className=' flex flex-row-reverse '>
                           <span className=' text-[#1C3FB7] p-5'><b>${product.price}</b></span>
                        </div>
                     </div>
                  </Link>
               })
            }
            {/* <div className='bg-white w-60 rounded-t-lg'>
               <Image src={ramImg} className=' rounded-t-lg ' alt='memoria ram' />

               <h3 className='m-4'> <b> Memoria RAM Kimgstone</b></h3>
               <p className='m-4 mt-8'>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Corporis iure hic eum voluptas dolores! Reprehenderit adipisci corrupti voluptas tempore aliquid, iste facilis placeat quia maxime vel recusandae eius harum .</p>
               <div className=''>
                  <span className=' text-[#1C3FB7]'><b>$35.00</b></span>
               </div> */}
            {/* </div> */}
         </div>

      </div >
   )
}

{/* {
               products.map((product, index) => {
                  { console.log(product) }
                  return <div key={index} >
                  <img src='https://www.w3schools.com/images/w3schools_green.jpg' />
                  <p> {product.description} </p>
                  <p> {product.price} </p>
                  </div>
               })
            } */}