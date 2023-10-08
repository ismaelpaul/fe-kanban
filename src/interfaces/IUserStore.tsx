export interface UserStoreState {
	userId: number;
}

export interface UserStoreActions {
	setUserId: (newUserId: number) => void;
}
