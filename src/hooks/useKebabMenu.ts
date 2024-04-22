import { useState } from 'react';

const useKebabMenu = () => {
	const [isKebabMenuOpen, setIsKebabMenuOpen] = useState(false);

	const handleKebabMenu = () => {
		setIsKebabMenuOpen(!isKebabMenuOpen);
	};

	return { isKebabMenuOpen, handleKebabMenu, setIsKebabMenuOpen };
};

export default useKebabMenu;
