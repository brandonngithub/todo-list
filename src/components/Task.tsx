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
  // State to manage whether the task is in editing mode
  const [isEditing, setIsEditing] = useState<boolean>(false);
  // State to store edited text
  const [editedText, setEditedText] = useState<string>(taskItem.text);

  // Function to save the edited task and exit edit mode
  function handleSave() {
    updateTask(index, editedText);
    setIsEditing(false);
  };

  return (
    <li className={styles.taskContainer}>
      {isEditing ? (
        // Edit mode interface
        <>
          {/* Input field for editing the task text */}
          <input
            type="text"
            className={styles.editInput}
            value={editedText}
            onChange={(e) => setEditedText(e.target.value)} // editedText updates as the user types
          />
          {/* Button to save the edited task */}
          <button
            onClick={handleSave}
            className={`${styles.button} ${styles.saveButton}`}
            aria-label="Save"
          >
            <ImCheckmark /> {/* Checkmark icon from React Icons */}
          </button>
        </>
      ) : (
        // Normal interface
        <>
          {/* Container for entire custom checkbox */}
          <label className={styles.checkboxContainer}>
            <input
              type="checkbox"
              checked={taskItem.done}
              onChange={() => toggleDone(index)}
              className={styles.hiddenCheckbox} // default checkbox is hidden
              aria-label="Done"
            />
            {/* Custom checkbox */}
            <div
              className={`${styles.customCheckbox} ${
                taskItem.done ? styles.checked : styles.unchecked
              }`}
            >
              <ImCheckmark /> {/* Checkmark icon from React Icons */}
            </div>
          </label>
          {/* Additional styling if the task is marked as done */}
          <span
            className={`${styles.taskText} ${taskItem.done ? styles.done : ""}`}
          >
            {taskItem.text}
          </span>
          {/* Edit button */}
          <button
            onClick={() => setIsEditing(true)}
            className={`${styles.button} ${styles.editButton}`}
            aria-label="Edit"
          >
            <MdEdit /> {/* Edit icon from React Icons */}
          </button>
          {/* Delete button */}
          <button
            onClick={() => deleteTask(index)}
            className={`${styles.button} ${styles.deleteButton}`}
            aria-label="Delete"
          >
            <MdDelete /> {/* Delete icon from React Icons */}
          </button>
        </>
      )}
    </li>
  );
};

export default Task;
