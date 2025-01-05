import { create } from 'zustand';

interface ModalStoreState {
	modals: Record<string, boolean>;
}

interface ModalStoreActions {
	openModal: (modalName: string) => void;
	closeModal: (modalName: string) => void;
	toggleModal: (modalName: string) => void;
}
const useModalStore = create<ModalStoreState & ModalStoreActions>((set) => ({
	modals: {},

	openModal: (modalName: string) =>
		set((state) => ({
			modals: { ...state.modals, [modalName]: true },
		})),
	closeModal: (modalName: string) =>
		set((state) => ({
			modals: { ...state.modals, [modalName]: false },
		})),

	toggleModal: (modalName: string) =>
		set((state) => ({
			modals: { ...state.modals, [modalName]: !state.modals[modalName] },
		})),
}));

export { useModalStore };
