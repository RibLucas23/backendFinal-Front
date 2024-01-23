import React from 'react'
import Card from './Card';

export default async function ProductDetail({ params }) {


   //fetch del producto
   const product = await fetch(`https://backendfinal-production-c834.up.railway.app/api/products/mongo/${params.productId}`);

   const json = await product.json();

   // const json = "asd"
   //compruebo si el producto existe, sino redirecciono a error 404

   return (
      <>
         <div className='  flex justify-center '>

            <Card product={json} />
         </div>
      </>
   )
}
