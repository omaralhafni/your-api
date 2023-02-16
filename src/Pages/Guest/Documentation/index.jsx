import { useState } from "react";
import { Loader } from "../../../components";
const { REACT_APP_URL } = process.env;

export const Documentation = () => {
  const [loading, setLoading] = useState(true);
  return (
    <>
      <Loader loading={loading} />

      <iframe
        title="swagger doc"
        src={`${REACT_APP_URL}swagger`}
        className="w-full h-[92vh]"
        onLoad={() => setLoading(false)}
      />
    </>
  );
};

export default Documentation;
