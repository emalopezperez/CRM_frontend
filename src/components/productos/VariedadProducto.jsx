import { useRouter } from "next/router";
import { useContext, useState, useEffect } from "react";
import Link from "next/link";
import authContext from "@/context/auth/authContext";
import productContext from "@/context/products/productContext";
import Dropzone from "../dropzone/Dropzone";
import generarSku from "../../components/helpers/Helpers";
import { useFormik } from "formik";
import * as Yup from "yup";

const VariedadProducto = ({ titulo, str_variedad }) => {
  const formik = useFormik({
    initialValues: {
      proveedor: "",
      sku: "",
      variedad: "",
    },
    validationSchema: Yup.object({
      precio: Yup.number().min(0, "El precio debe ser mayor o igual a cero"),
    }),
    onSubmit: async (values, { resetForm }) => {
      console.log(generarSku(titulo, str_variedad, values.proveedor));
      resetForm(); // reiniciar los valores del formulario después de enviarlo
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
