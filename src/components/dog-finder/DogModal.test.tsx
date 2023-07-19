import { render, fireEvent, screen } from "@testing-library/react";
import DogModal from "./DogModal";

describe("<DogModal />", () => {
  const dog = {
    img: "https://frontend-take-home.fetch.com/dog-images/n02110627-affenpinscher/n02110627_10437.jpg",
    name: "Wendell",
    age: 1,
    breed: "Affenpinscher",
    zip_code: "06104",
    id: "NnGFTIcBOvEgQ5OCx8A1",
  };

  it("renders correctly when open", () => {
    render(
      <DogModal open={true} setOpen={() => {}} dog={dog} setDog={() => {}} />
    );

    // Test that the dog's name and image are displayed
    expect(screen.getByText(`${dog.name}`)).toBeInTheDocument();
    expect(screen.getByAltText(dog.name)).toHaveAttribute("src", dog.img);
  });

  it("calls setOpen and setDog when the buttons are clicked", () => {
    const setOpen = jest.fn();
    const setDog = jest.fn();

    render(
      <DogModal open={true} setOpen={setOpen} dog={dog} setDog={setDog} />
    );

    // Simulate button clicks
    fireEvent.click(screen.getByText("Not the one..."));
    fireEvent.click(screen.getByText("Hooray!"));

    // Check setOpen and setDog were called
    expect(setOpen).toHaveBeenCalledTimes(2);
    expect(setOpen).toHaveBeenCalledWith(false);
    expect(setDog).toHaveBeenCalledTimes(2);
    expect(setDog).toHaveBeenCalledWith(null);
  });
});
