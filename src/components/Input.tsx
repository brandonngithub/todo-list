import styles from "../styles/Input.module.css";
import { useState } from "react";
import { FormProps } from "../schemas/form-props";

function Input({ createTask }: FormProps) {
  // State to manage the input field value
  const [text, setText] = useState<string>("");

  // Function to handle form submission
  function handleSubmit(e: React.FormEvent) {
    e.preventDefault(); // prevent the default form submission behavior

    if (!text.trim()) {
      return; // exit early if the input is empty or only contains whitespace
    }

    createTask(text);
    setText("");
  };

  return (
    <form onSubmit={handleSubmit} className={styles.inputContainer}>
      <input
        type="text"
        value={text} // value tied to text state
        onChange={(e) => setText(e.target.value)} // update text state as the user types
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
