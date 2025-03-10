import { render, screen, fireEvent } from "@testing-library/react";
import { vi } from "vitest";
import Input from "../components/Input";

const mockCreateTask = vi.fn();

describe("Input Component", () => {
  beforeEach(() => {
    mockCreateTask.mockClear();
  });

  test("renders the input field and button", () => {
    render(<Input createTask={mockCreateTask} />);

    const inputField = screen.getByPlaceholderText("Add a new task...");
    const addButton = screen.getByText("Add");

    expect(inputField).toBeInTheDocument();
    expect(addButton).toBeInTheDocument();
  });

  test("updates the input field value when typing", () => {
    render(<Input createTask={mockCreateTask} />);

    const inputField = screen.getByPlaceholderText("Add a new task...");

    fireEvent.change(inputField, { target: { value: "Task One" } });

    expect(inputField).toHaveValue("Task One");
  });

  test("calls createTask and clears the input field on form submission", () => {
    render(<Input createTask={mockCreateTask} />);

    const inputField = screen.getByPlaceholderText("Add a new task...");
    const addButton = screen.getByText("Add");

    fireEvent.change(inputField, { target: { value: "Task One" } });
    fireEvent.click(addButton);

    expect(mockCreateTask).toHaveBeenCalledWith("Task One");
    expect(inputField).toHaveValue("");
  });

  test("does not call createTask if the input is empty", () => {
    render(<Input createTask={mockCreateTask} />);

    const addButton = screen.getByText("Add");

    fireEvent.click(addButton);

    expect(mockCreateTask).not.toHaveBeenCalled();
  });
});
