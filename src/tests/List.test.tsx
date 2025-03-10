import { render, screen, fireEvent } from "@testing-library/react";
import List from "../components/List";

describe("List Component", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  test("adds a task to the list", () => {
    render(<List />);

    const input = screen.getByPlaceholderText("Add a new task...");
    const addButton = screen.getByText("Add");

    fireEvent.change(input, { target: { value: "Task One" } });
    fireEvent.click(addButton);

    expect(screen.getByText("Task One")).toBeInTheDocument();
  });

  test("renders multiple tasks correctly", () => {
    render(<List />);

    const input = screen.getByPlaceholderText("Add a new task...");
    const addButton = screen.getByText("Add");

    fireEvent.change(input, { target: { value: "Task One" } });
    fireEvent.click(addButton);
    fireEvent.change(input, { target: { value: "Task Two" } });
    fireEvent.click(addButton);

    expect(screen.getByText("Task One")).toBeInTheDocument();
    expect(screen.getByText("Task Two")).toBeInTheDocument();
  });

  test("edits a task in the list", () => {
    render(<List />);

    const input = screen.getByPlaceholderText("Add a new task...");
    const addButton = screen.getByText("Add");

    fireEvent.change(input, { target: { value: "Task One" } });
    fireEvent.click(addButton);

    const editButton = screen.getByLabelText("Edit");

    fireEvent.click(editButton);

    const editInput = screen.getByDisplayValue("Task One");
    const saveButton = screen.getByLabelText("Save");

    fireEvent.change(editInput, { target: { value: "Task One Edited" } });
    fireEvent.click(saveButton);

    expect(screen.getByText("Task One Edited")).toBeInTheDocument();
  });

  test("removes a task from the list", () => {
    render(<List />);

    const input = screen.getByPlaceholderText("Add a new task...");
    const addButton = screen.getByText("Add");

    fireEvent.change(input, { target: { value: "Task One" } });
    fireEvent.click(addButton);

    const deleteButton = screen.getByLabelText("Delete");

    fireEvent.click(deleteButton);

    expect(screen.queryByText("Task One")).not.toBeInTheDocument();
  });
});
