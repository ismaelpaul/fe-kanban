export interface IToast {
	id: number;
	message: string;
	type: string;
}

export interface IToastTypes {
	error: (message: string) => void;
	success: (message: string) => void;
	warning: (message: string) => void;
	remove: (id: number) => void;
}
