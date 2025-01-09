import { ReactNode } from 'react';

const Overlay = ({ children }: { children: ReactNode }) => {
	return (
		<aside className="fixed inset-0 flex items-center justify-center z-40">
			<div className="fixed inset-0 bg-black opacity-50"></div>
			{children}
		</aside>
	);
};

export { Overlay };
