import { updateSubtaskCompletionHandler } from './subtasks/updateSubtaskCompletion';
import { updateTaskCompletionHandler } from './tasks/updateTaskCompletion';

const handlers = {
	UPDATE_TASK_COMPLETION: updateTaskCompletionHandler,
	TASK_COMPLETION_UPDATED: updateTaskCompletionHandler,
	SUBTASK_COMPLETION_UPDATED: updateSubtaskCompletionHandler,
};

export { handlers };
