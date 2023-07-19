import { render, fireEvent, screen } from "@testing-library/react";
import SecondaryButton from "./PrimaryButton";

describe("PrimaryButton", () => {
  it("renders children when not loading", () => {
    render(
      <SecondaryButton type="button" onClick={() => {}}>
        Not Loading
      </SecondaryButton>
    );

    expect(screen.getByText("Not Loading")).toBeInTheDocument();
  });

  it("renders loader when loading", () => {
    render(
      <SecondaryButton type="button" onClick={() => {}} loading>
        Loading
      </SecondaryButton>
    );

    expect(screen.getByLabelText("Loading Spinner")).toBeInTheDocument();
  });

  it("calls onClick when clicked", () => {
    const handleClick = jest.fn();

    render(
      <SecondaryButton type="button" onClick={handleClick}>
        Click Me
      </SecondaryButton>
    );

    fireEvent.click(screen.getByText("Click Me"));

    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it("is disabled when disabled prop is true", () => {
    render(
      <SecondaryButton type="button" onClick={() => {}} disabled>
        Disabled Button
      </SecondaryButton>
    );

    expect(screen.getByText("Disabled Button")).toBeDisabled();
  });
});
