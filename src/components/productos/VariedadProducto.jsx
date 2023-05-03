import { useRouter } from "next/router";
import { useContext, useState, useEffect } from "react";
import Link from "next/link";
import authContext from "@/context/auth/authContext";
import productContext from "@/context/products/productContext";
import generarSku from "../../components/helpers/Helpers";
import { useFormik } from "formik";
import * as Yup from "yup";



const VariedadProducto = ({ titulo, str_variedad, id, producto }) => {
  const AuthContext = useContext(authContext);
  const { token } = AuthContext;

  const ProductContext = useContext(productContext);
  const { registroVariedadProducto } = ProductContext;

  const formik = useFormik({
    initialValues: {
      proveedor: "",
      sku: "",
      variedad: "",
      producto: producto
    },
    validationSchema: Yup.object({
      proveedor: Yup.string()
        .matches(/^[a-zA-ZÑñ\s]+$/, "Solo se permiten letras en este campo")
        .required("Este campo es requerido"),
      variedad: Yup.string()
        .matches(/^[a-zA-ZÑñ\s]+$/, "Solo se permiten letras en este campo")
        .required("Este campo es requerido"),
    }),
    onSubmit: async (values, { resetForm}) => {
      values.sku = generarSku(titulo, str_variedad, values.proveedor);

      registroVariedadProducto(id, values);
      resetForm();
    },
  });

  return (
    <div className="flex gap-8 ">
      <div>
        <div className="mt-8 mb-6 text-black">
          <h2>Variedad de productos</h2>
        </div>
        <form
          onSubmit={(event) => {
            event.preventDefault(); // Evita que la página se actualice al enviar el formulario
            formik.handleSubmit(event);
          }}
          className="px-8 pt-6 pb-8 mb-4 rounded shadow-md ">
          <div className="grid gap-4 mb-4 md:grid-cols-3">
            <div>
              <label
                className="block mb-2 text-sm text-gray-500"
                htmlFor="titulo">
                Proveedor
              </label>
              <input
                type="text"
                className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                id="proveedor"
                placeholder="Proveedor"
                value={formik.values.proveedor}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />

              {formik.touched.proveedor && formik.errors.proveedor ? (
                <div className="mt-2 text-red-600">
                  <p className="text-sm">{formik.errors.proveedor}</p>
                </div>
              ) : null}
            </div>

            <div>
              <label
                className="block mb-2 text-sm text-gray-500"
                htmlFor="titulo">
                Variedad
              </label>
              <input
                type="text"
                className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                id="variedad"
                placeholder="Variedad"
                value={formik.values.variedad}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />

              {formik.touched.variedad && formik.errors.variedad ? (
                <div className="mt-2 text-red-600">
                  <p className="text-sm">{formik.errors.variedad}</p>
                </div>
              ) : null}
            </div>

            <div className="flex items-center mt-6">
              <input
                type="submit"
                className="w-full p-2 text-white bg-blue-400 cursor-pointer hover:bg-orange-400"
                value="Agregar"
              />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default VariedadProducto;
