import { Link } from 'react-router-dom';

import { GithubButton, GoogleButton } from '@/components/Button';
import { Card } from '@/components/Card/Card';
import { LoginForm } from '@/components/Form/LoginForm';

const Login = () => {
	const cardClass = 'bg-white drop-shadow-card px-4 py-6 rounded-lg w-[25rem]';

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
							<GoogleButton />

							<GithubButton />
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

export { Login };
