interface CheckIconProps {
	className: string;
}

const CheckIcon = ({ className }: CheckIconProps) => {
	return (
		<svg
			className={className}
			width="10"
			height="8"
			xmlns="http://www.w3.org/2000/svg"
		>
			<path
				stroke="#FFF"
				strokeWidth="2"
				fill="none"
				d="m1.276 3.066 2.756 2.756 5-5"
			/>
		</svg>
	);
};

export { CheckIcon };
