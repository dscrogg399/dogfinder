import { Dialog, Transition } from "@headlessui/react";
import { XCircleIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { Fragment } from "react";
import { Dog } from "../../types/Dog";
import IconButton from "../IconButton";
import PrimaryButton from "../PrimaryButton";

//This component is a slideover with the list of dogs the user has selected to match with
//The user can open the cart and if they've selected any dogs, they can generate a match
export default function MatchPanel({
  open,
  setOpen,
  selectedDogs,
  setSelectedDogs,
  handleMatch,
  loading,
}: {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  selectedDogs: Dog[];
  setSelectedDogs: React.Dispatch<React.SetStateAction<Dog[]>>;
  handleMatch: () => void;
  loading: boolean;
}) {
  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={setOpen}>
        <Transition.Child
          as={Fragment}
          enter="ease-in-out duration-500"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in-out duration-500"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10 sm:pl-16">
              <Transition.Child
                as={Fragment}
                enter="transform transition ease-in-out duration-500 sm:duration-700"
                enterFrom="translate-x-full"
                enterTo="translate-x-0"
                leave="transform transition ease-in-out duration-500 sm:duration-700"
                leaveFrom="translate-x-0"
                leaveTo="translate-x-full"
              >
                <Dialog.Panel className="pointer-events-auto w-screen max-w-md">
                  <div className="relative flex h-full flex-col overflow-y-scroll bg-white shadow-xl">
                    <div className="p-6">
                      <div className="flex items-start justify-between">
                        <Dialog.Title className="text-base font-semibold leading-6 text-gray-900">
                          Your Matches
                        </Dialog.Title>
                        <div className="ml-3 flex h-7 items-center">
                          <button
                            type="button"
                            className="rounded-md bg-white text-gray-400 hover:text-gray-500 focus:ring-2 focus:ring-blue-500"
                            onClick={() => setOpen(false)}
                          >
                            <span className="sr-only">Close panel</span>
                            <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                          </button>
                        </div>
                      </div>
                    </div>
                    <ul className="flex-1 divide-y divide-gray-200 overflow-y-auto">
                      {selectedDogs.length > 0 ? (
                        selectedDogs.map((dog: Dog) => (
                          <li key={dog.id}>
                            <div className="relative flex items-center px-5 py-6">
                              <div className="-m-1 block flex-1 p-1">
                                <div
                                  className="absolute inset-0"
                                  aria-hidden="true"
                                />
                                <div className="relative flex min-w-0 flex-1 items-center">
                                  <span className="relative inline-block flex-shrink-0">
                                    <img
                                      className="h-10 w-10 rounded-full"
                                      src={dog.img}
                                      alt={dog.name}
                                    />
                                  </span>
                                  <div className="ml-4 truncate">
                                    <p className="truncate text-sm font-medium text-gray-900">
                                      {dog.name}
                                    </p>
                                    <p className="truncate text-sm text-gray-500">
                                      {dog.breed}
                                    </p>
                                  </div>
                                </div>
                              </div>
                              <IconButton
                                title={"Remove from Matches"}
                                onClick={() => {
                                  setSelectedDogs(
                                    selectedDogs.filter(
                                      (selectedDog) => selectedDog.id !== dog.id
                                    )
                                  );
                                }}
                                className="z-10 text-gray-300 hover:text-blue-300 active:text-blue-400"
                                icon={<XCircleIcon className="w-8 h-8" />}
                              />
                            </div>
                          </li>
                        ))
                      ) : (
                        <p className="mt-8 text-center mx-auto text-sm text-gray-600">
                          No dogs selected
                        </p>
                      )}
                    </ul>
                    {selectedDogs.length > 0 && (
                      <div className="absolute bottom-2 left-0 right-0 w-1/2 mx-auto">
                        <PrimaryButton
                          onClick={async () => {
                            await handleMatch();
                            setOpen(false);
                          }}
                          className="inline-flex"
                          loading={loading}
                        >
                          Match
                        </PrimaryButton>
                      </div>
                    )}
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
