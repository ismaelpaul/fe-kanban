import {
	AuthContext,
	AuthContextType,
} from '@/contexts/AuthContext/AuthContext';
import { useContext } from 'react';

export const useAuth = (): AuthContextType => {
	const context = useContext(AuthContext);
	if (context === undefined) {
		throw new Error('useAuth must be used within an AuthProvider');
	}

	return context;
};
