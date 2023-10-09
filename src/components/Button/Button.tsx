import useWindowDimensions from '../../hooks/useWindowDimensions';

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
	const { width } = useWindowDimensions();

	const isMobile = width < 768;
	return (
		<button type={type} onClick={onClick} className={buttonClass}>
			{isMobile && svgComponent ? <>{svgComponent}</> : buttonText}
		</button>
	);
};

export default Button;
