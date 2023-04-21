import { useReducer } from "react";
import authContext from "./authContext";
import authReducer from "./authReducer";

import {
  COLABORADOR_REGISTRADO_EXITOSO,
  COLABORADOR_REGISTRADO_ERROR,
  LOGIN_EXITOSO,
  LOGIN_ERROR,
  USUARIO_AUTENTICADO,
} from "../../types";

const AuthState = ({ children }) => {
  //State inicial
  const initialState = {
    token: typeof window !== "undefined" ? localStorage.getItem("token") : "",
    autenticado: null,
    usuario:
    typeof window !== "undefined"
      ? JSON.parse(localStorage.getItem("usuario"))
      : null,
    mensaje: null,
  };

  //Reducer
  const [state, dispatch] = useReducer(authReducer, initialState);

  //Crear colaborador
  const crearColaborador = async (values) => {
    try {
      const apiUrl = "http://localhost:3001/api/";
      const token = localStorage.getItem("token");

      let data = {
        email: values.email,
        nombre: values.nombre,
        apellido: values.apellido,
        rol: values.cargo,
      };

      const response = await fetch(`${apiUrl}registro_colaborador_admin`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
        body: JSON.stringify(data),
      });

      const responseData = await response.json();

      if (responseData.success) {
        dispatch({
          type: COLABORADOR_REGISTRADO_EXITOSO,
          payload: responseData.message,
        });
      } else {
        dispatch({
          type: COLABORADOR_REGISTRADO_ERROR,
          payload: responseData.message,
        });
      }
    } catch (error) {
      console.error(error);

      dispatch({
        type: COLABORADOR_REGISTRADO_ERROR,
        payload: error.message,
      });
    }
  };

  //Autenticar usuario
  const iniciarSesion = async (values) => {
    try {
      const apiUrl = "http://localhost:3001/api/";
      let data = {
        email: values.email,
        password: values.password,
      };
      const response = await fetch(`${apiUrl}login_colaborador_admin`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const responseData = await response.json();

      if (responseData.token) {
        dispatch({
          type: LOGIN_EXITOSO,
          payload: responseData.token,
          usuario: responseData.usuario,
        });
      }

      if (responseData.usuario) {
        dispatch({
          type: USUARIO_AUTENTICADO,
          payload: responseData.usuario,
        });
      } else {
        const message = responseData.message;
        dispatch({
          type: LOGIN_ERROR,
          payload: message,
        });
      }
    } catch (error) {
      dispatch({
        type: LOGIN_ERROR,
        payload: responseData.message,
      });
    }
  };

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
