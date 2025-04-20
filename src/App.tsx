import { AppRoutes } from './routes/AppRoutes';

import { WebSocketProvider } from './contexts/WebSocketContext';

const App = () => {
	return (
		<WebSocketProvider>
			<AppRoutes />
		</WebSocketProvider>
	);
};

export { App };
