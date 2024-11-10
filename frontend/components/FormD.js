import { useState, useEffect } from "react";

const FormComponent = ({ fields, model, custom_class, onSubmit, rest }) => {
  const [filter, setFilter] = useState([]);
  const [formModel, setFormModel] = useState({ ...model });

  useEffect(() => {
    // Set initial filter with password visibility and default options for select fields
    const initialFilter = fields.map((field) => ({
      ...field,
      showPass: field.type === "password" ? field.showPass || false : undefined,
    }));
    setFilter(initialFilter);

    // Initialize the first option for select fields
    fields.forEach((field) => {
      if (field.type === "select" && field.options?.length > 0) {
        setFormModel((prev) => ({
          ...prev,
          [field.name]: field.options[0].name,
        }));
      }
    });
  }, [fields]);

  const togglePass = (index) => {
    setFilter((prev) =>
      prev.map((field, i) =>
        i === index && field.type === "password"
          ? { ...field, showPass: !field.showPass }
          : field
      )
    );
  };

  const handleChange = (index, event) => {
    const { name, value } = event.target;
    setFormModel((prev) => ({ ...prev, [name]: value }));

    setFilter((prev) =>
      prev.map((field, i) => {
        if (i === index) {
          const error = validateField(field, value);
          return { ...field, error };
        }
        return field;
      })
    );
  };

  const validateField = (field, value) => {
    if (field.validation?.required && !value)
      return `${field.name} is required`;
    if (field.validation?.string && typeof value !== "string")
      return `${field.name} must be a string`;
    if (field.validation?.number && isNaN(Number(value)))
      return `${field.name} must be a number`;
    if (field.validation?.min && value.length < field.validation.min)
      return `${field.name} must be greater than ${field.validation.min} characters`;
    if (field.validation?.max && value.length > field.validation.max)
      return `${field.name} must be smaller than ${field.validation.max} characters`;
    if (
      field.validation?.email &&
      !/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(value)
    )
      return `Invalid email format for ${field.name}`;
    return null;
  };

  const submitForm = () => {
    const validatedFilter = filter.map((field) => ({
      ...field,
      error: validateField(field, formModel[field.name]),
    }));
    setFilter(validatedFilter);

    const noErrors = validatedFilter.every((field) => !field.error);
    if (noErrors) {
      onSubmit(formModel);
    }
  };

  return (
    <div
      className={
        custom_class?.main ||
        "md:grid md:grid-cols-2 md:gap-[1.25rem] flex flex-col gap-2"
      }
    >
      {filter.map((field, index) => (
        <div key={index} className={field.MainClass}>
          <label
            className="mb-2 text-sm font-medium text-default-900 ml-2  w-full "
            htmlFor={field.name}
          >
            {field.label}
          </label>

          {field.type === "textarea" && (
            <textarea
              id={field.name}
              name={field.name}
              placeholder={field.placeholder}
              className={`rounded-lg border px-4 py-2.5 w-full ${field.class}`}
              value={formModel[field.name]}
              onChange={(e) => handleChange(index, e)}
            />
          )}

          {field.type === "select" && (
            <select
              id={field.name}
              name={field.name}
              className={`rounded-lg border px-4 py-2.5 w-full bg-white ${field.class}`}
              value={formModel[field.name]}
              onChange={(e) => handleChange(index, e)}
            >
              {field.options.map((option) => (
                <option
                  key={option.id}
                  value={option.name}
                  className="bg-white"
                >
                  {option.name}
                </option>
              ))}
            </select>
          )}

          {["text", "email", "number", "date", "time"].includes(field.type) && (
            <input
              id={field.name}
              type={field.type}
              name={field.name}
              placeholder={field.placeholder}
              className={`rounded-lg border px-4 py-2.5 w-full ${field.class}`}
              value={formModel[field.name]}
              onChange={(e) => handleChange(index, e)}
            />
          )}

          {field.type === "checkbox" && (
            <label className="flex items-center cursor-pointer">
              <input
                type="checkbox"
                id={field.name}
                name={field.name}
                className={`sr-only ${field.class}`}
                checked={formModel[field.name]}
                onChange={(e) =>
                  handleChange(index, {
                    target: { name: field.name, value: e.target.checked },
                  })
                }
              />
              <span className="w-11 h-6 bg-gray-200 rounded-full">
                {/* Custom styling for the checkbox */}
              </span>
            </label>
          )}

          {field.type === "password" && (
            <div className="relative flex items-center">
              <input
                type={field.showPass ? "text" : "password"}
                id={field.name}
                name={field.name}
                placeholder={field.placeholder}
                className={`rounded-lg border px-4 py-2.5 w-full ${field.class}`}
                value={formModel[field.name]}
                onChange={(e) => handleChange(index, e)}
              />
              <button
                type="button"
                onClick={() => togglePass(index)}
                className="absolute right-3"
              >
                {/* Add eye icon for password visibility toggle */}
                {field.showPass ? "Hide" : "Show"}
              </button>
            </div>
          )}

          {field.error && (
            <div className="text-red-500 text-xs mt-1">{field.error}</div>
          )}
        </div>
      ))}
      {rest && rest}

      <div
        className={
          custom_class?.buttonPosition ||
          "w-full flex justify-start items-center col-span-2"
        }
      >
        <button
          type="button"
          onClick={submitForm}
          className={
            custom_class?.button ||
            "mt-4 bg-[#A052C6] text-white w-full px-6 py-2.5 rounded-lg hover:bg-gray-300 mb-4"
          }
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default FormComponent;
