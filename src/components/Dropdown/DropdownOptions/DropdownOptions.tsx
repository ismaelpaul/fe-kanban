import { Options } from '@/interfaces/IOptionsDropdown';
import React from 'react';

type DropdownOptionsProps = {
	options: Options[];
	disabled?: boolean;
	setSelectedOption?: (arg: Options) => void;
	setIsOpen: (arg: boolean) => void;
};

const DropdownOptions = ({
	options,
	disabled,
	setSelectedOption,
	setIsOpen,
}: DropdownOptionsProps) => {
	const handleOptionClick = (option: Options) => {
		if (!disabled) {
			setSelectedOption!(option);
			setIsOpen(false);
		}
	};
	return (
		<>
			{options.map((option, index) => {
				return (
					<React.Fragment key={index}>
						<li
							className={`text-l-body text-medium-grey ${
								disabled ? 'cursor-not-allowed' : 'cursor-pointer'
							}`}
							onClick={() => handleOptionClick(option)}
						>
							{option.label}
						</li>
					</React.Fragment>
				);
			})}
		</>
	);
};

export { DropdownOptions };
