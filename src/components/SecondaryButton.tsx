import { BeatLoader } from "react-spinners";
import { classNames } from "../lib/functions";

// Secondary button component, white
// Loading can be handled automatically by passing the loading prop
export default function SecondaryButton({
  type,
  onClick,
  children,
  className,
  disabled,
  loading,
}: {
  type?: "button" | "submit" | "reset";
  onClick?: any;
  children: React.ReactNode;
  className?: string;
  disabled?: boolean;
  loading?: boolean;
}) {
  return (
    <button
      type={type || "button"}
      disabled={disabled || false}
      onClick={onClick}
      className={classNames(
        loading
          ? "hover:bg-white hover:text-gray-600"
          : "hover:bg-gray-300 hover:text-black",
        "flex items-center justify-center w-full shadow-md bg-white text-gray-600 font-semibold p-2 px-3 rounded-lg hover:shadow-xl active:bg-gray-100 disabled:bg-gray-300 disabled:text-gray-600",
        className ? className : ""
      )}
      // className={` ${className}`}
    >
      {loading ? (
        <BeatLoader
          loading={loading}
          color="#ccc"
          aria-label="Loading Spinner"
          size={15}
          className="py-0.5"
        />
      ) : (
        <>{children}</>
      )}
    </button>
  );
}
