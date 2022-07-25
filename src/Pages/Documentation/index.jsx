import { Nav } from "../../components"

const Documentation = () => {
    return (
        <>
            <Nav />
            <iframe title="swagger doc" src="https://myouapi.herokuapp.com/swagger" className="w-full h-[92vh]" ></iframe>
        </>
    )
}

export default Documentation