export interface WebSocketMessage<T = unknown> {
	type: string;
	payload: T;
}

export interface WebSocketContextType {
	ws: WebSocket | null;
	sendMessage: <T extends object>(type: string, payload: T) => void;
	isConnected: boolean;
}
