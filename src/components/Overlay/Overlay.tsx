import { ReactNode } from 'react';

const Overlay = ({ children }: { children: ReactNode }) => {
	return (
		<div className="absolute inset-0 flex items-center justify-center z-40">
			<div className="absolute inset-0 bg-black opacity-50"></div>
			{children}
		</div>
	);
};

export { Overlay };
