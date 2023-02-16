import "./index.css";

export const Input = ({
  label = "",
  name = "",
  max = "",
  values = {},
  errors = {},
  handleChange = () => {},
}) => {
  return (
    <div className="relative z-0 w-full my-2 group">
      <input
        type={name.startsWith("password") ? "password" : "text"}
        name={name}
        onChange={handleChange}
        value={values[name] || ""}
        className={`auth-input peer ${
          errors[name] && " border-b-[3px] border-pink-500"
        }`}
        placeholder=" "
        maxlength={max}
        required
      />

      <label htmlFor={name} className="auth-input-label ">
        {label}
      </label>
      {errors[name] && (
        <p className="text-pink-500 text-sm m-0 p-0">{errors[name]}</p>
      )}
    </div>
  );
};
