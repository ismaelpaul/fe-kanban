import { ReactNode } from 'react';
import { DashboardNav } from '../Nav/Nav/DashboardNav';

type LayoutProps = {
	children: ReactNode;
};

const Layout = ({ children }: LayoutProps) => {
	return (
		<div className="h-screen">
			<DashboardNav />
			<section className="flex h-[90vh] bg-light-bg dark:bg-dark-bg ">
				{children}
			</section>
			<div>footer</div>
		</div>
	);
};

export { Layout };
