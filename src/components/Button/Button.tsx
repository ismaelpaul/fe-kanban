interface ButtonProps {
	buttonClass: string;
	buttonText?: string;
	svgComponent?: React.ReactNode;
	onClick?: () => void;
	type?: 'button' | 'submit' | 'reset';
}

const Button = ({
	buttonClass,
	buttonText,
	svgComponent,
	onClick,
	type,
}: ButtonProps) => {
	return (
		<button type={type} onClick={onClick} className={buttonClass}>
			{svgComponent && <>{svgComponent}</>}
			{buttonText}
		</button>
	);
};

export default Button;
