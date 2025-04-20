import { createContext, ReactNode } from 'react';
import { useFetchUser } from '@/hooks';
import { UserInfo } from '@/interfaces/IUser';
import { useLocation } from 'react-router-dom';

export interface AuthContextType {
	user: UserInfo | null;
	isAuthLoading: boolean;
	isError: boolean;
	isAuthenticated: boolean;
}

export const AuthContext = createContext<AuthContextType | undefined>(
	undefined
);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
	const { pathname } = useLocation();

	const isPublicRoute = ['/login', '/register'].some((route) =>
		pathname.startsWith(route)
	);

	const { user, isAuthLoading, isError, isAuthenticated } = useFetchUser({
		enabled: !isPublicRoute,
	});

	const value = {
		user: user ?? null,
		isAuthLoading,
		isError,
		isAuthenticated,
	};

	return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
