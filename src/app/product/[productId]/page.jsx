import React from 'react'
import Card from './Card';

export default async function ProductDetail({ params }) {


   //fetch del producto
   const product = await fetch(`${process.env.NEXT_PUBLIC_RUTA_FETCH}/api/products/mongo/${params.productId}`);

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
