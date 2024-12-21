import { createContext, useState, useEffect, ReactNode } from 'react';

import { useQueryClient } from '@tanstack/react-query';
import { WebSocketContextType } from '@/interfaces/IWebSocket';

const defaultWebSocketContextValue: WebSocketContextType = {
	ws: null,
	sendMessage: () => {},
	isConnected: false,
};

const WebSocketContext = createContext<WebSocketContextType>(
	defaultWebSocketContextValue
);

const WebSocketProvider = ({ children }: { children: ReactNode }) => {
	const [ws, setWs] = useState<WebSocket | null>(null);
	// const [messages, setMessages] = useState<WebSocketMessage[]>([]);
	const [isConnected, setIsConnected] = useState(false);

	const queryClient = useQueryClient();

	useEffect(() => {
		const socket = new WebSocket('ws://localhost:9090/ws');

		socket.onopen = () => {
			console.log('WebSocket connected');
			setIsConnected(true);
			setWs(socket);
		};

		socket.onmessage = (event) => {
			const data = JSON.parse(event.data);
			console.log('Message from server:', data);

			// const columnId = data.task[0].column_id;

			// console.log(columnId, '<<< id');

			// queryClient.invalidateQueries(['tasks', columnId]);
		};

		socket.onerror = (error) => {
			console.error('WebSocket error:', error);
		};

		socket.onclose = () => {
			console.log('WebSocket closed');
			setIsConnected(false);
		};

		return () => {
			socket.close();
		};
	}, []);

	const sendMessage = (type: string, payload: object) => {
		if (ws && ws.readyState === WebSocket.OPEN) {
			ws.send(JSON.stringify({ type, payload }));
		} else {
			console.log('WebSocket is not connected.');
		}
	};

	return (
		<WebSocketContext.Provider value={{ ws, sendMessage, isConnected }}>
			{children}
		</WebSocketContext.Provider>
	);
};

export { WebSocketContext, WebSocketProvider };
