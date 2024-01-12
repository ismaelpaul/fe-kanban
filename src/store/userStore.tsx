import { create } from 'zustand';
import { UserStoreActions, UserStoreState } from '../interfaces/IUserStore';

const useUserStore = create<UserStoreState & UserStoreActions>((set) => ({
	userId: 1,
	setUserId: (newUserId: number) => set({ userId: newUserId }),
}));

export default useUserStore;
