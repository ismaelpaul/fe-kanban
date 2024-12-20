interface CardProps {
	children: JSX.Element;
	cardClass: string;
	onClick?: () => void;
}

const Card = ({ children, cardClass, onClick }: CardProps) => {
	return (
		<article onClick={onClick} className={`${cardClass}`}>
			{children}
		</article>
	);
};

export { Card };
