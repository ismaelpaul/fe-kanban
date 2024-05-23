export interface UserInfo {
	user_id: number;
	first_name: string;
	last_name: string;
	email: string;
	avatar: string;
}

export interface User {
	user: UserInfo;
}
