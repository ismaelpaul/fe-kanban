import { createContext, ReactNode } from 'react';
import { useFetchUser } from '@/hooks';
import { UserInfo } from '@/interfaces/IUser';

export interface AuthContextType {
	user: UserInfo | null;
	isLoading: boolean;
	isError: boolean;
}

export const AuthContext = createContext<AuthContextType | undefined>(
	undefined
);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
	const { user, isLoading, isError } = useFetchUser();

	const value = {
		user: user ?? null,
		isLoading,
		isError,
	};

	return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
