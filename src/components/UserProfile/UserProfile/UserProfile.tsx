import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { logoutUser } from '@/api/kanbanApi';

import { useFetchUser, useToast } from '@/hooks';

import useUserStore from '@/store/userStore';

import { Button } from '@/components/Button';
import { ChevronDown } from '@/components/SVGComponents/ChevronDown';
import { ChevronUp } from '@/components/SVGComponents/ChevronUp';

const UserProfile = () => {
	const [isLogoutOpen, setIsLogoutOpen] = useState(false);
	const { user, isLoading } = useFetchUser();

	const setUser = useUserStore((state) => state.setUser);

	useEffect(() => {
		if (user) {
			setUser(user);
		}
	}, [user]);

	const navigate = useNavigate();
	const toast = useToast();

	const name = user ? user.first_name : '';

	const profileBtnClass = 'text-m-heading text-black dark:text-white';
	const logoutBtnClass =
		'absolute px-4 py-[1.375rem] top-[4.2rem] bg-white dark:bg-dark-grey rounded-lg text-l-body text-medium-grey cursor-pointer w-32';

	if (isLoading) {
		return <span>Loading...</span>;
	}

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
			<div className="flex items-center gap-2">
				<div className="h-12 w-12 overflow-hidden rounded-full border-2 border-purple">
					<img src={user.avatar} alt="Profile image" />
				</div>
				<Button
					buttonClass={profileBtnClass}
					buttonText={name}
					onClick={() => {
						setIsLogoutOpen(!isLogoutOpen);
					}}
				/>
				{isLogoutOpen ? <ChevronUp /> : <ChevronDown />}
				{isLogoutOpen && (
					<Button
						buttonClass={logoutBtnClass}
						buttonText={'Log out'}
						onClick={handleLogout}
					/>
				)}
			</div>
		</>
	);
};

export { UserProfile };
