import { useEffect, useState } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';

import { handleInvitationAction, verifyInvitationToken } from '@/api/kanbanApi';
import { useAuth } from '@/hooks';
import { Button } from '@/components/Button';
import { LoadingSpinner } from '@/components/LoadingSpinner';

type InvitationDetails = {
	teamName: string;
	inviterName: string;
};

const Invitation = () => {
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);
	const [details, setDetails] = useState<InvitationDetails | null>(null);
	const [actionLoading, setActionLoading] = useState(false);

	const { token } = useParams<{ token: string }>();
	const { isAuthenticated, isAuthLoading } = useAuth();
	const navigate = useNavigate();
	const location = useLocation();

	useEffect(() => {
		if (isAuthLoading) return;

		const verifyToken = async () => {
			if (!token) {
				setError('Invalid invitation link.');
				setIsLoading(false);
				return;
			}

			setIsLoading(true);
			setError(null);
			try {
				// 1. Verify token and get invitation details
				const invitationDetails = await verifyInvitationToken(token);
				console.log('Invitation details:', invitationDetails);

				setDetails(invitationDetails);

				// 2. Check Authentication
				if (!isAuthenticated) {
					// Store intent and redirect to login
					localStorage.setItem('pendingInvitationToken', token);
					// Redirect to login, passing the current path to return to
					navigate('/login', { state: { from: location } });
					return;
				}
			} catch (err: any) {
				setError(
					err.response?.data?.message || 'Invalid or expired invitation link.'
				);
				console.error('Token verification error:', err);
			} finally {
				if (isAuthenticated) {
					setIsLoading(false);
				}
			}
		};

		// If returning from login, check for the stored token
		const pendingToken = localStorage.getItem('pendingInvitationToken');
		if (isAuthenticated && pendingToken && pendingToken === token) {
			localStorage.removeItem('pendingInvitationToken');
			verifyToken();
		} else {
			verifyToken();
		}
	}, [token, isAuthenticated, navigate, location, isAuthLoading]);

	const handleAction = async (action: 'accept' | 'decline') => {
		if (!token || !isAuthenticated) return;
		setActionLoading(true);
		setError(null);
		try {
			await handleInvitationAction(action, token);
			navigate('/dashboard');
		} catch (err: any) {
			setError(
				err.response?.data?.message || `Failed to ${action} invitation.`
			);
			console.error(`${action} error:`, err);
		} finally {
			setActionLoading(false);
		}
	};

	if (isLoading) {
		return (
			<div className="h-screen flex flex-col items-center justify-center gap-2">
				<p>Please wait...</p>
				<LoadingSpinner />
			</div>
		);
	}

	if (error) {
		return <div>Error: {error}</div>;
	}

	return (
		<div className="h-screen flex flex-col items-center justify-center gap-4">
			<h1 className="text-l-heading">Team Invitation</h1>
			<p>
				{details?.inviterName} has invited you to join the team:{' '}
				<strong>{details?.teamName}</strong>.
			</p>
			<div className="flex gap-4 w-full max-w-sm mt-6">
				<Button
					onClick={() => handleAction('decline')}
					disabled={actionLoading}
					buttonText={'Decline Invitation'}
					buttonClass="bg-purple bg-opacity-10 dark:bg-white text-purple text-13px font-bold py-2 w-full rounded-full tablet:py-3 dark:hover:bg-purple/40"
				/>
				<Button
					onClick={() => handleAction('accept')}
					disabled={actionLoading}
					type="button"
					buttonClass="bg-purple text-white text-13px font-bold py-2 w-full rounded-full  hover:bg-purple-hover"
					buttonText={`${
						actionLoading ? 'Processing...' : 'Accept Invitation'
					}`}
				/>
			</div>

			{actionLoading && <p>Processing your response...</p>}
		</div>
	);
};

export { Invitation };
