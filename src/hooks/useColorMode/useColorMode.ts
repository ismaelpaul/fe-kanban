import { useEffect } from 'react';
import { useLocalStorage } from '@/hooks/useLocalStorage';

const useColorMode = () => {
	const [colorMode, setColorMode] = useLocalStorage(
		'color-mode',
		typeof window !== 'undefined' &&
			window.matchMedia('(prefers-color-scheme: dark)').matches
			? 'dark'
			: 'light'
	);

	useEffect(() => {
		const className = 'dark';
		const bodyClasses = window.document.body.classList;

		colorMode === 'dark'
			? bodyClasses.add(className)
			: bodyClasses.remove(className);
	}, [colorMode]);

	useEffect(() => {
		const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
		const handleChange = (e: MediaQueryListEvent) => {
			if (!localStorage.getItem('color-mode')) {
				setColorMode(e.matches ? 'dark' : 'light');
			}
		};

		mediaQuery.addEventListener('change', handleChange);
		return () => mediaQuery.removeEventListener('change', handleChange);
	}, [setColorMode]);

	return [colorMode, setColorMode];
};

export { useColorMode };
