import { useReducer, useState, useContext } from "react";
import { useRouter } from "next/router";
import productContext from "./productContext";
import productReducer from "./productReducer";
import authContext from "../auth/authContext";

import {
  PRODUCTO_CREADO_EXITOSO,
  PRODUCTO_ERROR,
  MOSTRAR_ALERTA,
  OCULTAR_ALERTA,
  VARIEDAD_REGISTRADA,
} from "../../types";

const ProductState = ({ children }) => {
  const AuthContext = useContext(authContext);
  const { token } = AuthContext;

  const router = useRouter();

  const [imagenProducto, setImagenProducto] = useState(null);
  const [productoObtenido, setProductoObtenido] = useState({});

  const initialState = {
    mensaje_archivo: null,
    mensaje_producto: null,
    mensaje_variedad: null,
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

  const crearProducto = async (values) => {
    try {
      const formData = new FormData();
      formData.append("titulo", values.titulo);
      formData.append("contenido", values.contenido);
      formData.append("precio", values.precio);
      formData.append("categoria", values.categoria);
      formData.append("descuento", values.descuento);
      formData.append("estado", values.estado);
      formData.append("str_variedad", values.variedad);
      if (imagenProducto) {
        formData.append("portada", imagenProducto);
      }

      const apiUrl = "http://localhost:3001/api/";

      let response = await fetch(`${apiUrl}registro_producto_admin`, {
        method: "POST",
        headers: {
          Authorization: token,
        },
        body: formData,
      });
      response = await response.json();

      if (response.data) {
        dispatch({
          type: PRODUCTO_CREADO_EXITOSO,
          payload: response.message,
        });

        router.push("/productos/lista_productos");
      } else {
        dispatch({
          type: PRODUCTO_ERROR,
          payload: response.message,
        });
      }
    } catch (error) {
      console.log(error);
      dispatch({
        type: PRODUCTO_ERROR,
        payload: error.message,
      });
    }
  };

  const editarProducto = async (productoActualizado, id) => {
    try {
      const formData = new FormData();
      formData.append("titulo", productoActualizado.titulo);
      formData.append("precio", productoActualizado.precio);
      formData.append("estado", productoActualizado.estado);
      formData.append("descuento", productoActualizado.descuento);
      formData.append("descripcion", productoActualizado.descripcion);
      formData.append("portada", imagenProducto);

      const apiUrl = "http://localhost:3001/api";
      let response = await fetch(`${apiUrl}/editar_producto_admin/${id}`, {
        method: "PUT",
        headers: {
          Authorization: token,
        },
        body: formData,
      });

      response = await response.json();
      router.push("/productos/lista_productos");
    } catch (error) {
      console.log(error);
    }
  };

  const obtenerProductoEdit = async (id) => {
    const apiUrl = "http://localhost:3001/api";
    let url = `${apiUrl}/obtener_producto_admin/${id}`;

    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    });
    const data = await response.json();
    setProductoObtenido(data.data);
  };

  const registroVariedadProducto = async (id, values) => {
    try {
      const apiUrl = "http://localhost:3001/api";

      let response = await fetch(`${apiUrl}/registro_variedad_producto`, {
        method: "POST",
        headers: {
          Authorization: token,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });
      response = await response.json();

      dispatch({
        type: VARIEDAD_REGISTRADA,
        payload: response.message,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const eliminarVariedad = async (id) => {
    try {
      const apiUrl = "http://localhost:3001/api/";
      let url = `${apiUrl}eliminar_variedad_producto/${id}`;

      let response = await fetch(url, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      });

      response = await response.json();

      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <productContext.Provider
      value={{
        mensaje_archivo: state.mensaje_archivo,
        mensaje_producto: state.mensaje_producto,
        mensaje_variedad: state.mensaje_variedad,
        mostrarAlerta,
        obtenerImagenProducto,
        crearProducto,
        editarProducto,
        obtenerProductoEdit,
        productoObtenido,
        registroVariedadProducto,
        eliminarVariedad,
      }}>
      {children}
    </productContext.Provider>
  );
};

export default ProductState;
