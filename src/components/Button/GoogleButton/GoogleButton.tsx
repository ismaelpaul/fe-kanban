import { GoogleIcon } from '@/components/SVGComponents/GoogleIcon';

const GoogleButton = () => {
	const authUrl = import.meta.env.VITE_AUTH_URL;

	const googleAuth = () => {
		window.open(`${authUrl}/auth/google`, '_self');
	};

	const btnClass =
		'text-white text-13px py-2 w-full rounded-full transition ease-in duration-200';

	return (
		<button
			onClick={googleAuth}
			type="button"
			className={`${btnClass} flex justify-center	 bg-google-bg hover:bg-google-bg/80`}
		>
			<GoogleIcon />
			Sign in with Google
		</button>
	);
};

export { GoogleButton };
