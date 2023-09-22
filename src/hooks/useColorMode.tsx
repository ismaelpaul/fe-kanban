import { useEffect } from 'react';
import useLocalStorage from './useLocalStorage';

const useColorMode = () => {
	const [colorMode, setColorMode] = useLocalStorage('color-mode', 'light');

	useEffect(() => {
		const className = 'dark';
		const bodyClasses = window.document.body.classList;

		colorMode === 'dark'
			? bodyClasses.add(className)
			: bodyClasses.remove(className);
	}, [colorMode, setColorMode]);

	return [colorMode, setColorMode];
};

export default useColorMode;
