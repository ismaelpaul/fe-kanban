interface ButtonProps {
	buttonClass: string;
	buttonText?: string;
	svgComponent?: React.ReactNode;
	onClick?: () => void;
}

const Button = ({
	buttonClass,
	buttonText,
	svgComponent,
	onClick,
}: ButtonProps) => {
	return (
		<button onClick={onClick} className={buttonClass}>
			{svgComponent && <>{svgComponent}</>}
			{buttonText}
		</button>
	);
};

export default Button;
