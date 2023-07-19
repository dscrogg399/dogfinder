import { render, fireEvent, screen } from "@testing-library/react";
import DogListGrid from "./DogListGrid";

describe("<DogListGrid />", () => {
  const dogList = [
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
      breed: "Affenpinscher",
      zip_code: "44052",
      id: "T3GFTIcBOvEgQ5OCx8A2",
    },
    {
      img: "https://frontend-take-home.fetch.com/dog-images/n02110627-affenpinscher/n02110627_12808.jpg",
      name: "Einar",
      age: 4,
      breed: "Affenpinscher",
      zip_code: "93274",
      id: "Y3GFTIcBOvEgQ5OCx8A2",
    },
    {
      img: "https://frontend-take-home.fetch.com/dog-images/n02110627-affenpinscher/n02110627_12913.jpg",
      name: "Ansel",
      age: 3,
      breed: "Affenpinscher",
      zip_code: "75075",
      id: "ZnGFTIcBOvEgQ5OCx8A2",
    },
    {
      img: "https://frontend-take-home.fetch.com/dog-images/n02110627-affenpinscher/n02110627_13420.jpg",
      name: "Sonia",
      age: 4,
      breed: "Affenpinscher",
      zip_code: "04431",
      id: "cnGFTIcBOvEgQ5OCx8A2",
    },
    {
      img: "https://frontend-take-home.fetch.com/dog-images/n02110627-affenpinscher/n02110627_13453.jpg",
      name: "Lesly",
      age: 5,
      breed: "Affenpinscher",
      zip_code: "26865",
      id: "c3GFTIcBOvEgQ5OCx8A2",
    },
    {
      img: "https://frontend-take-home.fetch.com/dog-images/n02110627-affenpinscher/n02110627_3026.jpg",
      name: "Angelo",
      age: 0,
      breed: "Affenpinscher",
      zip_code: "65711",
      id: "jnGFTIcBOvEgQ5OCx8A2",
    },
    {
      img: "https://frontend-take-home.fetch.com/dog-images/n02110627-affenpinscher/n02110627_4457.jpg",
      name: "Darion",
      age: 0,
      breed: "Affenpinscher",
      zip_code: "15611",
      id: "nHGFTIcBOvEgQ5OCx8A2",
    },
    {
      img: "https://frontend-take-home.fetch.com/dog-images/n02110627-affenpinscher/n02110627_6811.jpg",
      name: "Gia",
      age: 2,
      breed: "Affenpinscher",
      zip_code: "75008",
      id: "rHGFTIcBOvEgQ5OCx8A2",
    },
    {
      img: "https://frontend-take-home.fetch.com/dog-images/n02110627-affenpinscher/n02110627_7013.jpg",
      name: "Zane",
      age: 2,
      breed: "Affenpinscher",
      zip_code: "60120",
      id: "sXGFTIcBOvEgQ5OCx8A2",
    },
  ];

  it("renders correctly", () => {
    const setSelectedDogs = jest.fn();
    render(
      <DogListGrid
        dogList={dogList}
        loading={false}
        selectedDogs={[]}
        setSelectedDogs={setSelectedDogs}
      />
    );
    const images = screen.getAllByRole("img");
    expect(images).toHaveLength(dogList.length);
    dogList.forEach((dog, index) => {
      expect(images[index]).toHaveAttribute("src", dog.img);
      expect(images[index]).toHaveAttribute("alt", dog.name);
    });
  });

  it("updates selectedDogs when IconButton is clicked", () => {
    const setSelectedDogs = jest.fn();
    render(
      <DogListGrid
        dogList={dogList}
        loading={false}
        selectedDogs={[]}
        setSelectedDogs={setSelectedDogs}
      />
    );

    const buttons = screen.getAllByRole("button");
    fireEvent.click(buttons[0]); // Click first IconButton

    // setSelectedDogs should be called with the clicked dog
    expect(setSelectedDogs).toHaveBeenCalledWith(
      expect.arrayContaining([dogList[0]])
    );

    //press the button again, setSelected should be called with empty array
    fireEvent.click(buttons[0]);
    expect(setSelectedDogs).toHaveBeenCalledWith(expect.arrayContaining([]));
  });
});
