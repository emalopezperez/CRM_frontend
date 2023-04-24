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
  const [imagenProducto, setImagenProducto] = useState(null);

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

  const obtenerImagenProducto = async (img) => {
    setImagenProducto(img);
  };

  const crearProducto = async (values, token) => {
    try {
      const formData = new FormData();
      formData.append("titulo", values.titulo);
      formData.append("contenido", values.contenido);
      formData.append("precio", values.precio);
      //formData.append('categoria', values.categoria);
      formData.append("descuento", values.descuento);
      formData.append("publicar", values.publicar);
      if (imagenProducto) {
        formData.append("portada", imagenProducto);
      }

      const apiUrl = "http://localhost:3001/api/";

      const response = await fetch(`${apiUrl}registro_producto_admin`, {
        method: "POST",
        headers: {
          Authorization: token,
        },
        body: formData,
      });

      if (response.ok) {
        const responseData = await response.json();
        console.log("Producto creado correctamente:", responseData);
      } else {
        console.log(
          "No se pudo crear el producto. Código de estado:",
          response.status
        );
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <productContext.Provider
      value={{
        mensaje_archivo: state.mensaje_archivo,
        mostrarAlerta,
        obtenerImagenProducto,
        crearProducto,
      }}>
      {children}
    </productContext.Provider>
  );
};

export default ProductState;
