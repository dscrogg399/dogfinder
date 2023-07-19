import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { DogSearchParams } from "../../types/DogSearchParams";
import MultiSelect from "../form/MultiSelect";
import NumberInput from "../form/NumberInput";
import Select from "../form/Select";
import TextInput from "../form/TextInput";

interface HookFormInputs {
  min_age: number;
  max_age: number;
  zip_code: string;
  sort: string;
  order: string;
}

//This component handles the filters for the dog finder page
//Using react-hook-form, the state and validation for the simpler filters are handled
//The breed filter is handled using useState because reactHookForms is a little weird with multi-selects
export default function Filters({
  searchParams,
  setFilters,
  breeds,
}: {
  searchParams: DogSearchParams;
  setFilters: (params: DogSearchParams) => void;
  breeds: string[];
}) {
  //state
  const [selectedBreeds, setSelectedBreeds] = useState<string[]>([]);
  const sortOptions = ["Age", "Name", "Breed"];
  const orderOptions = ["Asc", "Desc"];

  const {
    register,
    watch,
    control,
    formState: { errors },
  } = useForm<HookFormInputs>({
    defaultValues: {
      min_age: 0,
      max_age: 5,
      sort: "Breed",
      order: "Asc",
    },
  });

  //lifecycle
  //when selected breeds change
  useEffect(() => {
    const newParams = { ...searchParams, breeds: selectedBreeds };
    setFilters(newParams);
  }, [selectedBreeds]);

  //when min age changes
  useEffect(() => {
    const newParams = { ...searchParams, ageMin: watch("min_age") };
    setFilters(newParams);
  }, [watch("min_age")]);

  //when max age changes
  useEffect(() => {
    const newParams = { ...searchParams, ageMax: watch("max_age") };
    setFilters(newParams);
  }, [watch("max_age")]);

  //when max zip code changes
  useEffect(() => {
    if (watch("zip_code").length === 5) {
      const newParams = { ...searchParams, zipCodes: [watch("zip_code")] };
      setFilters(newParams);
    } else if (watch("zip_code").length === 0) {
      const newParams = { ...searchParams, zipCodes: [] };
      setFilters(newParams);
    }
  }, [watch("zip_code")]);

  //when sort or order changes changes
  useEffect(() => {
    const newParams = {
      ...searchParams,
      sort: `${watch("sort").toLowerCase()}:${watch("order").toLowerCase()}`,
    };
    setFilters(newParams);
  }, [watch("sort"), watch("order")]);

  return (
    <div className="grid grid-cols-3 space-y-1 xl:space-y-0 xl:grid-cols-6">
      <div className="inline-flex lg:block">
        <MultiSelect
          id={"breeds"}
          label={"Breeds"}
          list={breeds}
          selectedItems={selectedBreeds}
          setSelectedItems={setSelectedBreeds}
          placeholder={"Select..."}
        />
      </div>
      <NumberInput
        id={"min_age"}
        label={"Min Age"}
        control={control}
        placeholder={"Min Age"}
        min={0}
        max={watch("max_age") - 1}
        className="w-1/2"
      />
      <NumberInput
        id={"max_age"}
        label={"Max Age"}
        placeholder={"Max Age"}
        control={control}
        min={watch("min_age") + 1}
        max={20}
        className="w-1/2"
      />
      <TextInput
        id="zip_code"
        label="Zip Code"
        placeholder="Zip Code"
        register={register}
        registerOptions={{
          required: "Please enter a zip code",
          pattern: {
            value: /^\d{5}(?:[-\s]\d{4})?$/,
            message: "Please enter a valid zip code",
          },
        }}
        errors={errors}
        className="w-1/2"
      />
      <Select
        id={"sort"}
        label={"Sort By"}
        control={control}
        list={sortOptions}
      />
      <Select
        id={"order"}
        label={"Order"}
        control={control}
        list={orderOptions}
      />
    </div>
  );
}
