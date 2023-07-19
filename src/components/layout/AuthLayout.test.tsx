import { render, fireEvent, waitFor, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import AuthLayout from "./AuthLayout";
import { act } from "react-dom/test-utils";
import { Fetcher } from "../../lib/Fetcher";

jest.mock("../../lib/Fetcher");

describe("AuthLayout", () => {
  let postSpy: jest.SpyInstance;
  let getSpy: jest.SpyInstance;

  beforeEach(() => {
    // Replace Fetcher.post with a mock function
    postSpy = jest.spyOn(Fetcher, "post");
    getSpy = jest.spyOn(Fetcher, "get");
  });

  afterEach(() => {
    // Restore the original Fetcher.post function after each test
    postSpy.mockRestore();
    getSpy.mockRestore();
  });

  it("renders the login form", () => {
    render(<AuthLayout />);
    const nameInput = screen.getByPlaceholderText("John Doe");
    const emailInput = screen.getByPlaceholderText("johndoe@gmail.com");
    const submitButton = screen.getByText("Log In");

    expect(nameInput).toBeInTheDocument();
    expect(emailInput).toBeInTheDocument();
    expect(submitButton).toBeInTheDocument();
  });

  it("submits the login form", async () => {
    postSpy.mockImplementation(() =>
      Promise.resolve({ status: 200 } as Response)
    );
    getSpy.mockImplementation(() =>
      Promise.resolve({
        status: 200,
        json: () => Promise.resolve({}),
      } as Response)
    );

    render(<AuthLayout />);

    const nameInput = screen.getByPlaceholderText("John Doe");
    const emailInput = screen.getByPlaceholderText("johndoe@gmail.com");
    const submitButton = screen.getByText("Log In");

    fireEvent.change(nameInput, { target: { value: "Test User" } });
    fireEvent.change(emailInput, { target: { value: "test@gmail.com" } });

    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(Fetcher.post).toHaveBeenCalledWith("/auth/login", {
        name: "Test User",
        email: "test@gmail.com",
      });
    });

    expect(
      await screen.findByText("Let's find your best friend!")
    ).toBeInTheDocument();
  });

  it("handles login error", async () => {
    postSpy.mockImplementation(() =>
      Promise.reject(new Error("Failed to log in"))
    );

    render(<AuthLayout />);

    const nameInput = screen.getByPlaceholderText("John Doe");
    const emailInput = screen.getByPlaceholderText("johndoe@gmail.com");
    const submitButton = screen.getByText("Log In");

    fireEvent.change(nameInput, { target: { value: "Test User" } });
    fireEvent.change(emailInput, { target: { value: "test@gmail.com" } });

    fireEvent.click(submitButton);

    expect(
      await screen.findByText("We couldn't log you in. Please try again.")
    ).toBeInTheDocument();
  });
});
