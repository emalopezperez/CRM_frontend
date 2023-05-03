import {
  PRODUCTO_CREADO_EXITOSO,
  PRODUCTO_ERROR,
  MOSTRAR_ALERTA,
  OCULTAR_ALERTA,
  VARIEDAD_REGISTRADA
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

    case PRODUCTO_ERROR:
      return {
        ...state,
        mensaje_producto: action.payload,
      };

    case PRODUCTO_CREADO_EXITOSO:
      return {
        ...state,
        mensaje_producto: action.payload,
      };

      case VARIEDAD_REGISTRADA:
      return {
        ...state,
        mensaje_variedad: action.payload,
      };


    default:
      return state;
  }
};
