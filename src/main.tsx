import ReactDOM from 'react-dom/client';

import './index.css';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { ToastContextProvider } from './contexts/ToastContext/ToastContext.tsx';
import { App } from './App.tsx';

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			refetchOnWindowFocus: false,
			cacheTime: 1000 * 60 * 5,
		},
	},
});

ReactDOM.createRoot(document.getElementById('root')!).render(
	<QueryClientProvider client={queryClient}>
		<ToastContextProvider>
			<App />
		</ToastContextProvider>
		<ReactQueryDevtools initialIsOpen={true} />
	</QueryClientProvider>
);
