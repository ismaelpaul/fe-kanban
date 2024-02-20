import Button from '../../components/Button/Button';
import Card from '../../components/Card/Card';
import { Link } from 'react-router-dom';
import GoogleIcon from '../../components/SVGComponents/GoogleIcon';
import GithubIcon from '../../components/SVGComponents/GithubIcon';

const Login = () => {
	const cardClass =
		'bg-white drop-shadow-card px-4 py-6 rounded-lg max-w-[25%]';
	const inputClass =
		' border border-medium-grey border-opacity-25 rounded px-4 py-2 text-l-body w-full cursor-pointer hover:border-purple focus:outline-none';
	const labelClass = 'text-body text-medium-grey font-bold';

	const btnLoginClass =
		'bg-purple text-white text-13px font-bold py-2 w-full rounded-full';

	const google = () => {
		window.open('http://localhost:9090/auth/google', '_self');
	};
	return (
		<div className="min-h-screen bg-dark-grey flex items-center justify-center">
			<Card cardClass={cardClass}>
				<>
					<h1>Choose a Login Method</h1>
					<div>
						<div>
							<label htmlFor="email" className={labelClass}>
								Email
							</label>
							<input type="text" placeholder="Email" className={inputClass} />
							<label htmlFor="password" className={labelClass}>
								Password
							</label>
							<input
								type="text"
								placeholder="Password"
								className={inputClass}
							/>
							<Button buttonText={'Login'} buttonClass={btnLoginClass} />
						</div>
						<div className="flex items-center gap-2 my-4">
							<hr className="h-px w-full bg-lines-light border-0" />
							<span className="px-2">or</span>
							<hr className="h-px w-full bg-lines-light border-0" />
						</div>
						<div className="flex flex-col gap-4">
							<button
								onClick={google}
								type="button"
								className="py-2 px-4 flex justify-center items-center  bg-google-bg hover:bg-red-700 focus:ring-red-500 focus:ring-offset-red-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none rounded-lg "
							>
								<GoogleIcon />
								Sign in with Google
							</button>

							<button
								type="button"
								className="py-2 px-4 flex justify-center items-center  bg-github-bg hover:bg-gray-700 focus:ring-gray-500 focus:ring-offset-gray-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none rounded-lg "
							>
								<GithubIcon />
								Sign in with GitHub
							</button>
						</div>
						<hr className="h-px my-4 bg-lines-light border-0" />
						<span>
							Don't have an account yet?
							<Link to="/register">
								<strong> Register</strong>
							</Link>
						</span>
					</div>
				</>
			</Card>
		</div>
	);
};

export default Login;
