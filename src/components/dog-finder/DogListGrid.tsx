import { HeartIcon } from "@heroicons/react/24/outline";
import { HeartIcon as SolidHeartIcon } from "@heroicons/react/24/solid";
import { BounceLoader } from "react-spinners";
import { Dog } from "../../types/Dog";
import Col from "../Col";
import IconButton from "../IconButton";
import Row from "../Row";

//This component displays the dog list in a two column grid by default, one column when the screen is small
//It also allows the user to select dogs to match with through the setSelectedDogs prop
export default function DogListGrid({
  dogList,
  loading,
  selectedDogs,
  setSelectedDogs,
}: {
  dogList: Dog[];
  loading: boolean;
  selectedDogs: Dog[];
  setSelectedDogs: React.Dispatch<React.SetStateAction<Dog[]>>;
}) {
  return (
    <Col className="mt-2 flex-grow w-full h-full justify-between">
      {loading ? (
        <div className="flex h-full items-center justify-center">
          <BounceLoader
            loading={loading}
            aria-label="Loading Spinner"
            size={50}
            color="#f97315"
          />
        </div>
      ) : (
        <>
          {dogList.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2">
              {dogList.map((dog) => (
                <Row
                  key={dog.id}
                  className="relative items-start border-2 border-gray-100 bg-gray-50 text-transparent rounded-lg shadow-md m-2 p-2 transform transition duration-500 ease-in-out hover:bg-orange-100 hover:text-white hover:shadow-lg hover:-translate-y-1"
                >
                  <img
                    src={dog.img}
                    alt={dog.name}
                    className="w-32 h-32 rounded-xl z-5"
                  />
                  <div className="text-gray-900 grid grid-cols-1 text-left w-full h-full ml-8 lg:mt-3 lg:grid-cols-2 z-10">
                    <h4 className="text-orange-500 font-semibold text-3xl">
                      {dog.name}
                    </h4>
                    <p>
                      <span className="font-semibold">Breed:</span> {dog.breed}
                    </p>
                    <p>
                      <span className="font-semibold">Age:</span>{" "}
                      {dog.age > 0 ? dog.age : "< 1 year"}
                    </p>
                    <p>
                      <span className="font-semibold">Zip Code:</span>{" "}
                      {dog.zip_code}
                    </p>
                  </div>
                  {selectedDogs.some(
                    (selectedDog) => selectedDog.id === dog.id
                  ) ? (
                    <IconButton
                      onClick={() => {
                        const updatedSelectedDogs = selectedDogs.filter(
                          (selectedDog) => selectedDog.id !== dog.id
                        );
                        setSelectedDogs(updatedSelectedDogs);
                      }}
                      className="text-blue-500 hover:text-blue-300 active:text-blue-200"
                      icon={<SolidHeartIcon className=" w-10 h-10" />}
                    />
                  ) : (
                    <IconButton
                      onClick={() => {
                        const updatedSelectedDogs = [...selectedDogs, dog];
                        setSelectedDogs(updatedSelectedDogs);
                      }}
                      className="hover:text-blue-200 active:text-blue-400"
                      icon={<HeartIcon className=" w-10 h-10" />}
                    />
                  )}
                </Row>
              ))}
            </div>
          ) : (
            <div className="flex h-full items-center justify-center">
              <p className="text-gray-500">No dogs found</p>
            </div>
          )}
        </>
      )}
    </Col>
  );
}
