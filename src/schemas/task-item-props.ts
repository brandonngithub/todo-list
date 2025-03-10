import { TaskItem } from "./task-item";

export interface TaskItemProps {
    index: number;
    taskItem: TaskItem;
    deleteTask: (index: number) => void;
    toggleDone: (index: number) => void;
}
