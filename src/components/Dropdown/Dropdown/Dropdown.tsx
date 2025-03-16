import { useRef, useState } from 'react';

import { Options } from '@/interfaces/IOptionsDropdown';

import { useClickOutside } from '@/hooks';

import { ChevronDown } from '@/components/SVGComponents/ChevronDown';
import { ChevronUp } from '@/components/SVGComponents/ChevronUp';
import { DropdownActions } from '../DropdownActions';
import { DropdownOptions } from '../DropdownOptions';

export interface Action {
	label: string;
	onClick: () => void;
}

type DropDownProps = {
	selectedOption: Options;
	options: Options[];
	setSelectedOption?: (arg: Options) => void;
	disabled?: boolean;
	actions?: Action[];
};

const Dropdown = ({
	selectedOption,
	options,
	setSelectedOption,
	disabled,
	actions,
}: DropDownProps) => {
	const [isOpen, setIsOpen] = useState(false);

	const modalRef = useRef(null);
	useClickOutside(modalRef, () => setIsOpen(false));

	return (
		<div
			ref={modalRef}
			className="flex items-center gap-2 relative cursor-pointer mt-2"
		>
			<button
				type="button"
				className="flex items-center justify-between border border-medium-grey border-opacity-25 px-4 py-3 gap-2 rounded w-full focus:border-purple"
				onClick={() => setIsOpen(!isOpen)}
				disabled={disabled}
			>
				<span
					className={`text-l-body leading-[100%] ${
						disabled ? 'text-medium-grey' : 'dark:text-white'
					}`}
				>
					{selectedOption?.label}
				</span>
				{isOpen ? <ChevronUp /> : <ChevronDown />}
			</button>
			{isOpen && (
				<ul className="flex flex-col gap-2 bg-white absolute w-auto min-w-[10rem] rounded-lg top-14 p-4">
					<DropdownOptions
						options={options}
						disabled={disabled}
						setIsOpen={setIsOpen}
						setSelectedOption={setSelectedOption}
					/>

					{actions && (
						<>
							<hr className="border-medium-grey/30" />
							<DropdownActions setIsOpen={setIsOpen} actions={actions} />
						</>
					)}
				</ul>
			)}
		</div>
	);
};

export { Dropdown };
