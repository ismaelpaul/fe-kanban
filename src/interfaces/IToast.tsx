export interface IToast {
	id: number;
	message: string;
	type: string;
	error: (message: string) => void;
	success: (message: string) => void;
	warning: (message: string) => void;
	remove: (id: number) => void;
}

// export interface IToast {
//     error: (message: string) => void;
//     success: (message: string) => void;
//     warning: (message: string) => void;
//   }
