import { Link } from 'react-router-dom';
import GithubIcon from '../../components/SVGComponents/GithubIcon';
import GoogleIcon from '../../components/SVGComponents/GoogleIcon';
import Card from '../../components/Card/Card';
import RegisterForm from '../../components/Form/RegisterForm';

const Register = () => {
	const cardClass =
		'bg-white drop-shadow-card px-4 py-6 rounded-lg max-w-[25%]';

	const btnClass =
		'text-white text-13px py-2 w-full rounded-full transition ease-in duration-200';

	const googleAuth = () => {
		window.open('http://localhost:9090/auth/google', '_self');
	};
	const githubAuth = () => {
		window.open('http://localhost:9090/auth/github', '_self');
	};
	return (
		<div className="min-h-screen bg-dark-grey flex flex-col items-center justify-center">
			<Card cardClass={cardClass}>
				<>
					<h1>Sign up</h1>
					<RegisterForm />
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
							Sign up with Google
						</button>

						<button
							onClick={githubAuth}
							type="button"
							className={`${btnClass} flex justify-center	 bg-github-bg hover:bg-github-bg/80`}
						>
							<GithubIcon />
							Sign up with GitHub
						</button>
					</div>
				</>
			</Card>
			<span className="text-13px text-white">
				Already have an account?
				<Link to="/login">
					<strong> Login</strong>
				</Link>
			</span>
		</div>
	);
};

export default Register;
