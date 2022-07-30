import { useState } from "react"
import { Loader, Nav } from "../../components"

const Documentation = () => {
    const [loading, setLoading] = useState(true)
    return (
        <>
            <Nav />
            <Loader loading={loading} />

            <iframe
                title="swagger doc"
                src="https://myouapi.herokuapp.com/swagger"
                className="w-full h-[92vh]"
                onLoad={() => setLoading(false)}
            />
        </>
    )
}

export default Documentation