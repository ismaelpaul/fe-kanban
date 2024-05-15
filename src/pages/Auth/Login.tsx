import Card from '../../components/Card/Card';
import { Link } from 'react-router-dom';
import GoogleIcon from '../../components/SVGComponents/GoogleIcon';
import GithubIcon from '../../components/SVGComponents/GithubIcon';
import LoginForm from '../../components/Form/LoginForm';

const Login = () => {
	const cardClass = 'bg-white drop-shadow-card px-4 py-6 rounded-lg w-[25rem]';

	const btnClass =
		'text-white text-13px py-2 w-full rounded-full transition ease-in duration-200';

	const baseUrl = import.meta.env.VITE_BASE_URL;

	const googleAuth = () => {
		window.open(`${baseUrl}/auth/google`, '_self');
	};
	const githubAuth = () => {
		window.open(`${baseUrl}/auth/github`, '_self');
	};
	return (
		<div className="min-h-screen bg-dark-grey flex flex-col items-center justify-center">
			<Card cardClass={cardClass}>
				<>
					<h1 className="text-m-heading text-center mb-4">
						Choose a Login Method
					</h1>
					<div>
						<LoginForm />
						<div className="flex items-center gap-2 my-4">
							<hr className="h-px w-full bg-lines-light border-0" />
							<span className="px-2 text-13px text-medium-grey">or</span>
							<hr className="h-px w-full bg-lines-light border-0" />
						</div>
						<div className="flex flex-col gap-4">
							<button
								onClick={googleAuth}
								type="button"
								className={`${btnClass} flex justify-center	 bg-google-bg hover:bg-google-bg/80`}
							>
								<GoogleIcon />
								Sign in with Google
							</button>

							<button
								onClick={githubAuth}
								type="button"
								className={`${btnClass} flex justify-center	 bg-github-bg hover:bg-github-bg/80`}
							>
								<GithubIcon />
								Sign in with GitHub
							</button>
						</div>
					</div>
				</>
			</Card>
			<span className="text-13px text-white mt-3">
				Don't have an account yet?
				<Link to="/register">
					<strong> Register</strong>
				</Link>
			</span>
		</div>
	);
};

export default Login;
