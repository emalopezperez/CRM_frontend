import {
  PRODUCTO_CREADO_EXITOSO,
  PRODUCTO_ERROR,
  MOSTRAR_ALERTA,
  OCULTAR_ALERTA,
} from "../../types";

export default (state, action) => {
  switch (action.type) {
    case MOSTRAR_ALERTA:
      return {
        ...state,
        mensaje_archivo: action.payload,
      };

    case OCULTAR_ALERTA:
      return {
        ...state,
        mensaje_archivo: null,
      };
    default:
      return state;
  }
};
