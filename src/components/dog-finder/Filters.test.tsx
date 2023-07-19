import { render, screen, fireEvent } from "@testing-library/react";
import Filters from "./Filters";
import { DogSearchParams } from "../../types/DogSearchParams";
// Mock setFilters and create initial props
const setFilters = jest.fn();
const searchParams: DogSearchParams = {
  ageMax: 5,
  ageMin: 0,
  breeds: [],
  zipCodes: [],
  size: 10,
  sort: "Breed:Asc",
};
const breeds = ["labrador", "beagle", "poodle"];

test("<Filters /> updates filters correctly", () => {
  render(
    <Filters
      searchParams={searchParams}
      setFilters={setFilters}
      breeds={breeds}
    />
  );

  const minAgeInput = screen.getByLabelText("Min Age");
  const maxAgeInput = screen.getByLabelText("Max Age");
  const zipCodeInput = screen.getByLabelText("Zip Code");
  const sortSelect = screen.getByLabelText("Sort By");
  const orderSelect = screen.getByLabelText("Order");

  fireEvent.change(minAgeInput, { target: { value: 2 } });
  expect(setFilters).toBeCalledWith({ ...searchParams, ageMin: 2 });

  fireEvent.change(maxAgeInput, { target: { value: 3 } });
  expect(setFilters).toBeCalledWith({ ...searchParams, ageMax: 3 });

  fireEvent.change(zipCodeInput, { target: { value: "12345" } });
  expect(setFilters).toBeCalledWith({ ...searchParams, zipCodes: ["12345"] });

  fireEvent.click(sortSelect);
  // Find the first <li> element with "Name" and click it
  const nameOption = screen.getByRole("option", { name: /Name/i });
  fireEvent.click(nameOption);
  expect(setFilters).toBeCalledWith({ ...searchParams, sort: "name:asc" });
  fireEvent.click(sortSelect);

  fireEvent.click(orderSelect);
  // Find the first <li> element with "Desc" and click it
  const descOption = screen.getByRole("option", { name: /Desc/i });
  fireEvent.click(descOption);
  expect(setFilters).toBeCalledWith({ ...searchParams, sort: "name:desc" });
  fireEvent.click(orderSelect);
});
