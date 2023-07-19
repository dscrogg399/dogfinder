import { Control, Controller } from "react-hook-form";
import Col from "../Col";

//  This component is a number (integer only) input, used for selecting age filters
//  This one uses react-hook-form to handle state and validation
export default function NumberInput({
  id,
  label,
  placeholder,
  min,
  max,
  className,
  control,
}: {
  id: string;
  label?: string;
  placeholder?: string;
  min?: number;
  max?: number;
  className?: string;
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

        <div>
          <Controller
            name={id}
            control={control}
            rules={{
              min: min || undefined,
              max: max || undefined,
              pattern: /^[0-9]*$/,
            }}
            render={({ field: { onChange, value } }) => (
              <input
                id={id}
                value={value}
                type="number"
                onChange={(e) => {
                  let val = Number(e.target.value);
                  if (
                    (min !== undefined && val < min) ||
                    (max !== undefined && val > max)
                  ) {
                    // do nothing if val is out of bounds
                  } else {
                    onChange(val);
                  }
                }}
                placeholder={placeholder || ""}
                className={`cursor-default text-gray-900 rounded-md border shadow-sm border-gray-300 bg-white px-3 py-2 text-left focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition ease-in-out duration-150 text-xs sm:leading-3 ${className}`}
              />
            )}
          />
        </div>
      </div>
    </Col>
  );
}
