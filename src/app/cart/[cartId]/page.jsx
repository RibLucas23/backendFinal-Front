"use client"

import Cookies from 'js-cookie';
import React, { useEffect, useState } from 'react'

export default function page() {
   const [cart, setCart] = useState([]);
   const [user, setUser] = useState({})
   useEffect(() => {
      const obtenerUsuarioDesdeCookie = async () => {
         const token = Cookies.get('usuario');

         if (token) {
            const parsedUser = JSON.parse(token);
            setUser(parsedUser);
         }
      };

      obtenerUsuarioDesdeCookie();
   }, [])
   console.log(user.cart)

   useEffect(() => {
      const fetchProducts = async () => {

         try {
            // Realizar la solicitud solo si el usuario está autenticado
            const response = await fetch(`https://backendfinal-production-c834.up.railway.app/api/carts/mongo/${user.cart}`, {
               method: 'GET',
               headers: {
                  'Content-Type': 'application/json',
               }, // Incluye las credenciales en la solicitud
               credentials: 'include',

            });
            if (response.ok) {
               const data = await response.json();
               setCart(data.productos)
               console.log(data.productos)
            } else {
               console.error('Error fetching products:', response.statusText);
            }
         } catch (error) {
            console.log(error)
         }
      }
      if (user.cart) {
         fetchProducts();
      }
   }, [user]);

   const deleteProduct = async (pid) => {
      try {
         // Realizar la solicitud solo si el usuario está autenticado
         const response = await fetch(`https://backendfinal-production-c834.up.railway.app/api/carts/mongo/${user.cart}/product/${pid}`, {
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


   const finishBuy = async () => {
      try {
         // Realizar la solicitud solo si el usuario está autenticado
         const response = await fetch(`https://backendfinal-production-c834.up.railway.app/api/carts/mongo/${user.cart}/purchase`, {
            method: 'POST',
            headers: {
               'Content-Type': 'application/json',
            }, // Incluye las credenciales en la solicitud
            credentials: 'include',

         });
         if (response.ok) {
            alert("compra terminada, se enviara un email con la informacion de compra. Gracias")
            window.location.reload();
         } else {
            console.error('Error DELETING Product :', response.statusText);
         }
      } catch (error) {
         console.log(error)
      }
   }


   return (
      <div className='flex flex-col justify-center items-center w-full'>

         <table className='bg-white w-4/6'>
            <thead>
               <tr>
                  <th scope='col'>#</th>
                  <th scope='col'>Id</th>
                  <th scope='col'>Product Name</th>
                  <th scope='col'>Quantity</th>
                  <th scope='col'>Delete from Cart</th>
               </tr>
            </thead>

            <tbody className='text-center'>
               {cart.map((product, index) => (
                  <tr key={index} className=' border-y-2 border-gray-200  h-16'>
                     <th scope='row'>{index + 1}</th>
                     <td>{product._id}</td>
                     <td>{product.product.title}</td>
                     <td>{product.quantity}</td>
                     <td><button onClick={() => deleteProduct(product._id)} className='border-red-500 border-2 rounded-xl px-4 text-red-500' >
                        Delete
                     </button></td>
                  </tr>
               ))}
            </tbody>
         </table>
         <button onClick={finishBuy} className='border-green-500 border-2 rounded-xl px-4 text-green-500'>Finish Buy</button>


      </div >
   )
}
