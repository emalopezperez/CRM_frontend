import {
  USUARIO_AUTENTICADO,
  COLABORADOR_REGISTRADO_EXITOSO,
  COLABORADOR_REGISTRADO_ERROR,
  LOGIN_EXITOSO,
  LOGIN_ERROR,
} from "../../types";

export default (state, action) => {
  switch (action.type) {
    case COLABORADOR_REGISTRADO_EXITOSO:
    case COLABORADOR_REGISTRADO_ERROR:
    case LOGIN_EXITOSO:
    case LOGIN_ERROR:
      return {
        ...state,
        mensaje: action.payload,
      };
    default:
      return state;
  }
};
