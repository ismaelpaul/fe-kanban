import { FieldValues, Path, UseFormRegister } from 'react-hook-form';

type TextInputProps<T extends FieldValues> = {
	register: UseFormRegister<T>;
	name: Path<T>;
	className: string;
	placeholder?: string | undefined;
	defaultValue: string | undefined;
	'data-cy'?: string;
};

const TextAreaInput = <T extends FieldValues>({
	register,
	name,
	'data-cy': dataCy,
	...inputProps
}: TextInputProps<T>) => {
	return <textarea {...register(name)} {...inputProps} data-cy={dataCy} />;
};

export default TextAreaInput;
