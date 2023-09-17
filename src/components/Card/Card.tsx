interface CardProps {
	children: JSX.Element;
	cardClass: string;
}

const Card = ({ children, cardClass }: CardProps) => {
	return <article className={`card ${cardClass}`}>{children}</article>;
};

export default Card;
