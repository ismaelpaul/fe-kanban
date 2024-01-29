import { useContext } from 'react';
import { ToastContext, ToastContextValue } from '../contexts/ToastContext';

export const useToast = (): ToastContextValue => {
	const context = useContext(ToastContext);

	if (!context) {
		throw new Error('useToast must be used within a ToastContextProvider');
	}

	return context;
};
