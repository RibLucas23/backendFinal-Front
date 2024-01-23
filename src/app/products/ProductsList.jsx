"use client"
import Cookies from 'js-cookie';
import Link from 'next/link';
import React, { useEffect, useState } from 'react'

export default function ProductsList() {
   const [user, setUser] = useState({})
   useEffect(() => {
      const obtenerUsuarioDesdeCookie = async () => {
         const token = Cookies.get('usuario');

         if (token) {
            console.log(token);

            setUser(JSON.parse(token));
            console.log(user);
         }
      };

      obtenerUsuarioDesdeCookie();
   }, []); // Dependencia vacía para que se ejecute solo una vez al montar el componente

   const [products, setProducts] = useState([]);
   const [productsDTO, setProductsDTO] = useState({});

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
               setProductsDTO(data.responseDto)
               setProducts(data.responseDto.payload);
            } else {
               console.error('Error fetching products:', response.statusText);
            }
         } catch (error) {
            console.log(error)
         }
      }
         ;
      fetchProducts()
   }, []);
   // Dependencias vacías para que se ejecute solo una vez al montar el componente
   const customFetchProducts = async (linkToFetch) => {
      console.log(linkToFetch)
      try {
         // Realizar la solicitud solo si el usuario está autenticado
         const response = await fetch(linkToFetch, {
            method: 'GET',
            headers: {
               'Content-Type': 'application/json',
            }, // Incluye las credenciales en la solicitud
            credentials: 'include',

         });
         if (response.ok) {
            const data = await response.json();
            setProductsDTO(data.responseDto)
            setProducts(data.responseDto.payload);
         } else {
            console.error('Error fetching products:', response.statusText);
         }
      } catch (error) {
      }
   }
   console.log(productsDTO.nextLink)

   const deleteProduct = async (pid) => {
      try {
         // Realizar la solicitud solo si el usuario está autenticado
         const response = await fetch(`https://backendfinal-production-c834.up.railway.app/api/products/mongo/${pid}`, {
            method: 'DELETE',
            headers: {
               'Content-Type': 'application/json',
            }, // Incluye las credenciales en la solicitud
            credentials: 'include',

         });
         if (response.ok) {
            window.location.reload();
         } else {
            console.error('Error DELETING Product :', response.statusText);
         }
      } catch (error) {
         console.log(error)
      }
   }

   const addProduct = async (pid) => {

      try {
         const response = await fetch(`https://backendfinal-production-c834.up.railway.app/api/carts/mongo/${user.cart}/product/${pid}`, {
            method: 'PUT',
            headers: {
               'Content-Type': 'application/json',
            },

            credentials: 'include',

         });
         if (response.ok) {
            alert("producto agregado con exito")
            console.log('Add Product successful!');
         } else {
            console.error(error);
         }
      } catch (error) {
         alert("no pudiste agregar ese producto")
         console.error(error);
      }
   };

   return (
      <div className='flex flex-col justify-center items-center w-full'>

         <table className='bg-white w-4/6'>
            <thead>
               <tr>
                  <th scope='col'>#</th>
                  <th scope='col'>Title</th>
                  <th scope='col'>Price</th>
                  <th scope='col'>Category</th>
                  <th scope='col'>Stock</th>
                  <th scope='col'>ID</th>
                  <th scope='col'>Agregar al Carro</th>
                  <th scope='col'>Eliminar</th>
               </tr>
            </thead>

            <tbody className='text-center'>
               {products.map((product, index) => (
                  <tr key={index} className=' border-y-2 border-gray-200  h-16'>
                     <th scope='row'>{index + 1}</th>
                     <td>{product.title}</td>
                     <td>{product.price}</td>
                     <td>{product.category}</td>
                     <td>{product.stock}</td>
                     <td>{product._id}</td>
                     <td>
                        <button onClick={() => addProduct(product._id)} className='border-blue-500 border-2 rounded-xl px-4 text-blue-500'>
                           Agregar al carrito
                        </button>
                     </td>
                     <td><button onClick={() => deleteProduct(product._id)} className='border-red-500 border-2 rounded-xl px-4 text-red-500' >
                        Delete
                     </button></td>
                  </tr>
               ))}
            </tbody>
         </table>
         <div className=' flex gap-12 '>
            {productsDTO.prevLink ? <button className='text-white' onClick={() => customFetchProducts(productsDTO.prevLink)} >Prev</button> : ""}
            {productsDTO.nextLink ? <button className='text-white' onClick={() => customFetchProducts(productsDTO.nextLink)} >Next</button> : ""}

         </div>


      </div >
   )
}
