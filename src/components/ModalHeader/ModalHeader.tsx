import KebabMenuIcon from '../SVGComponents/KebabMenuIcon';

type ModalHeaderProps = {
	title: string;
	handleKebabMenu: () => void;
};

const ModalHeader = ({ title, handleKebabMenu }: ModalHeaderProps) => {
	return (
		<div className="flex items-center justify-between gap-4">
			<h1 className="text-l-heading dark:text-white">{title}</h1>
			<div onClick={handleKebabMenu} className="cursor-pointer">
				<KebabMenuIcon />
			</div>
		</div>
	);
};

export default ModalHeader;
