import { Spinner } from "../Spinner"

// export const Loader = ({ loading, error, children }) => {}
export const Loader = ({ loading, children }) => {
    return loading ?
        <Spinner customerStyle="w-full h-full p-10" />
        :
        children
}

