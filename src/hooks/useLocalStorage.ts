import { useState, useEffect } from 'react';

type InitialValue<T> = T | (() => T);

function useLocalStorage<T>(key: string, initialValue: InitialValue<T>) {
	const [storedValue, setStoredValue] = useState<T>(() => {
		try {
			// Get the stored value from localStorage using the key
			const item = window.localStorage.getItem(key);
			// Parse the stored JSON or return the initialValue if not found
			return item
				? JSON.parse(item)
				: initialValue instanceof Function
				? initialValue()
				: initialValue;
		} catch (error) {
			// If there's an error, return the initialValue
			console.error(error);
			return initialValue instanceof Function ? initialValue() : initialValue;
		}
	});

	// Function to update the localStorage value
	const setValue = (value: T | ((val: T) => T)) => {
		try {
			// If the value is a function, compute it first
			const valueToStore =
				value instanceof Function ? value(storedValue) : value;
			// Update the state
			setStoredValue(valueToStore);
			// Store the value in localStorage
			window.localStorage.setItem(key, JSON.stringify(valueToStore));
		} catch (error) {
			console.error(error);
		}
	};

	useEffect(() => {
		// Add a storage event listener to handle changes from other tabs/windows
		const handleStorageChange = (e: StorageEvent) => {
			if (e.key === key) {
				try {
					// Parse the new value from storage and update the state
					const newValue = JSON.parse(e.newValue || 'null');
					setStoredValue(newValue);
				} catch (error) {
					console.error(error);
				}
			}
		};

		// Subscribe to the "storage" event
		window.addEventListener('storage', handleStorageChange);

		return () => {
			// Clean up the event listener when the component unmounts
			window.removeEventListener('storage', handleStorageChange);
		};
	}, [key]);

	return [storedValue, setValue] as const;
}

export default useLocalStorage;
