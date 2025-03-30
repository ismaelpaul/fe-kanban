import { ReactNode } from 'react';
import { DashboardNav } from '../Nav/DashboardNav';
import { Footer } from '../Footer';

type LayoutProps = {
	children: ReactNode;
};

const Layout = ({ children }: LayoutProps) => {
	return (
		<>
			<DashboardNav />
			<main className="flex relative h-[83vh] overflow-y-hidden no-scrollbar::-webkit-scrollbar">
				{children}
			</main>
			<Footer />
		</>
	);
};

export { Layout };
