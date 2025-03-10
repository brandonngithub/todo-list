import styles from "../styles/Task.module.css";
import { TaskItemProps } from "../schemas/task-item-props";

function Task({taskItem}: TaskItemProps) {
  return (
    <li className={styles.taskContainer}>
      <span className={styles.taskText}>
        {taskItem.text}
      </span>
    </li>
  );
};

export default Task;
