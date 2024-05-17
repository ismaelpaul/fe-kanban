import { Link } from 'react-router-dom';
import GithubIcon from '../../components/SVGComponents/GithubIcon';
import GoogleIcon from '../../components/SVGComponents/GoogleIcon';
import Card from '../../components/Card/Card';
import RegisterForm from '../../components/Form/RegisterForm';

const Register = () => {
	const cardClass = 'bg-white drop-shadow-card px-4 py-6 rounded-lg w-[50rem]';

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
					<h1 className="text-m-heading text-center mb-4">Sign up</h1>
					<div className="flex items-center">
						<div className="w-[50%]">
							<RegisterForm />
						</div>

						<div className="flex flex-col items-center gap-2 mx-4 py-6">
							<div className="border-l-2 h-36 border-medium-grey/10" />
							<span className="p-2 text-13px text-medium-grey">OR</span>
							<div className="border-l-2 h-36 border-medium-grey/10" />
						</div>

						<div className="flex flex-col gap-4 flex-grow">
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
					</div>
				</>
			</Card>
			<span className="text-13px text-white mt-3">
				Already have an account?
				<Link to="/login">
					<strong> Login</strong>
				</Link>
			</span>
		</div>
	);
};

export default Register;
