interface CardProps {
	children: JSX.Element;
	cardClass: string;
	onClick?: () => void;
	dataCy: string;
}

const Card = ({ children, cardClass, onClick, dataCy }: CardProps) => {
	return (
		<article onClick={onClick} className={`${cardClass}`} data-cy={dataCy}>
			{children}
		</article>
	);
};

export default Card;
