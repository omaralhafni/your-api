import { useState } from "react"
import { Nav, Spinner } from "../../components"

const Documentation = () => {
    const [loading, setLoading] = useState(true)
    return (
        <>
            <Nav />
            {loading &&
                <Spinner customerStyle="w-full h-full p-10" color="#374151" />
            }
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