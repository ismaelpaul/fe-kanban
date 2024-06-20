import { useState } from 'react';
import EyeIconShow from '../SVGComponents/EyeIconShow';
import EyeIconHide from '../SVGComponents/EyeIconHide';
import { FieldValues, UseFormRegister, Path } from 'react-hook-form';

type PasswordInputProps<T extends FieldValues> = {
	register: UseFormRegister<T>;
	name: Path<T>;
	className: string;
	placeholder?: string | undefined;
	autoComplete?: string;
};

const PasswordInput = <T extends FieldValues>({
	register,
	name,
	...inputProps
}: PasswordInputProps<T>) => {
	const [isVisible, setIsVisible] = useState(false);

	const handleToggle = () => {
		setIsVisible(!isVisible);
	};

	return (
		<div className="flex relative">
			<input
				type={isVisible ? 'text' : 'password'}
				autoComplete="current-password"
				{...register(name)}
				{...inputProps}
				data-cy="password-input"
			/>
			<button
				type="button"
				className="flex justify-around items-center absolute top-[0.9rem] right-4"
				onClick={handleToggle}
				data-cy="hide-show-password"
			>
				{isVisible ? <EyeIconShow /> : <EyeIconHide />}
			</button>
		</div>
	);
};

export default PasswordInput;
