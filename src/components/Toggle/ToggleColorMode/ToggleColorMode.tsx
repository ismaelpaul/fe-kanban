import { DarkTheme } from '@/components/SVGComponents/DarkTheme';
import { LightTheme } from '@/components/SVGComponents/LightTheme';
import { SwitchButton } from '@/components/SwitchButton';

const ToggleColorMode = () => {
	return (
		<div className="bg-light-bg dark:bg-dark-bg flex items-center justify-center gap-6 h-12 ml-6 rounded-md mt-4">
			<LightTheme />
			<SwitchButton />
			<DarkTheme />
		</div>
	);
};

export { ToggleColorMode };
