import useWindowDimensions from '../../hooks/useWindowDimensions';

interface ButtonProps {
	buttonClass: string;
	buttonText?: string | null;
	svgComponent?: React.ReactNode;
	onClick?: () => void;
	type?: 'button' | 'submit' | 'reset';
	form?: string;
	disabled?: boolean;
	'data-cy'?: string;
}

const Button = ({
	buttonClass,
	buttonText,
	svgComponent,
	onClick,
	type,
	form,
	disabled,
	'data-cy': dataCy,
}: ButtonProps) => {
	const { width } = useWindowDimensions();

	const isMobile = width < 768;
	return (
		<button
			type={type}
			form={form}
			onClick={onClick}
			className={buttonClass}
			disabled={disabled}
			data-cy={dataCy}
		>
			{isMobile && svgComponent ? <>{svgComponent}</> : buttonText}
		</button>
	);
};

export default Button;
