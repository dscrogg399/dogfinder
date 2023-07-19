import { useEffect, useState } from "react";
import { Fetcher } from "../lib/Fetcher";
import { Dog } from "../types/Dog";
import { DogSearchParams } from "../types/DogSearchParams";

interface DogSearchResponse {
  resultIds: string[];
  total: number;
  next?: string;
  prev?: string;
}

// This is a custom hook used to handle all the fetching for the content of the dog finder page
// I skipped testing this section because I'd likely be replicating a lot of tests for the backend
function useDogFinder() {
  //base state
  const pageSize = 10;
  const [dogList, setDogList] = useState<Dog[]>([]);
  const [totalDogs, setTotalDogs] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [next, setNext] = useState<string | undefined>(undefined);
  const [prev, setPrev] = useState<string | undefined>(undefined);
  const [searchParams, setSearchParams] = useState<DogSearchParams>({
    ageMin: 0,
    ageMax: 5,
    size: pageSize,
    sort: "breed:asc",
    from: 0,
  });
  const [breeds, setBreeds] = useState<string[]>([]);

  /**
   * Fetches the list of breeds from the server
   *
   * @returns {Promise<void>}
   */
  const getBreeds = async () => {
    const res = await Fetcher.get("/dogs/breeds");
    const breeds = (await res.json()) as string[];
    setBreeds(breeds);
  };

  /**
   * This function fetches the list of dog ids based off the url, then fetches the content of each dog
   *
   * @param {string} url
   * @returns {Promise<void>}
   */
  const fetchDogs = async (url: string) => {
    setLoading(true);
    setError(null);
    try {
      //fetch ids for dogs on this page
      const idsRes = await Fetcher.get(url);
      const {
        resultIds,
        total,
        next: nextPage,
        prev: prevPage,
      } = (await idsRes.json()) as DogSearchResponse;

      //fetch dog details
      const detailsRes = await Fetcher.post("/dogs", resultIds);
      const dogs = (await detailsRes.json()) as Dog[];

      setDogList(dogs);
      setTotalDogs(total);
      setNext(nextPage);
      setPrev(prevPage);
    } catch (e: unknown) {
      if (e instanceof Error) {
        setError(e.message);
      } else {
        setError("An error occurred");
      }
    } finally {
      setLoading(false);
    }
  };

  /**
   * Fetches the next page of dogs when one is available
   *
   * @returns {Promise<void>}
   */
  const fetchNextPage = async () => {
    if (next) {
      fetchDogs(next);
    }
  };

  /**
   * Fetches the previous page of dogs when one is available
   *
   * @returns {Promise<void>}
   */
  const fetchPrevPage = async () => {
    if (prev) {
      fetchDogs(prev);
    }
  };

  /**
   * Fetches a specific page of dogs
   *
   * @param pageNumber
   * @returns {Promise<void>}
   */
  const fetchPageNumber = (pageNumber: number) => {
    const from = (pageNumber - 1) * searchParams.size;
    const newParams = { ...searchParams, from };
    setFilters(newParams);
  };

  /**
   * Sets the filters for the dog finder page
   *
   * @param params
   * @returns {void}
   */
  const setFilters = (params: DogSearchParams) => {
    setSearchParams((prevState) => ({ ...prevState, ...params }));
  };

  /**
   * Builds the query string for the dog finder page
   *
   * @param params
   * @returns {string}
   */
  const buildQueryString = (params: DogSearchParams): string => {
    let url = "/dogs/search?";
    let queryStringComponents: string[] = [];

    if (params.ageMin !== undefined) {
      queryStringComponents.push(`ageMin=${params.ageMin}`);
    }

    if (params.ageMax !== undefined) {
      queryStringComponents.push(`ageMax=${params.ageMax}`);
    }

    if (params.size !== undefined) {
      queryStringComponents.push(`size=${params.size}`);
    }

    if (params.from) {
      queryStringComponents.push(`from=${params.from}`);
    }

    if (params.sort) {
      queryStringComponents.push(`sort=${encodeURIComponent(params.sort)}`);
    }

    if (params.breeds) {
      params.breeds.forEach((breed, index) => {
        queryStringComponents.push(
          `breeds[${index}]=${encodeURIComponent(breed)}`
        );
      });
    }

    if (params.zipCodes) {
      params.zipCodes.forEach((zipCode, index) => {
        queryStringComponents.push(
          `zipCodes[${index}]=${encodeURIComponent(zipCode)}`
        );
      });
    }

    url += queryStringComponents.join("&");
    return url;
  };

  //lifecycle
  //on mount
  useEffect(() => {
    getBreeds();
  }, []);

  useEffect(() => {
    const url = buildQueryString(searchParams);
    fetchDogs(url);
  }, [searchParams]);

  return {
    dogList,
    totalDogs,
    loading,
    error,
    searchParams,
    setFilters,
    fetchNextPage,
    fetchPrevPage,
    breeds,
    fetchPageNumber,
    pageSize,
  };
}

export default useDogFinder;
