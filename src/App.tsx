import { BrowserRouter } from 'react-router-dom';

import { AppRoutes } from './routes/Routes';

import { WebSocketProvider } from './contexts/WebSocketContext';

const App = () => {
	return (
		<>
			<WebSocketProvider>
				<BrowserRouter>
					<AppRoutes />
				</BrowserRouter>
			</WebSocketProvider>
		</>
	);
};

export { App };
