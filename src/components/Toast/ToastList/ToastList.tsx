import { IToast } from '@/interfaces/IToast';

import { Toast } from '../Toast/Toast';

interface ToastsProps {
	toasts: IToast[];
}

const ToastList = ({ toasts }: ToastsProps) => {
	return (
		<aside className="flex flex-col-reverse fixed z-50 top-24 right-4">
			{toasts.map((toast) => (
				<Toast key={toast.id} {...toast} />
			))}
		</aside>
	);
};

export { ToastList };
