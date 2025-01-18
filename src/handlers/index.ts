import { boardAddedHandler } from './boards/boardAddedHandler';
import { boardEditedHandler } from './boards/boardEditedHandler';
import { commentAddedHandler } from './comments/commentAddedHandler';
import { updateSubtaskCompletionHandler } from './subtasks/updateSubtaskCompletion';
import { TaskAddedAndDeleteHandler } from './tasks/taskAddedHandler';
import { TaskEditHandler } from './tasks/taskEditHandler';
import { updateTaskCompletionHandler } from './tasks/updateTaskCompletion';

const handlers = {
	UPDATE_TASK_COMPLETION: updateTaskCompletionHandler,
	TASK_COMPLETION_UPDATED: updateTaskCompletionHandler,
	TASK_ADDED: TaskAddedAndDeleteHandler,
	TASK_DELETED: TaskAddedAndDeleteHandler,
	TASK_INFO_UPDATED: TaskEditHandler,
	SUBTASK_COMPLETION_UPDATED: updateSubtaskCompletionHandler,
	BOARD_ADDED: boardAddedHandler,
	BOARD_INFO_UPDATED: boardEditedHandler,
	COMMENT_ADDED: commentAddedHandler,
};

export { handlers };
