import { useEffect } from 'react';

const useClickOutside = <T extends HTMLElement>(
	ref: React.RefObject<T>,
	callback: () => void
) => {
	useEffect(() => {
		function handleClickOutside(event: MouseEvent) {
			if (ref.current && !ref.current.contains(event.target as Node)) {
				callback();
			}
		}
		document.addEventListener('mousedown', handleClickOutside);

		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, [ref, callback]);
};

export { useClickOutside };
