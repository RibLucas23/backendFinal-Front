import { Inter } from 'next/font/google';
import './globals.css';
import NavBar from '@/components/NavBar/NavBar';
import Footer from '@/components/Footer/Footer';

const inter = Inter({ subsets: ['latin'] });
inter.className += ' bg-page-bg  min-h-screen';
export const metadata = {
	title: 'Create Next App',
	description: 'Generated by create next app',
};

export default function RootLayout({ children }) {
	return (
		<html lang='en'>
			<body className={inter.className}>
				<NavBar />
				{children}

				<Footer />
			</body>
		</html>
	);
}