"use client"
import React, { useEffect } from 'react'
import { useState } from 'react';
import Cookies from 'js-cookie';

export default function ProductsForm() {
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

   const [formData, setFormData] = useState({
      title: '',
      description: '',
      price: '',
      thumbnail: '',
      stock: '',
      category: '',
      code: '',
   });

   const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData((prevData) => ({ ...prevData, [name]: value }));
   };

   const handleSubmit = async (e) => {
      e.preventDefault();
      console.log(formData)
      try {
         const response = await fetch(`${process.env.NEXT_PUBLIC_RUTA_FETCH}/api/products/mongo`, {
            method: 'POST',
            headers: {
               'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
            credentials: 'include',

         });

         if (response.ok) {
            console.log('Producto enviado exitosamente');
            // Puedes hacer algo después de enviar el formulario, como redireccionar a otra página
         } else {
            console.error('Error al enviar el producto:', response.statusText);
         }
      } catch (error) {
         console.error('Error al enviar el producto:', error);
      }
   };

   return (
      <>
         <div className='text-white'>
            <h1 className=' text-3xl '> Hola {user.first_name} Bienvenido a Productos</h1>
            <p>Tu rol es: <b className=' underline '> {user.rol}</b> </p>
         </div>
         <div className='flex  bg-[#2a195e8b] w-4/6 rounded-xl p-8 ' >
            <form onSubmit={handleSubmit} className='text-white w-full flex justify-center flex-wrap gap-6' >
               <div>
                  <label >
                     Título del Producto:
                     <input
                        className=' text-black rounded-lg p-1 flex justify-center '
                        type="text"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        required
                     />
                  </label>
               </div>

               <div>
                  <label>
                     Descripción del Producto:
                     <input
                        className=' text-black rounded-lg p-1 flex justify-center '
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        required
                     />
                  </label>
               </div>

               <div>
                  <label>
                     Precio del Producto:
                     <input
                        className=' text-black rounded-lg p-1 flex justify-center '
                        type="number"
                        name="price"
                        value={formData.price}
                        onChange={handleChange}
                        required
                     />
                  </label>
               </div>

               <div>
                  <label>
                     Thumbnail del Producto:
                     <input
                        className=' text-black rounded-lg p-1 flex justify-center '
                        type="url"
                        name="thumbnail"
                        value={formData.thumbnail}
                        onChange={handleChange}
                        required
                     />
                  </label>
               </div>

               <div>
                  <label>
                     Stock del Producto:
                     <input
                        className=' text-black rounded-lg p-1 flex justify-center '
                        type="number"
                        name="stock"
                        value={formData.stock}
                        onChange={handleChange}
                        required
                     />
                  </label>
               </div>

               <div>
                  <label>
                     Code del Producto:
                     <input
                        className=' text-black rounded-lg p-1 flex justify-center '
                        type="text"
                        name="code"
                        value={formData.code}
                        onChange={handleChange}
                        required
                     />
                  </label>
               </div>

               <div>
                  <label>
                     Categoría del Producto:
                     <input
                        className=' text-black rounded-lg p-1 flex justify-center '
                        type="text"
                        name="category"
                        value={formData.category}
                        onChange={handleChange}
                        required
                     />
                  </label>
               </div>
               <div className='w-full flex justify-center'>

                  <button className=' bg-blue-600 px-20 pb-2 pt-2 rounded-xl mt-2  ' type="submit">Submit</button>
               </div>
            </form>
         </div>
      </>
   )
}
