import PulseLoader from "react-spinners/PulseLoader";

export const Loader = () => {
  return (
    <div className="h-screen bg:dark-gray-9000 dark:text-white flex justify-center items-center">
      <PulseLoader
        color="#2563EB"
        loading={true}
        size={15}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
    </div>
  );
};
