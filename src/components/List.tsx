import styles from "../styles/List.module.css";
import { useState, useEffect } from "react";
import { TaskItem } from "../schemas/task-item";
import Task from "./Task";
import Input from "./Input";

function List() {
  const [taskItems, setTaskItems] = useState<TaskItem[]>(() => {
    const savedTasks = localStorage.getItem("todoList");
    return savedTasks ? JSON.parse(savedTasks) : [];
  });

  useEffect(() => {
    localStorage.setItem("todoList", JSON.stringify(taskItems));
  }, [taskItems]);

  function createTask(text: string): void {
    setTaskItems([...taskItems, { text, done: false }]);
  };

  function updateTask(index: number, newText: string): void {
    setTaskItems(
      taskItems.map((taskItem, i) =>
        i === index ? { ...taskItem, text: newText } : taskItem
      )
    );
  };

  function toggleDone(index: number): void {
    setTaskItems(
      taskItems.map((taskItem, i) =>
        i === index ? { ...taskItem, done: !taskItem.done } : taskItem
      )
    );
  };

  function deleteTask(index: number): void {
    setTaskItems(taskItems.filter((_, i) => i !== index));
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
            deleteTask={deleteTask}
            updateTask={updateTask}
            toggleDone={toggleDone}
          />
        ))}
      </ul>
    </div>
  );
};

export default List;
