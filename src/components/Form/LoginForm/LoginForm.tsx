import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate } from 'react-router-dom';

import { loginUser } from '@/api/kanbanApi';

import { useToast } from '@/hooks';

import { LoginUser } from '@/interfaces/IAuth';

import { LoginSchema } from '@/models/Auth';

import { TextInput } from '@/components/Input/TextInput';
import { PasswordInput } from '@/components/Input/PasswordInput';
import { Button } from '@/components/Button';

const LoginForm = () => {
	const inputClass =
		' border border-medium-grey border-opacity-25 rounded px-4 py-2 mt-1 mb-2 text-l-body w-full cursor-pointer hover:border-purple focus:outline-none';
	const labelClass = 'text-s-heading text-black font-medium';
	const errorClass = 'text-red text-l-body absolute';
	const btnClass =
		'text-white text-13px py-2 w-full rounded-full transition ease-in duration-200';

	const navigate = useNavigate();
	const toast = useToast();
	const {
		register,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm<LoginUser>({
		resolver: zodResolver(LoginSchema),
	});

	const submitData: SubmitHandler<LoginUser> = async (data) => {
		try {
			await loginUser(data);
			navigate('/dashboard');
			reset();
		} catch (error) {
			if (error instanceof Error) {
				toast.error(error.message);
			}
		}
	};

	const onSubmit = handleSubmit(submitData);

	return (
		<form id="login-form" onSubmit={onSubmit}>
			<label className={labelClass}>Email</label>
			<TextInput
				name="email"
				register={register}
				className={`${inputClass} ${
					errors.email ? 'border border-red/100' : ''
				}`}
				placeholder={errors.email ? '' : 'Enter your email'}
			/>
			{errors.email && (
				<span className={`${errorClass} right-6 mt-3`}>
					{errors.email.message}
				</span>
			)}
			<label htmlFor="password" className={labelClass}>
				Password
			</label>
			<PasswordInput
				register={register}
				name="password"
				className={`${inputClass} mb-6 ${
					errors.password ? 'border border-red/100' : ''
				}`}
				placeholder={errors.password ? '' : 'Enter your password'}
				autoComplete="off"
			/>
			{errors.password && (
				<span className={`${errorClass} right-16 top-44`}>
					{errors.password.message}
				</span>
			)}
			<Button
				type="submit"
				buttonText={'Login'}
				buttonClass={`${btnClass} bg-purple hover:bg-purple-hover font-bold`}
			/>
		</form>
	);
};

export { LoginForm };
