import { FieldValues, Path, UseFormRegister } from 'react-hook-form';

type TextInputProps<T extends FieldValues> = {
	register: UseFormRegister<T>;
	name: Path<T>;
	className: string;
	placeholder?: string | undefined;
	defaultValue: string | undefined;
};

const TextAreaInput = <T extends FieldValues>({
	register,
	name,
	...inputProps
}: TextInputProps<T>) => {
	return <textarea {...register(name)} {...inputProps} />;
};

export { TextAreaInput };
