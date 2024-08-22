import { Icon } from "@/components/atoms/";

interface InputProps {
    type:
        | "text"
        | "email"
        | "password"
        | "number"
        | "select"
        | "checkbox"
        | "radio"
        | "date"
        | "time"
        | "datetime-local"
        | "textarea";
    label: string;
    name?: string;
    options?: {
        value: string;
        label: string;
    }[];
    placeholder?: string;
    field?: any;
    form?: any;
    fullWidth?: boolean;
    disabled?: boolean;
}

const CustomInput = ({
    type,
    label,
    options,
    field,
    fullWidth,
    form: { touched, errors },
    ...props
}: InputProps) => {
    const inputProps = {
        ...field,
        ...props,
    };
    return (
        <div className={fullWidth ? "col-span-2" : ""}>
            <label
                htmlFor={field.name}
                className="mb-2 block text-sm font-bold text-gray-400"
            >
                {label}
            </label>
            {type === "select" ? (
                <select
                    className="w-full rounded-lg border-2 border-gray-200 p-2 text-gray-500 disabled:opacity-50"
                    {...inputProps}
                >
                    <option value="">-- Selecciona {label} --</option>
                    {options?.length &&
                        options.map((input, index) => (
                            <option key={index} value={input?.value}>
                                {input?.label}
                            </option>
                        ))}
                </select>
            ) : type === "textarea" ? (
                <textarea
                    type={type}
                    className={`w-full rounded-lg border-2 border-gray-200 bg-white p-2 text-sm text-blue-800  ${
                        errors[field.name]
                            ? "focus:border-red-300"
                            : "focus:border-blue-300"
                    } focus:outline-none disabled:opacity-50`}
                    {...inputProps}
                />
            ) : type === "checkbox" ? (
                <input
                    type={type}
                    {...inputProps}
                    className={`customCheck my-1 ${
                        errors[field.name]
                            ? "focus:border-red-300"
                            : "focus:border-blue-300"
                    } focus:outline-none disabled:opacity-50`}
                />
            ) : (
                <input
                    type={type}
                    {...inputProps}
                    className={`w-full rounded-lg border-2 border-gray-200 bg-white p-2 text-sm text-blue-800  ${
                        errors[field.name]
                            ? "focus:border-red-300"
                            : "focus:border-blue-300"
                    } focus:outline-none disabled:opacity-50`}
                />
            )}

            {touched[field.name] && errors[field.name] && (
                <div className="error flex items-center gap-2">
                    {" "}
                    <Icon icon="alert" className="text-xl" />{" "}
                    {errors[field.name]}
                </div>
            )}
        </div>
    );
};

export default CustomInput;
