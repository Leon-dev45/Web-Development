/* eslint-disable react/prop-types */
import ReactLoading from "react-loading";

export default function Loading({ loading }) {
  return (
    <div>
      {loading && (
        <div className="w-full bg-gray-500 flex fixed flex-col opacity-70 h-full items-center justify-center z-50">
          <p className="font-bold text-lg text-white mb-5">
            Creating the product please wait
          </p>
          <ReactLoading type="spin" color="white" height={100} width={50} />
        </div>
      )}
    </div>
  );
}
