const LoadingSpinner = () => {
	return (
		<svg className="animate-spin h-10 w-10 text-purple" viewBox="0 0 24 24">
			<circle
				className="opacity-25"
				cx="12"
				cy="12"
				r="10"
				stroke="currentColor"
				strokeWidth="4"
				fill="none"
			/>
			<circle
				className="opacity-75"
				cx="12"
				cy="12"
				r="10"
				stroke="currentColor"
				strokeWidth="4"
				strokeDasharray="60"
				strokeDashoffset="15"
				fill="none"
			/>
		</svg>
	);
};

export { LoadingSpinner };
