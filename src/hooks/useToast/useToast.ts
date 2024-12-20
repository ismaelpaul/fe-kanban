import {
	ToastContext,
	ToastContextValue,
} from '@/contexts/ToastContext/ToastContext';
import { useContext } from 'react';

export const useToast = (): ToastContextValue => {
	const context = useContext(ToastContext);

	if (!context) {
		throw new Error('useToast must be used within a ToastContextProvider');
	}

	return context;
};
