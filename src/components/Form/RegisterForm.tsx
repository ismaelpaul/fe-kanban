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
		' border border-medium-grey border-opacity-25 rounded px-4 py-2 text-l-body w-full cursor-pointer hover:border-purple focus:outline-none';
	const labelClass = 'text-body text-medium-grey font-bold';
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
			<label htmlFor="firstName" className={labelClass}>
				First Name
			</label>
			<TextInput
				name="firstName"
				register={register}
				className={inputClass}
				placeholder={'First name'}
				autoComplete="given-name"
			/>
			{errors.firstName && (
				<span className={`${errorClass} right-6 mt-[2.2rem]`}>
					{errors.firstName.message}
				</span>
			)}
			<label htmlFor="lastName" className={labelClass}>
				Last Name
			</label>
			<TextInput
				name="lastName"
				register={register}
				className={inputClass}
				placeholder={'Last name'}
				autoComplete="family-name"
			/>
			{errors.lastName && (
				<span className={`${errorClass} right-6 mt-[2.2rem]`}>
					{errors.lastName.message}
				</span>
			)}
			<label className={labelClass}>Email</label>
			<TextInput
				name="email"
				register={register}
				className={inputClass}
				placeholder={'Email'}
			/>
			{errors.email && (
				<span className={`${errorClass} right-6 mt-[2.2rem]`}>
					{errors.email.message}
				</span>
			)}
			<label htmlFor="password" className={labelClass}>
				Password
			</label>
			<PasswordInput
				register={register}
				name="password"
				className={inputClass}
				placeholder={'Password'}
				autoComplete="off"
			/>
			{errors.password && (
				<span className={`${errorClass} right-6 mt-[2.2rem]`}>
					{errors.password.message}
				</span>
			)}
			<label htmlFor="confirmPassword" className={labelClass}>
				Confirm Password
			</label>
			<PasswordInput
				register={register}
				name="confirmPassword"
				className={inputClass}
				placeholder={'Confirm Password'}
				autoComplete="off"
			/>
			{errors.confirmPassword && (
				<span className={`${errorClass} right-6 mt-[2.2rem]`}>
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
