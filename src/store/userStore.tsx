import { create } from 'zustand';
import { UserStoreActions, UserStoreState } from '../interfaces/IUserStore';

const userStore = create<UserStoreState & UserStoreActions>((set) => ({
	userId: 1,
	setUserId: (newUserId: number) => set({ userId: newUserId }),
}));

export default userStore;
