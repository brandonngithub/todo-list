import { render, screen, fireEvent } from "@testing-library/react";
import List from "../components/List";

describe("List Component", () => {
  // Clear local storage before every test
  beforeEach(() => {
    localStorage.clear();
  });

  // Test 1: Check if adding one new task, correctly adds the task
  test("adds a task to the list", () => {
    render(<List />);

    const input = screen.getByPlaceholderText("Add a new task...");
    const addButton = screen.getByText("Add");

    fireEvent.change(input, { target: { value: "Task One" } }); // type "Task One" in the input bar
    fireEvent.click(addButton); // click the Add button

    expect(screen.getByText("Task One")).toBeInTheDocument();
  });

  // Test 2: Check if adding multiple tasks, correctly adds the tasks
  test("renders multiple tasks correctly", () => {
    render(<List />);

    const input = screen.getByPlaceholderText("Add a new task...");
    const addButton = screen.getByText("Add");

    fireEvent.change(input, { target: { value: "Task One" } }); // type "Task One" in the input bar
    fireEvent.click(addButton); // click the Add button
    fireEvent.change(input, { target: { value: "Task Two" } }); // type "Task Two" in the input bar
    fireEvent.click(addButton); // click the Add button

    expect(screen.getByText("Task One")).toBeInTheDocument();
    expect(screen.getByText("Task Two")).toBeInTheDocument();
  });

  // Test 3: Check if editing the task, correctly edits the task, after adding one task
  test("edits a task in the list", () => {
    render(<List />);

    const input = screen.getByPlaceholderText("Add a new task...");
    const addButton = screen.getByText("Add");

    fireEvent.change(input, { target: { value: "Task One" } }); // type "Task One" in the input bar
    fireEvent.click(addButton); // click the Add button

    const editButton = screen.getByLabelText("Edit");

    fireEvent.click(editButton); // click the Edit button

    const editInput = screen.getByDisplayValue("Task One");
    const saveButton = screen.getByLabelText("Save");

    fireEvent.change(editInput, { target: { value: "Task One Edited" } }); // type "Task One Edited" in the edit bar
    fireEvent.click(saveButton); // click the Save button

    expect(screen.getByText("Task One Edited")).toBeInTheDocument();
  });

  // Test 4: Check if removing a task, correctly removes the task, after adding one task
  test("removes a task from the list", () => {
    render(<List />);

    const input = screen.getByPlaceholderText("Add a new task...");
    const addButton = screen.getByText("Add");

    fireEvent.change(input, { target: { value: "Task One" } }); // type "Task One" in the input bar
    fireEvent.click(addButton); // click the Add button

    const deleteButton = screen.getByLabelText("Delete");

    fireEvent.click(deleteButton); // click the Delete button

    expect(screen.queryByText("Task One")).not.toBeInTheDocument();
  });
});
