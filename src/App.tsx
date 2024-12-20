import { BrowserRouter, Routes } from 'react-router-dom';
import { WebSocketProvider } from './contexts/WebSocketContext';

function App() {
	return (
		<>
			<WebSocketProvider>
				<BrowserRouter>
					<Routes />
				</BrowserRouter>
			</WebSocketProvider>
		</>
	);
}

export default App;
