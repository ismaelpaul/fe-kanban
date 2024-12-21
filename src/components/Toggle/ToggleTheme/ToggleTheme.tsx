import { useState } from 'react';
import { Switch } from '@headlessui/react';
import { useColorMode } from '@/hooks';

const ToggleTheme = () => {
	const [colorMode, setColorMode] = useColorMode();

	const [enabled, setEnabled] = useState(colorMode === 'dark' ? true : false);

	const handleToggle = () => {
		(setColorMode as (value: string) => void)(!enabled ? 'dark' : 'light');
		setEnabled(!enabled);
	};

	return (
		<>
			<Switch
				checked={enabled}
				onChange={handleToggle}
				className="bg-purple transition ease-in-out duration-300 hover:bg-purple-hover relative inline-flex h-6 w-11 items-center rounded-full cursor-pointer"
			>
				<span
					className={`${
						enabled ? 'translate-x-6' : 'translate-x-1'
					} inline-block h-4 w-4 transform rounded-full bg-white transition`}
				/>
			</Switch>
		</>
	);
};

export { ToggleTheme };
