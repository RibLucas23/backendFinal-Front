import React from 'react'
import ProductsList from './ProductsList'
import ProductsForm from './ProductsForm'
import Cookies from 'js-cookie';


export default function page() {

   return (
      <div className='flex flex-col justify-center  items-center gap-8 mt-8' >
         <ProductsForm />
         <ProductsList />
      </div>
   )
}
