import { render, screen, fireEvent } from "@testing-library/react";
import { vi } from "vitest";
import Task from "../components/Task";

const mockUpdateTask = vi.fn();
const mockToggleDone = vi.fn();
const mockDeleteTask = vi.fn();

describe("Task Component", () => {
  beforeEach(() => {
    mockUpdateTask.mockClear();
    mockToggleDone.mockClear();
    mockDeleteTask.mockClear();
  });

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

    fireEvent.click(checkboxContainer);

    expect(mockToggleDone).toHaveBeenCalledWith(0);
  });

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

    fireEvent.click(editButton);

    const editInput = screen.getByDisplayValue("Test Task");
    const saveButton = screen.getByLabelText("Save");

    expect(editInput).toBeInTheDocument();
    expect(saveButton).toBeInTheDocument();
  });

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

    fireEvent.click(editButton);

    const editInput = screen.getByDisplayValue("Task One");

    fireEvent.change(editInput, { target: { value: "Task One Edited" } });

    const saveButton = screen.getByLabelText("Save");

    fireEvent.click(saveButton);

    expect(mockUpdateTask).toHaveBeenCalledWith(0, "Task One Edited");
  });

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

    fireEvent.click(deleteButton);

    expect(mockDeleteTask).toHaveBeenCalledWith(0);
  });
});
