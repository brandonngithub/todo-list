import { render, screen, fireEvent } from "@testing-library/react";
import { vi } from "vitest";
import Input from "../components/Input";

// Mock the createTask function
const mockCreateTask = vi.fn();

describe("Input Component", () => {
  // Reset mock function before every test
  beforeEach(() => {
    mockCreateTask.mockClear();
  });

  // Test 1: Check if rendering a simple Input component, correctly renders the input field and add button as well
  test("renders the input field and button", () => {
    render(<Input createTask={mockCreateTask} />);

    const inputField = screen.getByPlaceholderText("Add a new task...");
    const addButton = screen.getByText("Add");

    expect(inputField).toBeInTheDocument();
    expect(addButton).toBeInTheDocument();
  });

  // Test 2: Check if the input field value gets updated when you type, after rendering a simple Input component
  test("updates the input field value when typing", () => {
    render(<Input createTask={mockCreateTask} />);

    const inputField = screen.getByPlaceholderText("Add a new task...");

    fireEvent.change(inputField, { target: { value: "Task One" } }); // type "Task One" in the input field

    expect(inputField).toHaveValue("Task One");
  });

  // Test 3: Check if the createTask function gets called correctly and the input field clears, when adding a new task, after rendering a simple Input component
  test("calls createTask and clears the input field on form submission", () => {
    render(<Input createTask={mockCreateTask} />);

    const inputField = screen.getByPlaceholderText("Add a new task...");
    const addButton = screen.getByText("Add");

    fireEvent.change(inputField, { target: { value: "Task One" } }); // type "Task One" in the input field
    fireEvent.click(addButton); // click the Add button

    expect(mockCreateTask).toHaveBeenCalledWith("Task One");
    expect(inputField).toHaveValue("");
  });

  // Test 4: Check that the createTask function is not called, when you type nothing and click the Add button, after rendering a simple Input component
  test("does not call createTask if the input is empty", () => {
    render(<Input createTask={mockCreateTask} />);

    const addButton = screen.getByText("Add");

    fireEvent.click(addButton); // click the Add button

    expect(mockCreateTask).not.toHaveBeenCalled();
  });
});
