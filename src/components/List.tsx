import styles from "../styles/List.module.css";
import { useState } from "react";
import { TaskItem } from "../schemas/task-item";
import Task from "./Task";
import Input from "./Input";

function List() {
  const [taskItems, setTaskItems] = useState<TaskItem[]>([]);

  function createTask(text: string): void {
    setTaskItems([...taskItems, { text, done: false }]);
  };

  function toggleDone(index: number): void {
    setTaskItems(
      taskItems.map((taskItem, i) =>
        i === index ? { ...taskItem, done: !taskItem.done } : taskItem
      )
    );
  };

  return (
    <div className={styles.listContainer}>
      <h1 className={styles.heading}>To-Do List</h1>

      <Input createTask={createTask} />

      <ul>
        {taskItems.map((taskItem, index) => (
          <Task
            key={index}
            index={index}
            taskItem={taskItem}
            toggleDone={toggleDone}
          />
        ))}
      </ul>
    </div>
  );
};

export default List;
