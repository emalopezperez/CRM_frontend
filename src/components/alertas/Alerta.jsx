import { useContext } from "react";
import authContext from "@/context/auth/authContext";

const Alerta = ({mensaje}) => {

  return (
    <div className="flex justify-center p-2 text-white bg-red-500 rounded-sm ">
      {mensaje}
    </div>
  );
};

export default Alerta;
