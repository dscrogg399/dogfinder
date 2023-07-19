import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { Dog } from "../../types/Dog";
import dogNose from "../../dog-nose.svg";
import PrimaryButton from "../PrimaryButton";
import SecondaryButton from "../SecondaryButton";

//this modal displays the dog generated from the match endpoint
//it is displayed when the user clicks the match button and then the user can either
//accept the match or reject it (these do the same thing right now)
export default function DogModal({
  open,
  setOpen,
  dog,
  setDog,
}: {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  dog: Dog | null;
  setDog: React.Dispatch<React.SetStateAction<Dog | null>>;
}) {
  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={setOpen}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-gray-100 px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6">
                <div>
                  <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-orange-200">
                    <img
                      src={dogNose}
                      alt="Pup Quest Icon"
                      className="h-8 w-8"
                    />
                  </div>
                  <div className="mt-3 text-center">
                    <Dialog.Title
                      as="h3"
                      className="text-2xl font-medium leading-6 text-gray-900"
                    >
                      Meet{" "}
                      <span className="text-orange-500 font-semibold">
                        {dog?.name}
                      </span>
                      , your new best friend!
                    </Dialog.Title>
                    <div className="mt-2 w-full">
                      <img
                        src={dog?.img}
                        alt={dog?.name}
                        className="w-full rounded-xl"
                      />
                    </div>
                  </div>
                </div>
                <div className="flex flex-row space-x-4 w-full mt-5 sm:mt-6">
                  <SecondaryButton
                    onClick={() => {
                      setOpen(false);
                      setDog(null);
                    }}
                  >
                    Not the one...
                  </SecondaryButton>
                  <PrimaryButton
                    onClick={() => {
                      setOpen(false);
                      setDog(null);
                    }}
                  >
                    Hooray!
                  </PrimaryButton>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
