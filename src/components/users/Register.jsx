import Image from 'next/image';
import rocket from '../../../public/rocket.png';
import RegisterForm from './RegisterForm';

function Register() {
	return (
		<main className='flex w-4/6 justify-center'>
			<div className='flex flex-col w-1/2 px-14 py-8 '>
				<h2 className=' font-semibold text-4xl text-violet-700 my-10'>
					Registration Form
				</h2>
				<RegisterForm />
			</div>

			<Image src={rocket} alt='rocket' className='w-1/2'></Image>
		</main>
	);
}

export default Register;
