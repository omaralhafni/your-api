import { GiEmptyHourglass } from "react-icons/gi";

export const NoProducts = () => {
  return (
    <div className="mx-auto p-0 lg:p-10">
      <div className="w-full p-5 lg:w-3/4 lg:p-10 bg-white drop-shadow rounded-md mx-auto flex flex-col items-center justify-center">
        <GiEmptyHourglass className="h-48 w-48 text-green-500" />
        <h2 className="uppercase font-bold mt-7 text-green-700">
          No records has been added yet.
        </h2>
        <h3 className="mt-2 text-green-900 text-center">
          Add a new record by simply clicking the button on bottom right side.
        </h3>
      </div>
    </div>
  );
};
