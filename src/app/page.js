import ProductsContainer from '@/components/Products/ProductsContainer';
import LoginForm from '@/components/users/LoginForm';
import Register from '@/components/users/Register';
import bannerImg from '../../public/banner.png';
import Image from 'next/image';
export default function Home() {
	return (
		<main className='flex  flex-col'>
			<div className='flex flex-col justify-center items-center  text-white p-11 gap-4  relative  overflow-hidden'>
				<Image
					src={bannerImg}
					alt='Background'
					priority='true'
					className=' filter blur-md absolute  w-full  '
				/>
				<div className='absolute inset-0 bg-black bg-opacity-50'></div>
				<h3 className='z-10'> Extra 30% Off Online</h3>
				<h2 className=' text-3xl z-10'> Summer Season Sale</h2>
				<p className='z-10'>
					Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsum,
					doloremque quod voluptatem natus officiis veniam, nihil ad enim,
					iste excepturi blanditiis asperiores laboriosam quis voluptatibus
					iure vitae! Voluptatem, aspernatur modi!
				</p>
				<button className=' bg-blue-600 pl-6 pr-6 pb-2 pt-2 rounded-xl mt-2 z-10'>
					Shop Now
				</button>
			</div>
			{/* <Register /> */}
			<div className='flex  flex-col items-center justify-between '>
				<ProductsContainer />
			</div>
		</main>
	);
}
