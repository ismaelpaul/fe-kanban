import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { logoutUser } from '@/api/kanbanApi';

import { useAuth, useToast } from '@/hooks';

import { Button } from '@/components/Button';
import { ChevronDown } from '@/components/SVGComponents/ChevronDown';
import { ChevronUp } from '@/components/SVGComponents/ChevronUp';
import { UserProfileSkeleton } from '@/components/SkeletonLoader/UserProfileSkeleton';

const UserProfile = () => {
	const [isLogoutOpen, setIsLogoutOpen] = useState(false);

	const { user, isAuthLoading } = useAuth();

	const navigate = useNavigate();
	const toast = useToast();

	const name = user ? user.first_name : '';
	const avatar = user ? user.avatar : '';

	const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>) => {
		e.currentTarget.src = 'https://i.ibb.co/4pDNDk1/avatar.png';
	};

	const handleLogout = async () => {
		const result = await logoutUser();

		if (result === 200) {
			navigate('/login');
		} else {
			toast.error('Something went wrong, please try again.');
		}
	};

	return (
		<>
			{isAuthLoading && <UserProfileSkeleton />}
			<div className="flex items-center gap-2">
				<div className="ml-auto h-8 w-8 tablet:h-10 tablet:w-10 laptop:h-12 laptop:w-12 overflow-hidden rounded-full border-2 border-purple">
					<img src={avatar} alt="Profile image" onError={handleImageError} />
				</div>
				<Button
					buttonClass={'text-m-heading text-black dark:text-white'}
					buttonText={name}
					onClick={() => {
						setIsLogoutOpen(!isLogoutOpen);
					}}
				/>
				{isLogoutOpen ? <ChevronUp /> : <ChevronDown />}
				{isLogoutOpen && (
					<Button
						buttonClass={
							'absolute px-4 py-[1.375rem] top-[4.2rem] bg-white dark:bg-dark-grey rounded-lg text-l-body text-medium-grey cursor-pointer w-32'
						}
						buttonText={'Log out'}
						onClick={handleLogout}
					/>
				)}
			</div>
		</>
	);
};

export { UserProfile };
