import { render, screen, fireEvent } from "@testing-library/react";
import { Dog } from "../../types/Dog";
import MatchPanel from "./MatchPanel";

describe("<MatchPanel />", () => {
  test("renders with no dogs selected", () => {
    const setOpen = jest.fn();
    const selectedDogs: Dog[] = [];
    const setSelectedDogs = jest.fn();
    const handleMatch = jest.fn();
    const loading = false;

    render(
      <MatchPanel
        open={true}
        setOpen={setOpen}
        selectedDogs={selectedDogs}
        setSelectedDogs={setSelectedDogs}
        handleMatch={handleMatch}
        loading={loading}
      />
    );

    const titleElement = screen.getByText("Your Matches");
    expect(titleElement).toBeInTheDocument();

    const noDogsSelectedElement = screen.getByText("No dogs selected");
    expect(noDogsSelectedElement).toBeInTheDocument();

    const matchButton = screen.queryByText("Match");
    expect(matchButton).not.toBeInTheDocument();
  });

  test("renders with selected dogs and triggers match", () => {
    const setOpen = jest.fn();
    const selectedDogs = [
      {
        img: "https://frontend-take-home.fetch.com/dog-images/n02110627-affenpinscher/n02110627_10437.jpg",
        name: "Wendell",
        age: 1,
        breed: "Affenpinscher",
        zip_code: "06104",
        id: "NnGFTIcBOvEgQ5OCx8A1",
      },
      {
        img: "https://frontend-take-home.fetch.com/dog-images/n02110627-affenpinscher/n02110627_11798.jpg",
        name: "Frieda",
        age: 5,
        breed: "Schnauzer",
        zip_code: "44052",
        id: "T3GFTIcBOvEgQ5OCx8A2",
      },
    ];
    const setSelectedDogs = jest.fn();
    const handleMatch = jest.fn();
    const loading = false;

    render(
      <MatchPanel
        open={true}
        setOpen={setOpen}
        selectedDogs={selectedDogs}
        setSelectedDogs={setSelectedDogs}
        handleMatch={handleMatch}
        loading={loading}
      />
    );

    const titleElement = screen.getByText("Your Matches");
    expect(titleElement).toBeInTheDocument();

    const dog1NameElement = screen.getByText("Wendell");
    expect(dog1NameElement).toBeInTheDocument();
    const dog1BreedElement = screen.getByText("Affenpinscher");
    expect(dog1BreedElement).toBeInTheDocument();

    const dog2NameElement = screen.getByText("Frieda");
    expect(dog2NameElement).toBeInTheDocument();
    const dog2BreedElement = screen.getByText("Schnauzer");
    expect(dog2BreedElement).toBeInTheDocument();

    //get openMenuButton
    const openMenuButton = screen.getAllByTitle("Remove from Matches")[0];
    expect(openMenuButton).toBeInTheDocument();
    fireEvent.click(openMenuButton);

    expect(setSelectedDogs).toBeCalledWith([
      {
        img: "https://frontend-take-home.fetch.com/dog-images/n02110627-affenpinscher/n02110627_11798.jpg",
        name: "Frieda",
        age: 5,
        breed: "Schnauzer",
        zip_code: "44052",
        id: "T3GFTIcBOvEgQ5OCx8A2",
      },
    ]);

    const matchButton = screen.getByText("Match");
    expect(matchButton).toBeInTheDocument();
    fireEvent.click(matchButton);
    expect(handleMatch).toBeCalled();
  });
});
