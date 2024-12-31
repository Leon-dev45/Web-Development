/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Loading from "../components/Loading";

export default function Refresh() {
  const navigate = useNavigate();
  useEffect(() => {
    navigate(-1);
  }, []);

  return (
    <div className="bg-gray-700 opacity-70">
      <Loading />
    </div>
  );
}
