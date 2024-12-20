import { GithubIcon } from '@/components/SVGComponents/GithubIcon';

const GithubButton = () => {
	const authUrl = import.meta.env.VITE_AUTH_URL;

	const githubAuth = () => {
		window.open(`${authUrl}/auth/github`, '_self');
	};

	const btnClass =
		'text-white text-13px py-2 w-full rounded-full transition ease-in duration-200';

	return (
		<button
			onClick={githubAuth}
			type="button"
			className={`${btnClass} flex justify-center	 bg-github-bg hover:bg-github-bg/80`}
		>
			<GithubIcon />
			Sign in with GitHub
		</button>
	);
};

export { GithubButton };
