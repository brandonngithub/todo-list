import styles from "../styles/Task.module.css";
import { useState } from "react";
import { TaskItemProps } from "../schemas/task-item-props";
import { MdEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import { ImCheckmark } from "react-icons/im";

function Task({
  index,
  taskItem,
  deleteTask,
  updateTask,
  toggleDone,
}: TaskItemProps) {
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [editedText, setEditedText] = useState<string>(taskItem.text);

  function handleSave() {
    updateTask(index, editedText);
    setIsEditing(false);
  };

  return (
    <li className={styles.taskContainer}>
      {isEditing ? (
        <>
          <input
            type="text"
            className={styles.editInput}
            value={editedText}
            onChange={(e) => setEditedText(e.target.value)}
          />
          <button
            onClick={handleSave}
            className={`${styles.button} ${styles.saveButton}`}
            aria-label="Save"
          >
            <ImCheckmark />
          </button>
        </>
      ) : (
        <>
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
          <button
            onClick={() => setIsEditing(true)}
            className={`${styles.button} ${styles.editButton}`}
            aria-label="Edit"
          >
            <MdEdit />
          </button>
          <button
            onClick={() => deleteTask(index)}
            className={`${styles.button} ${styles.deleteButton}`}
            aria-label="Delete"
          >
            <MdDelete />
          </button>
        </>
      )}
    </li>
  );
};

export default Task;
