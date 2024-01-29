"use client"
import React, { useEffect, useState } from 'react'

export default function UsersList() {
   const [users, setUsers] = useState([])

   useEffect(() => {
      const fetchUsers = async () => {

         try {
            // Realizar la solicitud solo si el usuario está autenticado
            const response = await fetch(`${process.env.NEXT_PUBLIC_RUTA_FETCH}/api/session/`, {
               method: 'GET',
               headers: {
                  'Content-Type': 'application/json',
               }, // Incluye las credenciales en la solicitud
               credentials: 'include',

            });
            if (response.ok) {
               const data = await response.json();
               setUsers(data)
            } else {
               console.error('Error fetching users:', response.statusText);
            }
         } catch (error) {
            console.log(error)
         }
      }
         ;
      fetchUsers()
   }, []);
   const changeRol = async (uid) => {
      try {
         // Realizar la solicitud solo si el usuario está autenticado
         const response = await fetch(`${process.env.NEXT_PUBLIC_RUTA_FETCH}/api/session/premium/${uid}`, {
            method: 'PUT',
            headers: {
               'Content-Type': 'application/json',
            }, // Incluye las credenciales en la solicitud
            credentials: 'include',

         });
         if (response.ok) {
            window.location.reload();
         } else {
            console.error('Error changeing rol :', response.statusText);
         }
      } catch (error) {
         console.log(error)
      }
   }
   const deleteUser = async (uid) => {
      try {
         // Realizar la solicitud solo si el usuario está autenticado
         const response = await fetch(`${process.env.NEXT_PUBLIC_RUTA_FETCH}/api/session/delete/${uid}`, {
            method: 'DELETE',
            headers: {
               'Content-Type': 'application/json',
            }, // Incluye las credenciales en la solicitud
            credentials: 'include',

         });
         if (response.ok) {
            window.location.reload();
         } else {
            console.error('Error DELETING USER :', response.statusText);
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
                  <th scope='col'>Email</th>
                  <th scope='col'>Last Connection</th>
                  <th scope='col'>Rol</th>
                  <th scope='col'>Change Rol</th>
                  <th scope='col'>Delete User</th>
               </tr>
            </thead>

            <tbody className='text-center'>
               {users.map((user, index) => (
                  <tr key={index} className=' border-y-2 border-gray-200  h-16'>
                     <th scope='row'>{index + 1}</th>
                     <td>{user._id}</td>
                     <td>{user.email}</td>
                     <td>{user.last_connection}</td>
                     <td>{user.rol}</td>
                     <td>
                        <button className='border-blue-500 border-2 rounded-xl px-4 text-blue-500' onClick={() => changeRol(user._id)}>
                           Change Rol
                        </button>
                     </td>
                     <td><button className='border-red-500 border-2 rounded-xl px-4 text-red-500' onClick={() => deleteUser(user._id)}>
                        Delete
                     </button></td>
                  </tr>
               ))}
            </tbody>
         </table>



      </div >
   )
}
