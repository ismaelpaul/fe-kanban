import TextInput from '../Input/TextInput';
import PasswordInput from '../Input/PasswordInput';
import Button from '../Button/Button';
import { zodResolver } from '@hookform/resolvers/zod';
import { SubmitHandler, useForm } from 'react-hook-form';
import { RegisterSchema } from '../../models/Auth';
import { Register } from '../../interfaces/IAuth';

const RegisterForm = () => {
	const inputClass =
		' border border-medium-grey border-opacity-25 rounded px-4 py-2 text-l-body w-full cursor-pointer hover:border-purple focus:outline-none';
	const labelClass = 'text-body text-medium-grey font-bold';
	const btnClass =
		'text-white text-13px py-2 w-full rounded-full transition ease-in duration-200';

	const {
		register,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm<Register>({
		resolver: zodResolver(RegisterSchema),
	});

	const submitData: SubmitHandler<Register> = async (data) => {
		console.log(data, '<<<');
		reset();
	};

	const onSubmit = handleSubmit(submitData);
	console.log(errors, '<<<<<<<< errors');

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
			<label className={labelClass}>Email</label>
			<TextInput
				name="email"
				register={register}
				className={inputClass}
				placeholder={'Email'}
				autoComplete="off"
			/>
			<label htmlFor="password" className={labelClass}>
				Password
			</label>
			<PasswordInput
				register={register}
				name="password"
				className={inputClass}
				placeholder={'Passowrd'}
			/>
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
