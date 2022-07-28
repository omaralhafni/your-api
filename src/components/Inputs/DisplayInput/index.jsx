import "./index.css";

export const DisplayInput = ({
    name = "",
    label = "",
    values = {},
    handleChange = () => { }
}) => {
    return (
        <div className="flex w-full justify-center items-center"> 
            <label className="display-input-label">{label}</label>
            <input
                type="text"
                name={name}
                onChange={handleChange}
                value={values[name] || ""}
                className={`${values[name] ? "input-profile peer" : "input-profile peer border-b-2"}`}
                placeholder=""
                required
            />
        </div>
    )
}
