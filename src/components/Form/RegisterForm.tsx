import TextInput from '../Input/TextInput';
import PasswordInput from '../Input/PasswordInput';
import Button from '../Button/Button';
import { zodResolver } from '@hookform/resolvers/zod';
import { SubmitHandler, useForm } from 'react-hook-form';
import { RegisterSchema } from '../../models/Auth';
import { RegisterUser } from '../../interfaces/IAuth';
import { registerUser } from '../../api/kanbanApi';

const RegisterForm = () => {
	const inputClass =
		' border border-medium-grey border-opacity-25 rounded px-4 py-2 mt-1 mb-2 text-l-body w-full cursor-pointer hover:border-purple focus:outline-none';
	const labelClass = 'text-s-heading text-black font-medium';
	const errorClass = 'text-red text-l-body absolute';
	const btnClass =
		'text-white text-13px py-2 w-full rounded-full transition ease-in duration-200';

	const {
		register,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm<RegisterUser>({
		resolver: zodResolver(RegisterSchema),
	});

	const submitData: SubmitHandler<RegisterUser> = async (data) => {
		await registerUser(data);
		reset();
	};

	const onSubmit = handleSubmit(submitData);

	return (
		<form id="register-form" onSubmit={onSubmit}>
			<div className="flex gap-4">
				<div className="flex flex-col w-full">
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
						<span className={errorClass}>{errors.firstName.message}</span>
					)}
				</div>
				<div className="flex flex-col w-full">
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
						<span className={errorClass}>{errors.lastName.message}</span>
					)}
				</div>
			</div>
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
				<span className={errorClass}>{errors.email.message}</span>
			)}
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
				<span className={`${errorClass} right-16 bottom-44`}>
					{errors.password.message}
				</span>
			)}
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
				<span className={`${errorClass} right-16 top-44`}>
					{errors.confirmPassword.message}
				</span>
			)}
			<Button
				form="register-form"
				type={'submit'}
				buttonText={'Sign up'}
				buttonClass={`${btnClass} bg-purple hover:bg-purple-hover font-bold`}
			/>
		</form>
	);
};

export default RegisterForm;
