import { StarIcon } from "@heroicons/react/24/outline";
import { render, fireEvent, screen } from "@testing-library/react";
import IconButton from "./IconButton";

describe("IconButton", () => {
  const Icon = () => <StarIcon data-testid="icon" />;

  it("renders the button", () => {
    render(<IconButton icon={<Icon />} onClick={() => {}} />);

    expect(screen.getByTestId("icon")).toBeInTheDocument();
  });

  it("calls onClick when clicked", () => {
    const handleClick = jest.fn();

    render(<IconButton icon={<Icon />} onClick={handleClick} />);

    fireEvent.click(screen.getByRole("button"));

    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it("is disabled when disabled prop is true", () => {
    render(<IconButton icon={<Icon />} onClick={() => {}} disabled />);

    expect(screen.getByRole("button")).toBeDisabled();
  });

  it("displays the provided title when hovered", () => {
    render(
      <IconButton icon={<Icon />} onClick={() => {}} title="Test title" />
    );

    fireEvent.mouseOver(screen.getByRole("button"));

    expect(screen.getByRole("button")).toHaveAttribute("title", "Test title");
  });
});
