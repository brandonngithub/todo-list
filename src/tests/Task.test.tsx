import { render, screen, fireEvent } from "@testing-library/react";
import { vi } from "vitest";
import Task from "../components/Task";

// Mock the functions
const mockUpdateTask = vi.fn();
const mockToggleDone = vi.fn();
const mockDeleteTask = vi.fn();

describe("Task Component", () => {
  // Reset mock functions before every test
  beforeEach(() => {
    mockUpdateTask.mockClear();
    mockToggleDone.mockClear();
    mockDeleteTask.mockClear();
  });

  // Test 1: Check if rendering a simple Task component renders the correct text and the edit and delete button are present
  test("renders the task text, edit button, and delete button", () => {
    render(
      <Task
        index={0}
        taskItem={{ text: "Task One", done: false }}
        updateTask={mockUpdateTask}
        toggleDone={mockToggleDone}
        deleteTask={mockDeleteTask}
      />
    );

    const taskText = screen.getByText("Task One");
    expect(taskText).toBeInTheDocument();

    const editButton = screen.getByLabelText("Edit");
    expect(editButton).toBeInTheDocument();

    const deleteButton = screen.getByLabelText("Delete");
    expect(deleteButton).toBeInTheDocument();
  });

  // Test 2: Check if the checkbox gets toggled and toggleDone gets called correctly, when the checkbox of a simple Task component is toggled
  test("toggles the checkbox and calls toggleDone", () => {
    render(
      <Task
        index={0}
        taskItem={{ text: "Task One", done: false }}
        updateTask={mockUpdateTask}
        toggleDone={mockToggleDone}
        deleteTask={mockDeleteTask}
      />
    );

    const checkboxContainer = screen.getByLabelText("Done");

    fireEvent.click(checkboxContainer); // click the checkbox of the task

    expect(mockToggleDone).toHaveBeenCalledWith(0);
  });

  // Test 3: Check if the input field and save button render correctly, when the Edit button on a simple Task component is clicked
  test("enters editing mode when the edit button is clicked", () => {
    render(
      <Task
        index={0}
        taskItem={{ text: "Test Task", done: false }}
        updateTask={mockUpdateTask}
        toggleDone={mockToggleDone}
        deleteTask={mockDeleteTask}
      />
    );

    const editButton = screen.getByLabelText("Edit");

    fireEvent.click(editButton); // click the Edit button

    const editInput = screen.getByDisplayValue("Test Task");
    const saveButton = screen.getByLabelText("Save");

    expect(editInput).toBeInTheDocument();
    expect(saveButton).toBeInTheDocument();
  });

  // Test 4: Check if editing a simple Task component calls the updateTask function correctly
  test("saves changes when the save button is clicked", () => {
    render(
      <Task
        index={0}
        taskItem={{ text: "Task One", done: false }}
        updateTask={mockUpdateTask}
        toggleDone={mockToggleDone}
        deleteTask={mockDeleteTask}
      />
    );

    const editButton = screen.getByLabelText("Edit");

    fireEvent.click(editButton); // click the Edit button

    const editInput = screen.getByDisplayValue("Task One");

    fireEvent.change(editInput, { target: { value: "Task One Edited" } }); // type "Task One Edited" in the edit bar

    const saveButton = screen.getByLabelText("Save");

    fireEvent.click(saveButton); // click the Save button

    expect(mockUpdateTask).toHaveBeenCalledWith(0, "Task One Edited");
  });

  // Test 5: Check if deleting a simple Task component calls the deleteTask function correctly
  test("deletes the task when the delete button is clicked", () => {
    render(
      <Task
        index={0}
        taskItem={{ text: "Test Task", done: false }}
        updateTask={mockUpdateTask}
        toggleDone={mockToggleDone}
        deleteTask={mockDeleteTask}
      />
    );

    const deleteButton = screen.getByLabelText("Delete");

    fireEvent.click(deleteButton); // click the Delete button

    expect(mockDeleteTask).toHaveBeenCalledWith(0);
  });
});
