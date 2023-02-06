import { useState } from "react";
import { Loader, Nav } from "../../components";

const { REACT_APP_URL } = process.env;

const Documentation = () => {
  const [loading, setLoading] = useState(true);
  return (
    <>
      <Nav />
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
