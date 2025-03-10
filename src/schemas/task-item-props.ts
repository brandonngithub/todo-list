import { TaskItem } from "./task-item";

export interface TaskItemProps {
    index: number;
    taskItem: TaskItem;
    toggleDone: (index: number) => void;
}
