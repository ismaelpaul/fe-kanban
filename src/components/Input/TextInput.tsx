import { FieldValues, Path, UseFormRegister } from 'react-hook-form';

type TextInputProps<T extends FieldValues> = {
	register: UseFormRegister<T>;
	name: Path<T>;
	className: string;
	placeholder?: string | undefined;
	defaultValue?: string | undefined;
	autoComplete?: string;
	'data-cy'?: string;
};

const TextInput = <T extends FieldValues>({
	register,
	name,
	'data-cy': dataCy,
	...inputProps
}: TextInputProps<T>) => {
	return (
		<input type="text" {...register(name)} {...inputProps} data-cy={dataCy} />
	);
};

export default TextInput;
