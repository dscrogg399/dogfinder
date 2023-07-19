import IconButton from "../IconButton";
import Logo from "../Logo";
import Row from "../Row";
import paw from "../../paw.svg";
import { useState } from "react";
import useDogFinder from "../../hooks/useDogFinder";
import Col from "../Col";
import PrimaryButton from "../PrimaryButton";
import { Fetcher } from "../../lib/Fetcher";
import Filters from "./Filters";
import DogListGrid from "./DogListGrid";
import Pagination from "./Pagination";
import { Dog } from "../../types/Dog";
import MatchPanel from "./MatchPanel";
import DogModal from "./DogModal";

//This is the main component for the dog finder page
//it lays out the cart, filters, dog list, and pagination and supplies all the child components with
//necessary state and functions. It also handles the logout functionality.
function DogFinder({
  setLoggedIn,
}: {
  setLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  //state
  const {
    breeds,
    searchParams,
    setFilters,
    dogList,
    fetchNextPage,
    fetchPrevPage,
    fetchPageNumber,
    totalDogs,
    pageSize,
    loading,
  } = useDogFinder();
  const [selectedDogs, setSelectedDogs] = useState<Dog[]>([]);
  const [matchPanelOpen, setMatchPanelOpen] = useState<boolean>(false);
  const [matchLoading, setMatchLoading] = useState<boolean>(false);
  const [matchedDogOpen, setMatchedDogOpen] = useState<boolean>(false);
  const [matchedDog, setMatchedDog] = useState<Dog | null>(null);

  //functions
  async function handleLogOut() {
    setLoggedIn(false);
    await Fetcher.post("/auth/logout");
  }

  async function handleMatch() {
    setMatchLoading(true);
    const ids = selectedDogs.map((dog) => dog.id);
    await Fetcher.post("/dogs/match", ids)
      .then(async (res) => {
        const data = await res.json();
        return data.match;
      })
      .then((data) => {
        setMatchedDog(selectedDogs.find((dog: Dog) => dog.id === data)!);
        setMatchedDogOpen(true);
      })
      .finally(() => {
        setMatchLoading(false);
      });
  }

  return (
    <Col className="px-5 w-full 2xl:w-[90%] mx-auto h-full overflow-y-scroll relative justify-start space-y-4 pb-4">
      <MatchPanel
        open={matchPanelOpen}
        setOpen={setMatchPanelOpen}
        selectedDogs={selectedDogs}
        setSelectedDogs={setSelectedDogs}
        handleMatch={handleMatch}
        loading={matchLoading}
      />
      <DogModal
        open={matchedDogOpen}
        setOpen={setMatchedDogOpen}
        dog={matchedDog}
        setDog={setMatchedDog}
      />
      <Row className="justify-between items-start">
        <div>
          <Logo />
        </div>
        <div className="flex flex-col-reverse mt-2 items-center justify-center md:space-x-8 md:mt-8 md:flex-row">
          <div className="inline-flex">
            <PrimaryButton onClick={handleLogOut}>Log Out</PrimaryButton>
          </div>
          <div className="relative mb-2">
            <IconButton
              onClick={() => setMatchPanelOpen(true)}
              icon={<img src={paw} alt="" className="w-8 h-8 m-2" />}
              className="border-2 mb-2 border-orange-500 rounded-full shadow-md hover:shadow-xl hover:bg-gray-300 active:bg-white md:mb-0"
            />
            {selectedDogs.length > 0 && (
              <div className="absolute flex items-center justify-center right-0 bottom-0 md:-right-1 md:-bottom-2 h-8 w-8 rounded-full bg-blue-500 text-white">
                {selectedDogs.length}
              </div>
            )}
          </div>
        </div>
      </Row>
      <section className="w-[95%] flex flex-col flex-grow mx-auto shadow-lg rounded-xl bg-white px-4 pb-2 pt-1">
        <h2 className="text-orange-500 font-semibold text-2xl text-center">
          Let's find your best friend!
        </h2>
        <hr className="border-orange-500 border-t-2 w-3/4 mx-auto mt-1 mb-4 rounded-full md:w-1/2" />
        <Col className="w-full h-full">
          <Filters
            breeds={breeds}
            searchParams={searchParams}
            setFilters={setFilters}
          />
          <Col className="flex-grow w-full justify-between">
            <DogListGrid
              dogList={dogList}
              loading={loading}
              selectedDogs={selectedDogs}
              setSelectedDogs={setSelectedDogs}
            />
            <Pagination
              fetchNextPage={fetchNextPage}
              fetchPrevPage={fetchPrevPage}
              fetchPageNumber={fetchPageNumber}
              totalDogs={totalDogs}
              pageSize={pageSize}
            />
          </Col>
        </Col>
      </section>
    </Col>
  );
}

export default DogFinder;
