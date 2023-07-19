import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import { useState } from "react";

//this component handles the pagination for the dog finder page
export default function Pagination({
  fetchNextPage,
  fetchPrevPage,
  fetchPageNumber,
  totalDogs,
  pageSize,
}: {
  fetchNextPage: () => void;
  fetchPrevPage: () => void;
  fetchPageNumber: (page: number) => void;
  totalDogs: number;
  pageSize: number;
}) {
  //state
  const [pageNumber, setPageNumber] = useState(1);
  let pageCount = Math.ceil(totalDogs / pageSize);
  let elementOne = pageNumber * pageSize - pageSize + 1;

  //page change handlers
  const gotoNextPage = () => {
    if (pageNumber < pageCount) {
      setPageNumber(pageNumber + 1);
      fetchNextPage();
    }
  };

  const gotoPrevPage = () => {
    if (pageNumber > 1) {
      setPageNumber(pageNumber - 1);
      fetchPrevPage();
    }
  };

  return (
    <div className="flex items-center justify-between bg-transparent px-4 py-3 sm:px-6">
      <div className="flex flex-1 justify-between items-center sm:hidden">
        <button
          type="button"
          aria-label="Previous button on small screens"
          disabled={pageNumber === 1}
          onClick={gotoPrevPage}
          className="relative inline-flex items-center rounded-md border border-gray-300 bg-transparent px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:hover:bg-white disabled:bg-gray-100"
        >
          Previous
        </button>
        {totalDogs > 0 && (
          <p
            title="results count small"
            className="text-xs text-gray-700 text-center"
          >
            Page <span className="font-medium">{pageNumber}</span> of{" "}
            <span className="font-medium">{pageCount}</span>
          </p>
        )}
        <button
          type="button"
          aria-label="Next button on small screens"
          disabled={pageNumber === pageCount}
          onClick={gotoNextPage}
          className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-transparent px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:hover:bg-white disabled:bg-gray-100"
        >
          Next
        </button>
      </div>
      <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
        <div>
          {totalDogs > 0 && (
            <p title="results count large" className="text-sm text-gray-700">
              Showing{" "}
              <span className="font-medium">
                {elementOne > 0 ? elementOne : "0"}
              </span>{" "}
              to
              <span className="font-medium">
                {pageNumber * pageSize > totalDogs
                  ? totalDogs
                  : pageNumber * pageSize}
              </span>{" "}
              <span className="font-medium">{totalDogs}</span> results
            </p>
          )}
        </div>
        <div>
          <nav
            className="isolate inline-flex -space-x-px rounded-md shadow-sm"
            aria-label="Pagination"
          >
            {/* prev page */}
            <button
              type="button"
              aria-label="Previous button on large screens"
              onClick={gotoPrevPage}
              disabled={pageNumber === 1}
              className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 disabled:hover:bg-white disabled:bg-gray-100"
            >
              <span className="sr-only">Previous</span>
              <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
            </button>
            {/* page 1, always shown */}
            {renderButton(1, pageNumber, () => {
              setPageNumber(1);
              fetchPageNumber(1);
            })}
            {/* ... shown when current page is above 3 */}
            {pageNumber > 3 && (
              <span className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-700 ring-1 ring-inset ring-gray-300 focus:outline-offset-0">
                ...
              </span>
            )}
            {/* render the page number +/- 1 page  */}
            {new Array(pageCount).fill(null).map((_, index) => {
              if (
                index >= pageNumber - 2 &&
                index <= pageNumber &&
                index !== 0 &&
                index !== pageCount - 1
              ) {
                return renderButton(index + 1, pageNumber, () => {
                  setPageNumber(index + 1);
                  fetchPageNumber(index + 1);
                });
              } else {
                return null;
              }
            })}
            {/* ... shown when current pages between page number + 1 and final page*/}
            {pageNumber < pageCount - 2 && (
              <span className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-700 ring-1 ring-inset ring-gray-300 focus:outline-offset-0">
                ...
              </span>
            )}
            {/* final page */}
            {pageCount > 1 &&
              renderButton(pageCount, pageNumber, () => {
                setPageNumber(pageCount);
                fetchPageNumber(pageCount);
              })}
            {/* next page */}
            <button
              type="button"
              aria-label="Next button on large screens"
              disabled={pageNumber === pageCount}
              onClick={gotoNextPage}
              className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 disabled:hover:bg-white disabled:bg-gray-100"
            >
              <span className="sr-only">Next</span>
              <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
            </button>
          </nav>
        </div>
      </div>
    </div>
  );
}

//this component dynamically renders buttons depending on if they're selected and what page is selected
function renderButton(
  pageNumber: number,
  currentPage: number,
  fetchPage: () => void
) {
  const isCurrentPage = pageNumber === currentPage;
  const baseClass =
    "relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0";
  const currentClass =
    "relative z-10 inline-flex items-center bg-orange-500 px-4 py-2 text-sm font-semibold text-white focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600";
  const className = isCurrentPage ? currentClass : baseClass;
  return (
    <button type="button" onClick={() => fetchPage()} className={className}>
      {pageNumber}
    </button>
  );
}
