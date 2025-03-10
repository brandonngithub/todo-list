import styles from "../styles/Input.module.css";
import { useState } from "react";
import { FormProps } from "../schemas/form-props";

function Input({ createTask }: FormProps) {
  const [text, setText] = useState<string>("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!text.trim()) {
      return;
    }

    createTask(text);
    setText("");
  };

  return (
    <form onSubmit={handleSubmit} className={styles.inputContainer}>
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        className={styles.inputField}
        placeholder="Add a new task..."
      />
      <button type="submit" className={styles.addButton}>
        Add
      </button>
    </form>
  );
};

export default Input;
