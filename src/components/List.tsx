import styles from "../styles/List.module.css";
import { useState, useEffect } from "react";
import { TaskItem } from "../schemas/task-item";
import Task from "./Task";
import Input from "./Input";

function List() {
  // Initialize state for task items and load from local storage if possible
  const [taskItems, setTaskItems] = useState<TaskItem[]>(() => {
    const savedTasks = localStorage.getItem("todoList");
    return savedTasks ? JSON.parse(savedTasks) : []; // empty array if no saved tasks
  });

  // Save task items to local storage when they change
  useEffect(() => {
    localStorage.setItem("todoList", JSON.stringify(taskItems));
  }, [taskItems]);

  // Function to create a new task and add it to the list
  function createTask(text: string): void {
    setTaskItems([...taskItems, { text, done: false }]); // the done field is initially false
  };

  // Function to update the text of a specific task
  function updateTask(index: number, newText: string): void {
    setTaskItems(
      taskItems.map((taskItem, i) =>
        i === index ? { ...taskItem, text: newText } : taskItem
      )
    );
  };

  // Function to toggle the done status of a specific task
  function toggleDone(index: number): void {
    setTaskItems(
      taskItems.map((taskItem, i) =>
        i === index ? { ...taskItem, done: !taskItem.done } : taskItem
      )
    );
  };

  // Function to delete a specific task from the list
  function deleteTask(index: number): void {
    setTaskItems(taskItems.filter((_, i) => i !== index)); // task with matching index is filtered
  };

  return (
    <div className={styles.listContainer}>
      <h1 className={styles.heading}>To-Do List</h1>

      <Input createTask={createTask} />

      <ul>
        {taskItems.map((taskItem, index) => (
          <Task
            key={index} // Unique key for each task
            index={index} // Index of each task
            taskItem={taskItem} // The task itself
            deleteTask={deleteTask} // The deleteTask function
            updateTask={updateTask} // The updateTask function
            toggleDone={toggleDone} // The toggleDone function
          />
        ))}
      </ul>
    </div>
  );
};

export default List;
