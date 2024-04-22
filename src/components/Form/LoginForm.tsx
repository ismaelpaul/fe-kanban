import PasswordInput from '../Input/PasswordInput';
import TextInput from '../Input/TextInput';
import Button from '../Button/Button';
import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Login } from '../../interfaces/IAuth';
import { LoginSchema } from '../../models/Auth';

const LoginForm = () => {
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
	} = useForm<Login>({
		resolver: zodResolver(LoginSchema),
	});

	const submitData: SubmitHandler<Login> = async (data) => {
		console.log(data, '<<<');
		reset();
	};

	const onSubmit = handleSubmit(submitData);

	return (
		<form id="login-form" onSubmit={onSubmit}>
			<label htmlFor="email" className={labelClass}>
				Email
			</label>
			<TextInput name="email" register={register} className={inputClass} />
			{errors.email && (
				<span className={`${errorClass} right-6 mt-2`}>
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
			/>
			{errors.email && (
				<span className={`${errorClass} right-6 mt-2`}>
					{errors.email.message}
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

export default LoginForm;
