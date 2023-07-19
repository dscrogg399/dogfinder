import { render, fireEvent, screen } from "@testing-library/react";
import PrimaryButton from "./PrimaryButton";

describe("PrimaryButton", () => {
  it("renders children when not loading", () => {
    render(
      <PrimaryButton type="button" onClick={() => {}}>
        Not Loading
      </PrimaryButton>
    );

    expect(screen.getByText("Not Loading")).toBeInTheDocument();
  });

  it("renders loader when loading", () => {
    render(
      <PrimaryButton type="button" onClick={() => {}} loading>
        Loading
      </PrimaryButton>
    );

    expect(screen.getByLabelText("Loading Spinner")).toBeInTheDocument();
  });

  it("calls onClick when clicked", () => {
    const handleClick = jest.fn();

    render(
      <PrimaryButton type="button" onClick={handleClick}>
        Click Me
      </PrimaryButton>
    );

    fireEvent.click(screen.getByText("Click Me"));

    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it("is disabled when disabled prop is true", () => {
    render(
      <PrimaryButton type="button" onClick={() => {}} disabled>
        Disabled Button
      </PrimaryButton>
    );

    expect(screen.getByText("Disabled Button")).toBeDisabled();
  });
});
