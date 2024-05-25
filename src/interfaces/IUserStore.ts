import { UserInfo } from './IUser';

export interface UserStoreState {
	user: UserInfo;
}

export interface UserStoreActions {
	setUser: (newUser: UserInfo) => void;
}
