import {
  USUARIO_AUTENTICADO,
  COLABORADOR_REGISTRADO_ERROR,
  LOGIN_EXITOSO,
  LOGIN_ERROR,
  COLABORADOR_REGISTRADO_EXITOSO_MENSAJE,
  CERRAR_SESION,
} from "../../types";

export default (state, action) => {
  switch (action.type) {
    case COLABORADOR_REGISTRADO_EXITOSO_MENSAJE:
    case COLABORADOR_REGISTRADO_ERROR:
    case LOGIN_ERROR:
      return {
        ...state,
        mensaje: action.payload,
      };

    case LOGIN_EXITOSO:
      localStorage.setItem("token", action.payload);
      return {
        ...state,
        token: action.payload,
        autenticado: true,
      };

    case USUARIO_AUTENTICADO:
      localStorage.setItem("usuario", JSON.stringify(action.payload));
      return {
        ...state,
        usuario: action.payload,
      };

    case CERRAR_SESION:
      localStorage.removeItem("token");
      localStorage.removeItem("usuario");
      return {
        ...state,
        usuario: null,
        token: null,
      };

    default:
      return state;
  }
};
