import { boardAddedHandler } from './boards/boardAddedHandler';
import { boardDeletedHandler } from './boards/boardDeletedHandler';
import { boardEditedHandler } from './boards/boardEditedHandler';
import { columnAddedHandler } from './columns/columnAddedHandler';
import { commentAddedHandler } from './comments/commentAddedHandler';
import { updateSubtaskCompletionHandler } from './subtasks/updateSubtaskCompletion';
import { taskAddedAndDeleteHandler } from './tasks/taskAddedHandler';
import { taskEditHandler } from './tasks/taskEditHandler';
import { updateTaskCompletionHandler } from './tasks/updateTaskCompletion';
import { teamUpdatedHandler } from './teams/teamEditHandler';

const handlers = {
	UPDATE_TASK_COMPLETION: updateTaskCompletionHandler,
	TASK_COMPLETION_UPDATED: updateTaskCompletionHandler,
	TASK_ADDED: taskAddedAndDeleteHandler,
	TASK_DELETED: taskAddedAndDeleteHandler,
	TASK_INFO_UPDATED: taskEditHandler,
	SUBTASK_COMPLETION_UPDATED: updateSubtaskCompletionHandler,
	BOARD_ADDED: boardAddedHandler,
	BOARD_INFO_UPDATED: boardEditedHandler,
	BOARD_DELETED: boardDeletedHandler,
	COMMENT_ADDED: commentAddedHandler,
	TEAM_UPDATED: teamUpdatedHandler,
	COLUMN_ADDED: columnAddedHandler,
};

export { handlers };
