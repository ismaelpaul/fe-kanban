import { Navigate, useLocation } from 'react-router-dom';

import { useAuth } from '@/hooks/useAuth';

import { MainSkeleton } from '../SkeletonLoader/MainSkeleton';

type ProtectedRouteProps = {
	children: JSX.Element;
};

const ProtectedRoute = ({ children }: ProtectedRouteProps): JSX.Element => {
	const { user, isLoading, isError } = useAuth();
	const location = useLocation();

	if (isLoading) {
		return <MainSkeleton />;
	}

	if (isError || !user) {
		// If error occurred fetching user OR user is null/undefined after checking
		// Redirect to login, saving the intended destination.
		console.warn(
			'ProtectedRoute: No user found or error fetching user. Redirecting to login.',
			{ isError }
		);
		return <Navigate to="/login" state={{ from: location }} replace />;
	}

	return children;
};

export { ProtectedRoute };
