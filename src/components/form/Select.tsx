import { Listbox, Transition } from "@headlessui/react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/24/outline";
import { Fragment } from "react";
import { Control, Controller } from "react-hook-form";
import { classNames } from "../../lib/functions";
import Col from "../Col";

// This component is a select drop down
// This one uses react-hook-form to handle state and validation
export default function Select({
  id,
  label,
  list,
  control,
}: {
  id: string;
  label?: string;
  list: string[];
  control: Control<any, any>;
}) {
  return (
    <Col>
      <div>
        {label && (
          <label
            htmlFor={id}
            className="block mb-1 text-xs xl:text-sm font-medium leading-4 text-gray-700"
          >
            {label}
          </label>
        )}
        <Controller
          name={id}
          control={control}
          rules={{
            required: "Please select an option",
          }}
          render={({ field: { onChange, value } }) => (
            <Listbox value={value} onChange={onChange}>
              {({ open }) => (
                <>
                  <div className="relative">
                    <Listbox.Button
                      id={id}
                      className="cursor-default relative rounded-md border shadow-sm border-gray-300 bg-white pl-3 pr-10 py-2 text-left focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition ease-in-out duration-150 text-xs sm:leading-3"
                    >
                      <span className="block truncate">{value}</span>
                      <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                        <ChevronUpDownIcon
                          className="h-5 w-5 text-gray-400"
                          aria-hidden="true"
                        />
                      </span>
                    </Listbox.Button>

                    <Transition
                      show={open}
                      as={Fragment}
                      leave="transition ease-in duration-100"
                      leaveFrom="opacity-100"
                      leaveTo="opacity-0"
                    >
                      <Listbox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                        {list.map((item) => (
                          <Listbox.Option
                            as="li"
                            key={item}
                            className={({ active }) =>
                              classNames(
                                active
                                  ? "text-white bg-blue-600"
                                  : "text-gray-900",
                                "relative cursor-default select-none py-2 pl-3 pr-4"
                              )
                            }
                            value={item}
                          >
                            {({ selected, active }) => (
                              <>
                                <span
                                  className={classNames(
                                    selected ? "font-semibold" : "font-normal",
                                    "block truncate"
                                  )}
                                >
                                  {item}
                                </span>

                                {selected ? (
                                  <span
                                    className={classNames(
                                      active ? "text-white" : "text-indigo-600",
                                      "absolute inset-y-0 right-0 flex items-center pr-4"
                                    )}
                                  >
                                    <CheckIcon
                                      className="h-5 w-5"
                                      aria-hidden="true"
                                    />
                                  </span>
                                ) : null}
                              </>
                            )}
                          </Listbox.Option>
                        ))}
                      </Listbox.Options>
                    </Transition>
                  </div>
                </>
              )}
            </Listbox>
          )}
        />
      </div>
    </Col>
  );
}
