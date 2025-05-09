import { zodResolver } from '@hookform/resolvers/zod';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import { registerUser } from '@/api/kanbanApi';

import { RegisterUser } from '@/interfaces/IAuth';

import { RegisterSchema } from '@/models/Auth';

import { useToast } from '@/hooks';

import { Button } from '@/components/Button';
import { PasswordInput } from '@/components/Input/PasswordInput';
import { TextInput } from '@/components/Input/TextInput';

const RegisterForm = () => {
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
	} = useForm<RegisterUser>({
		resolver: zodResolver(RegisterSchema),
	});

	const submitData: SubmitHandler<RegisterUser> = async (data) => {
		try {
			await registerUser(data);
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
		<form id="register-form" onSubmit={onSubmit}>
			<div className="relative">
				<label htmlFor="firstName" className={labelClass}>
					First Name
				</label>
				<TextInput
					name="firstName"
					register={register}
					className={`${inputClass} ${
						errors.firstName ? 'border border-red/100' : ''
					}`}
					placeholder={errors.firstName ? '' : 'Enter your first name'}
					autoComplete="given-name"
				/>
				{errors.firstName && (
					<span className={`${errorClass} top-[2.2rem] right-4`}>
						{errors.firstName.message}
					</span>
				)}
			</div>

			<div className="relative">
				<label htmlFor="lastName" className={labelClass}>
					Last Name
				</label>
				<TextInput
					name="lastName"
					register={register}
					className={`${inputClass} ${
						errors.lastName ? 'border border-red/100' : ''
					}`}
					placeholder={errors.lastName ? '' : 'Enter your last name'}
					autoComplete="family-name"
				/>
				{errors.lastName && (
					<span className={`${errorClass} top-[2.2rem] right-4`}>
						{errors.lastName.message}
					</span>
				)}
			</div>

			<div className="relative">
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
					<span className={`${errorClass} top-[2.2rem] right-4`}>
						{errors.email.message}
					</span>
				)}
			</div>

			<div className="relative">
				<label htmlFor="password" className={labelClass}>
					Password
				</label>
				<PasswordInput
					register={register}
					name="password"
					className={`${inputClass} ${
						errors.password ? 'border border-red/100' : ''
					}`}
					placeholder={errors.password ? '' : 'Enter your password'}
					autoComplete="off"
				/>
				{errors.password && (
					<span className={`${errorClass} top-[2.2rem] right-12`}>
						{errors.password.message}
					</span>
				)}
			</div>

			<div className="relative">
				<label htmlFor="confirmPassword" className={labelClass}>
					Confirm Password
				</label>
				<PasswordInput
					register={register}
					name="confirmPassword"
					className={`${inputClass} mb-6 ${
						errors.confirmPassword ? 'border border-red/100' : ''
					}`}
					placeholder={errors.confirmPassword ? '' : 'Confirm your password'}
					autoComplete="off"
				/>
				{errors.confirmPassword && (
					<span className={`${errorClass} top-[2.2rem] right-12`}>
						{errors.confirmPassword.message}
					</span>
				)}
			</div>
			<Button
				form="register-form"
				type={'submit'}
				buttonText={'Sign up'}
				buttonClass={`${btnClass} bg-purple hover:bg-purple-hover font-bold`}
			/>
		</form>
	);
};

export { RegisterForm };
