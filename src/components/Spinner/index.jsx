import "./index.css";

export const Spinner = ({ color }) => {
    return (
        <div className={`spinner border border-[${color || '#fdf2fd'}]`}>
            <div className={`spinner border border-[${color || '#fdf2fd'}] spinner2`}>
                <div className={`spinner border border-[${color || '#fdf2fd'}] spinner3`}></div>
            </div>
        </div>
    )
}
