import { useContext } from "react";
import authContext from "@/context/auth/authContext";

const Alerta = () => {
  const AuthContext = useContext(authContext);
  const { mensaje } = AuthContext;

  return <div className="flex justify-center p-1 text-white bg-red-500 rounded-sm">{mensaje}</div>;
};

export default Alerta;
