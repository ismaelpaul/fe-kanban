interface KebabMenuProps {
	editText: string;
	deleteText: string;
	menuPosition: string;
}

const KebabMenuModal = ({
	editText,
	deleteText,
	menuPosition,
}: KebabMenuProps) => {
	return (
		<div
			className={`flex flex-col gap-4 pl-4 py-[1.375rem] w-48 bg-white rounded-lg absolute drop-shadow-card ${menuPosition}`}
		>
			<span className="text-l-body text-medium-grey cursor-pointer">
				{editText}
			</span>
			<span className="text-l-body text-red cursor-pointer">{deleteText}</span>
		</div>
	);
};

export default KebabMenuModal;
