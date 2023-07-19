import { FieldErrorsImpl, UseFormRegister } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import Col from "../Col";
import { classNames } from "../../lib/functions";

//  This component is a text input
//  This one uses react-hook-form to handle state and validation
//  This component can also be used in light and dark mode so as to work with the login page
export default function TextInput({
  id,
  label,
  placeholder,
  autoComplete,
  disabled,
  register,
  registerOptions,
  errors,
  light,
  className,
}: {
  id: string;
  label?: string;
  placeholder?: string;
  autoComplete?: string;
  disabled?: boolean;
  register: UseFormRegister<any>;
  registerOptions?: object;
  errors: Partial<FieldErrorsImpl<any>>;
  light?: boolean;
  className?: string;
}) {
  return (
    <Col>
      <div>
        {label && (
          <label
            htmlFor={id}
            className={classNames(
              light ? "text-white" : "text-gray-700",
              "block mb-1 text-xs xl:text-sm font-medium leading-4"
            )}
          >
            {label}
          </label>
        )}
        <div>
          <input
            id={id}
            type="text"
            placeholder={placeholder || ""}
            autoComplete={autoComplete || "off"}
            disabled={disabled || false}
            {...register(id, registerOptions)}
            className={`cursor-default relative text-gray-900 rounded-md border shadow-sm border-gray-300 bg-white pl-3 pr-3 py-2 text-left focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition ease-in-out duration-150 text-sm sm:leading-4 ${className}`}
          />
        </div>
      </div>
      <ErrorMessage
        errors={errors}
        name={id}
        render={({ message }) => (
          <p
            className={classNames(
              light ? "text-red-100" : "text-red-600",
              "mt-2 text-sm"
            )}
          >
            {message}
          </p>
        )}
      />
    </Col>
  );
}
