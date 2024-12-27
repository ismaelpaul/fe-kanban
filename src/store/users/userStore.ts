import { create } from 'zustand';

import { UserInfo } from '@/interfaces/IUser';
import { UserStoreActions, UserStoreState } from '@/interfaces/IUserStore';

const useUserStore = create<UserStoreState & UserStoreActions>((set) => ({
	user: { user_id: 0, first_name: '', last_name: '', email: '', avatar: '' },
	setUser: (newUser: UserInfo) => set({ user: newUser }),
}));

export { useUserStore };
