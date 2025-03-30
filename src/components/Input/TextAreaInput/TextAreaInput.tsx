import { FieldValues, Path, UseFormRegister } from 'react-hook-form';

type TextAreaInputProps<T extends FieldValues> = {
	register: UseFormRegister<T>;
	name: Path<T>;
	className: string;
	placeholder?: string | undefined;
	defaultValue?: string | undefined;
};

const TextAreaInput = <T extends FieldValues>({
	register,
	name,
	...inputProps
}: TextAreaInputProps<T>) => {
	return <textarea id={name} {...register(name)} {...inputProps} />;
};

export { TextAreaInput };
