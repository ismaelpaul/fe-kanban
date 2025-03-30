import { FieldValues, Path, UseFormRegister } from 'react-hook-form';

type TextInputProps<T extends FieldValues> = {
	register: UseFormRegister<T>;
	name: Path<T>;
	className: string;
	placeholder?: string | undefined;
	defaultValue?: string | undefined;
	autoComplete?: string;
};

const TextInput = <T extends FieldValues>({
	register,
	name,
	...inputProps
}: TextInputProps<T>) => {
	return <input id={name} type="text" {...register(name)} {...inputProps} />;
};

export { TextInput };
