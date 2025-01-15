import { Action } from '../Dropdown/Dropdown';

type DropdownActionsProps = {
	setIsOpen: (arg: boolean) => void;
	actions: Action[];
};

const DropdownActions = ({ setIsOpen, actions }: DropdownActionsProps) => {
	const handleActionClick = (action: Action) => {
		action.onClick();
		setIsOpen(false);
	};

	return (
		<>
			{actions.map((action, index) => (
				<li
					key={index}
					className="text-l-body text-medium-grey cursor-pointer"
					onClick={() => handleActionClick(action)}
				>
					{action.label}
				</li>
			))}
		</>
	);
};

export { DropdownActions };
