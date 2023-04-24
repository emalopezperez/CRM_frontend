import { useReducer, useState } from "react";
import productContext from "./productContext";
import productReducer from "./productReducer";

import {
  PRODUCTO_CREADO_EXITOSO,
  PRODUCTO_ERROR,
  MOSTRAR_ALERTA,
  OCULTAR_ALERTA,
} from "../../types";

const ProductState = ({ children }) => {
  const initialState = {
    mensaje_archivo: null,
  };

  const [state, dispatch] = useReducer(productReducer, initialState);

  const mostrarAlerta = (msg) => {
    dispatch({
      type: MOSTRAR_ALERTA,
      payload: msg,
    });

    setTimeout(() => {
      dispatch({
        type: OCULTAR_ALERTA,
      });
    }, 3000);
  };

  return (
    <productContext.Provider
      value={{
        mensaje_archivo: state.mensaje_archivo,
        mostrarAlerta,
      }}>
      {children}
    </productContext.Provider>
  );
};

export default ProductState;
