import React from 'react';
import { useState } from 'react';
import ChevronUp from '../SVGComponents/ChevronUp';
import ChevronDown from '../SVGComponents/ChevronDown';

interface Options {
	label: string;
	value: string;
}

interface DropDownProps {
	selectedOption: string;
	options: Options[];
	isDisabled: boolean;
	setSelectedOption: (arg: string) => void;
}
const Dropdown = ({
	selectedOption,
	options,
	isDisabled,
	setSelectedOption,
}: DropDownProps) => {
	const [isOpen, setIsOpen] = useState(false);

	const handleOptionClick = (option: Options) => {
		setSelectedOption(option.label);
		setIsOpen(false);
	};

	return (
		<div className="flex items-center gap-2 relative cursor-pointer">
			<button
				className="flex items-center justify-between border border-medium-grey border-opacity-25 px-4 py-3 rounded w-full"
				onClick={() => (!isDisabled ? setIsOpen(!isOpen) : '')}
			>
				<span className="text-l-body dark:text-white">{selectedOption}</span>
				{isOpen ? <ChevronUp /> : <ChevronDown />}
			</button>
			{isOpen && (
				<ul className="flex flex-col gap-2 bg-white absolute w-full rounded-lg top-14 p-4">
					{options.map((option, index) => {
						return (
							<React.Fragment key={index}>
								<li
									className="text-l-body text-medium-grey"
									onClick={() => handleOptionClick(option)}
								>
									{option.label}
								</li>
							</React.Fragment>
						);
					})}
				</ul>
			)}
		</div>
	);
};

export default Dropdown;
