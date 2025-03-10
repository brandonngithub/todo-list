import styles from "../styles/Task.module.css";
import { TaskItemProps } from "../schemas/task-item-props";
import { ImCheckmark } from "react-icons/im";

function Task({
  index,
  taskItem,
  toggleDone,
}: TaskItemProps) {
  return (
    <li className={styles.taskContainer}>
      <label className={styles.checkboxContainer}>
        <input
          type="checkbox"
          checked={taskItem.done}
          onChange={() => toggleDone(index)}
          className={styles.hiddenCheckbox}
          aria-label="Done"
        />
        <div
          className={`${styles.customCheckbox} ${
            taskItem.done ? styles.checked : styles.unchecked
          }`}
        >
          <ImCheckmark />
        </div>
      </label>
      <span
        className={`${styles.taskText} ${taskItem.done ? styles.done : ""}`}
      >
        {taskItem.text}
      </span>
    </li>
  );
};

export default Task;
