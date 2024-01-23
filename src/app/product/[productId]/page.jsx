import React from 'react'
import Card from './Card';

export default async function ProductDetail({ params }) {


   //fetch del producto
   const product = await fetch(`http://localhost:8080/api/products/mongo/${params.productId}`);

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
