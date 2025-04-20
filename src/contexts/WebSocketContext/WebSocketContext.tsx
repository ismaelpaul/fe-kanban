import { createContext, useState, useEffect, ReactNode } from 'react';

import { useQueryClient } from '@tanstack/react-query';
import { WebSocketContextType } from '@/interfaces/IWebSocket';

import { handlers } from '@/handlers';
import { useAuth } from '@/hooks';

export type WebSocketMessageType = keyof typeof handlers;

export interface WebSocketMessage<T = unknown> {
	type: WebSocketMessageType;
	payload: T;
}

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
	const [isConnected, setIsConnected] = useState(false);

	const queryClient = useQueryClient();
	const { isAuthenticated } = useAuth();

	useEffect(() => {
		if (!isAuthenticated) return;

		const baseApiUrl = import.meta.env.VITE_BASE_URL;
		const wsUrl =
			baseApiUrl.replace(/^http/, 'ws').replace(/\/api\/?$/, '') + '/ws';

		const socket = new WebSocket(wsUrl);

		socket.onopen = () => {
			console.log('WebSocket connected');
			setIsConnected(true);
			setWs(socket);
		};

		socket.onmessage = (event) => {
			const data = JSON.parse(event.data);

			const handler = handlers[data.type as WebSocketMessageType];

			if (handler) {
				handler(data, queryClient);
			} else {
				console.warn(`No handler for message type: ${data.type}`);
			}
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
	}, [isAuthenticated, queryClient]);

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
