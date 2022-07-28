import "./index.css";

export const Spinner = ({ color = "#fdf2fd", customerStyle = "" }) => {
    return (
        <div className={customerStyle}>
            <div className={`spinner border border-[${color}]`}>
                <div className={`spinner border border-[${color}] spinner2`}>
                    <div className={`spinner border border-[${color}] spinner3`}></div>
                </div>
            </div>
        </div>
    )
}
