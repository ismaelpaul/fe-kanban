import { useState } from 'react';

import { EyeIconHide } from '@/components/SVGComponents/EyeIconHide';
import { EyeIconShow } from '@/components/SVGComponents/EyeIconShow';

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
			/>
			<button
				type="button"
				className="flex justify-around items-center absolute top-[0.9rem] right-4"
				onClick={handleToggle}
			>
				{isVisible ? <EyeIconShow /> : <EyeIconHide />}
			</button>
		</div>
	);
};

export { PasswordInput };
