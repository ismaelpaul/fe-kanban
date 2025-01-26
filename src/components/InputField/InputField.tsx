import {
	FieldError,
	FieldValues,
	UseFormRegister,
	Path,
} from 'react-hook-form';

type InputFieldProps<T extends FieldValues> = {
	register: UseFormRegister<T>;
	label?: string;
	name: Path<T>;
	placeholder?: string | undefined;
	defaultValue?: string | undefined;
	autoComplete?: string;
	errors: FieldError | undefined;
	errorPosition?: string;
	type:
		| 'text'
		| 'textarea'
		| 'password'
		| 'email'
		| 'number'
		| 'url'
		| 'hidden';
};

const InputField = <T extends FieldValues>({
	label,
	register,
	name,
	type,
	errors,
	errorPosition,
	...inputProps
}: InputFieldProps<T>) => {
	const inputId = String(name);
	const inputClass =
		'dark:bg-dark-grey dark:text-white border border-medium-grey border-opacity-25 rounded px-4 py-2 text-l-body w-full cursor-pointer hover:border-purple focus:outline-none';
	return (
		<div className="flex flex-col gap-2 mb-6 relative">
			{label && (
				<label
					htmlFor={inputId}
					className="text-body text-medium-grey dark:text-white font-bold"
				>
					{label}
				</label>
			)}
			{type === 'textarea' ? (
				<textarea
					id={inputId}
					{...register(name)}
					{...inputProps}
					className={`${inputClass} ${errors ? 'border border-red/100' : ''}`}
				/>
			) : (
				<input
					id={inputId}
					type={type}
					{...register(name)}
					{...inputProps}
					className={`${inputClass} ${errors ? 'border border-red/100' : ''}`}
				/>
			)}
			{errors && (
				<span
					className={`text-red text-l-body absolute ${
						errorPosition ? errorPosition : 'right-6 mt-[2.1rem]'
					} `}
				>
					{errors.message}
				</span>
			)}
		</div>
	);
};

export { InputField };
