import { Switch } from '@headlessui/react';
import { useState } from 'react';

const ToggleTheme = () => {
	const [enabled, setEnabled] = useState(false);
	return (
		<>
			<Switch
				checked={enabled}
				onChange={setEnabled}
				className="bg-purple relative inline-flex h-6 w-11 items-center rounded-full"
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

export default ToggleTheme;
