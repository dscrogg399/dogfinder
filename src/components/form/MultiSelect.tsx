import Col from "../Col";
import { Listbox, Transition } from "@headlessui/react";
import Row from "../Row";
import IconButton from "../IconButton";
import { XMarkIcon } from "@heroicons/react/24/outline";

// This component is a multi select drop down, used for selecting breeds to filter by
// This one uses useState to handle selected items
export default function MultiSelect({
  id,
  label,
  placeholder,
  list,
  selectedItems,
  setSelectedItems,
}: {
  id: string;
  label: string;
  placeholder?: string;
  list: string[];
  selectedItems: string[];
  setSelectedItems: React.Dispatch<React.SetStateAction<string[]>>;
}) {
  function isSelected(item: string) {
    return selectedItems.find((el: string) => el === item) ? true : false;
  }

  function handleSelect(item: string) {
    if (!isSelected(item)) {
      const selectedItemsUpdate = [...selectedItems, item];
      setSelectedItems(selectedItemsUpdate);
    } else {
      handleDeselect(item);
    }
  }

  function handleDeselect(item: string) {
    const selectedItemsUpdated = selectedItems.filter(
      (el: string) => el !== item
    );

    setSelectedItems(selectedItemsUpdated);
  }

  return (
    <Col>
      <div>
        <label
          htmlFor={id}
          className="block mb-1 text-xs xl:text-sm font-medium leading-4 text-gray-700"
        >
          {label}
        </label>
        <Row className="items-center space-x-1">
          {" "}
          <Listbox
            as="div"
            value={selectedItems}
            //typing this to string isn't working, its tracking item as the type of input value, which is a string array
            //even though the object getting passed into this when it actually runs IS a string
            onChange={(item: any) => handleSelect(item)}
          >
            {({ open }) => (
              <>
                <div className="relative">
                  <span className="inline-block rounded-md shadow-sm">
                    <Listbox.Button className="cursor-default relative w-full rounded-md border shadow-sm border-gray-300 bg-white pl-3 pr-10 py-2 text-left focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition ease-in-out duration-150 text-xs sm:leading-3">
                      <span className="hidden lg:block truncate">
                        {selectedItems.length < 1
                          ? placeholder
                          : `Selected (${selectedItems.length})`}
                      </span>
                      <span className="block lg:hidden">
                        {selectedItems.length}
                      </span>
                      <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                        <svg
                          className="h-5 w-5 text-gray-400"
                          viewBox="0 0 20 20"
                          fill="none"
                          stroke="currentColor"
                        >
                          <path
                            d="M7 7l3-3 3 3m0 6l-3 3-3-3"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </span>
                    </Listbox.Button>
                  </span>

                  <Transition
                    unmount={false}
                    leave="transition ease-in duration-100"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                    className="absolute mt-1 w- rounded-md bg-white shadow-lg z-30"
                  >
                    {open && (
                      <>
                        <Listbox.Options
                          static
                          className="max-h-60 rounded-md py-1 text-sm leading-4 shadow-xs overflow-auto focus:outline-none "
                        >
                          {list.map((item) => {
                            const selected = isSelected(item);
                            return (
                              <Listbox.Option key={item} value={item}>
                                {({ active }) => (
                                  <div
                                    className={`${
                                      active
                                        ? "text-white bg-blue-600"
                                        : "text-gray-900"
                                    } cursor-default select-none relative py-2 pl-8 pr-4`}
                                  >
                                    <span
                                      className={`${
                                        selected
                                          ? "font-semibold"
                                          : "font-normal"
                                      } block truncate`}
                                    >
                                      {item}
                                    </span>
                                    {selected && (
                                      <span
                                        className={`${
                                          active
                                            ? "text-white"
                                            : "text-blue-600"
                                        } absolute inset-y-0 left-0 flex items-center pl-1.5`}
                                      >
                                        <svg
                                          className="h-5 w-5"
                                          xmlns="http://www.w3.org/2000/svg"
                                          viewBox="0 0 20 20"
                                          fill="currentColor"
                                        >
                                          <path
                                            fillRule="evenodd"
                                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                            clipRule="evenodd"
                                          />
                                        </svg>
                                      </span>
                                    )}
                                  </div>
                                )}
                              </Listbox.Option>
                            );
                          })}
                        </Listbox.Options>
                      </>
                    )}
                  </Transition>
                </div>
              </>
            )}
          </Listbox>
          {selectedItems.length > 0 && (
            <IconButton
              onClick={() => setSelectedItems([])}
              className="rounded-full hover:shadow-lg hover:bg-gray-200 active:bg-gray-100"
              icon={<XMarkIcon className="w-4 h-4 text-gray-500" />}
            />
          )}
        </Row>
      </div>
    </Col>
  );
}
