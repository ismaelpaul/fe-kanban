import useFetchUser from '../../hooks/useFetchUser';

const UserProfile = () => {
	const { user, isLoading, isError } = useFetchUser();

	const fullName = user.first_name + ' ' + user.last_name;

	if (isLoading) {
		return <span>Loading...</span>;
	}

	if (isError) {
		return <span>Error: </span>;
	}

	return (
		<div className="flex items-center gap-2">
			<div className="h-12 w-12 overflow-hidden rounded-full border-2 border-purple">
				<img src={user.avatar} alt="Profile image" />
			</div>
			<h1 className="text-m-heading text-black dark:text-white">{fullName}</h1>
		</div>
	);
};

export default UserProfile;
