import {
	SubtasksStoreActions,
	SubtasksStoreState,
} from '@/interfaces/ISubtask';
import { create } from 'zustand';

const useSubtasksStore = create<SubtasksStoreState & SubtasksStoreActions>(
	(set) => ({
		totalSubtasks: {},
		completedSubtasks: {},
		setTotalSubtasks: (taskId, subtaskCount) =>
			set((state) => ({
				totalSubtasks: {
					...state.totalSubtasks,
					[taskId]: subtaskCount,
				},
			})),

		setCompletedSubtasks: (taskId, completedCount) =>
			set((state) => ({
				completedSubtasks: {
					...state.completedSubtasks,
					[taskId]: completedCount,
				},
			})),
	})
);

export { useSubtasksStore };
