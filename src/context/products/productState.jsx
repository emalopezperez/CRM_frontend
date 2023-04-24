import { useReducer, useState } from "react";
import productContext from "./productContext";
import productReducer from "./productReducer";

import { PRODUCTO_CREADO_EXITOSO, PRODUCTO_ERROR } from "../../types";

const productState = ({ children }) => {
  return <productContext.Provider
  value={{

  }}
  >{children}</productContext.Provider>;
};


export default productState