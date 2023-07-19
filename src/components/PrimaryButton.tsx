import { BeatLoader } from "react-spinners";
import { classNames } from "../lib/functions";

// Primary button component, orange-500
// Loading can be handled automatically by passing the loading prop
export default function PrimaryButton({
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
        loading ? "hover:bg-orange-500" : "hover:bg-orange-600",
        "flex items-center justify-center w-full shadow-md bg-orange-500 text-white font-semibold p-2 px-3 rounded-lg hover:shadow-xl active:bg-orange-300 active:text-gray-500 disabled:bg-orange-200 disabled:text-gray-500",
        className ? className : ""
      )}
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
