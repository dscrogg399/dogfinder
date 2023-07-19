import { render, fireEvent, screen } from "@testing-library/react";
import Pagination from "./Pagination"; // adjust with your actual import path

jest.mock("@heroicons/react/24/outline", () => ({
  ChevronLeftIcon: () => <div>ChevronLeftIcon</div>,
  ChevronRightIcon: () => <div>ChevronRightIcon</div>,
}));

describe("Pagination", () => {
  const fetchNextPage = jest.fn();
  const fetchPrevPage = jest.fn();
  const fetchPageNumber = jest.fn();

  const totalDogs = 50;
  const pageSize = 10;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders correctly", () => {
    render(
      <Pagination
        fetchNextPage={fetchNextPage}
        fetchPrevPage={fetchPrevPage}
        fetchPageNumber={fetchPageNumber}
        totalDogs={totalDogs}
        pageSize={pageSize}
      />
    );
    const resultsCountSmall = screen.getByTitle("results count small");
    expect(resultsCountSmall).toBeInTheDocument();
    expect(resultsCountSmall).toHaveTextContent("Page 1 of 5");
  });

  it("check next and prev pages", () => {
    render(
      <Pagination
        fetchNextPage={fetchNextPage}
        fetchPrevPage={fetchPrevPage}
        fetchPageNumber={fetchPageNumber}
        totalDogs={totalDogs}
        pageSize={pageSize}
      />
    );

    const smallScreenNextButton = screen.getByRole("button", {
      name: /Next button on small screens/i,
    });
    const smallScreenPrevButton = screen.getByRole("button", {
      name: /Previous button on small screens/i,
    });
    const largeScreenNextButton = screen.getByRole("button", {
      name: /Next button on large screens/i,
    });
    const largeScreenPrevButton = screen.getByRole("button", {
      name: /Previous button on large screens/i,
    });
    fireEvent.click(smallScreenNextButton);
    expect(fetchNextPage).toHaveBeenCalledTimes(1);
    fireEvent.click(smallScreenPrevButton);
    expect(fetchPrevPage).toHaveBeenCalledTimes(1);
    fireEvent.click(largeScreenNextButton);
    expect(fetchNextPage).toHaveBeenCalledTimes(2);
    fireEvent.click(largeScreenPrevButton);
    expect(fetchPrevPage).toHaveBeenCalledTimes(2);
  });

  it("check page number", () => {
    render(
      <Pagination
        fetchNextPage={fetchNextPage}
        fetchPrevPage={fetchPrevPage}
        fetchPageNumber={fetchPageNumber}
        totalDogs={totalDogs}
        pageSize={pageSize}
      />
    );

    const page2Button = screen.getByText("2");
    fireEvent.click(page2Button);
    expect(fetchPageNumber).toHaveBeenCalledTimes(1);
    expect(fetchPageNumber).toHaveBeenCalledWith(2);
  });
});
