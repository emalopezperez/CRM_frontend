import { useReducer } from "react";
import { useRouter } from "next/router";
import authContext from "./authContext";
import authReducer from "./authReducer";

import {
  COLABORADOR_REGISTRADO_EXITOSO,
  COLABORADOR_REGISTRADO_ERROR
} from "../../types";

const AuthState = ({ children }) => {
  const router = useRouter();

  //State inicial
  const initialState = {
    token: "",
    autenticado: null,
    usuario: null,
    mensaje: null,
  };

  //Reducer
  const [state, dispatch] = useReducer(authReducer, initialState);

  //Crear colaborador
  const crearColaborador = async (values) => {
    const apiUrl = "http://localhost:3001/api/";
    const token = localStorage.getItem("token");

    let data = {
      email: values.email,
      nombre: values.nombre,
      apellido: values.apellido,
      rol: values.cargo,
    };

    await fetch(`${apiUrl}registro_colaborador_admin`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((response) => {
        dispatch({
          type: COLABORADOR_REGISTRADO_EXITOSO,
          payload: response.message,
        });

        router.push("/account/lista_colaboradores_admin");
      })
      .catch((error) => {
        console.error(error);

        dispatch({
          type: COLABORADOR_REGISTRADO_ERROR,
          payload: response.message,
        });
      });
  };

  //Autenticar usuario

  const iniciarSesion = async () =>{

  }

  return (
    <authContext.Provider
      value={{
        token: state.token,
        autenticado: state.autenticado,
        usuario: state.usuario,
        mensaje: state.mensaje,
        iniciarSesion,
        crearColaborador,
      }}>
      {children}
    </authContext.Provider>
  );
};

export default AuthState;
