import { useContext, useState, useEffect } from "react";
import Link from "next/link";
import authContext from "@/context/auth/authContext";
import productContext from "@/context/products/productContext";
import Dropzone from "../dropzone/Dropzone";
import Alerta from "../alertas/Alerta";
import { useFormik } from "formik";
import * as Yup from "yup";

const CrearProducto = () => {
  const AuthContext = useContext(authContext);
  const { usuario, token } = AuthContext;

  const ProductContext = useContext(productContext);
  const { mensaje_archivo, crearProducto, mensaje_producto } = ProductContext;

  const [colaboradorAuth, setColaboradorAuth] = useState(false);

  useEffect(() => {
    if (token) {
      setColaboradorAuth(!colaboradorAuth);
    }
  }, [token]);

  const formik = useFormik({
    initialValues: {
      titulo: "",
      precio: "",
      contenido: "",
      estado: false,
      descuento: false,
      categoria: "",
    },
    validationSchema: Yup.object({
      titulo: Yup.string().required("El titulo es obligatorio"),
      precio: Yup.number()
        .required("El precio es obligatorio")
        .min(0, "El precio debe ser mayor o igual a cero"),
      contenido: Yup.string().required("La descripcion es obligatorio"),
    }),
    onSubmit: async (values) => {
      crearProducto(values, token);
    },
  });

  return (
    <div className="flex flex-col pt-16 pl-52">
      <div className="w-full m-auto mx-auto text-white shadow-md shadow-white rounded-xl lg:p-4 ">
        <div className="">
          {mensaje_archivo && <Alerta mensaje={mensaje_archivo} />}
          {mensaje_producto && <Alerta mensaje={mensaje_producto} />}
          <div className="flex justify-center pl-42"></div>
          <span className="flex justify-center text-sm text-gray-300">
            Productos
          </span>
          <h2 className="flex justify-center my-4 font-sans text-2xl font-bold text-black">
            Nuevo producto
          </h2>
          <div className="flex justify-center gap-6 mt-12 text-sm text-black">
            <Link
              href="/productos/lista_productos"
              className="p-1 border rounded-md cursor-pointer hover:bg-gray-200">
              Todos los productos
            </Link>
            <Link
              href="/account/crear_colaborador_admin"
              className="p-1 border rounded-md cursor-pointer hover:bg-gray-200">
              Crear productos
            </Link>
          </div>
          <div className="flex justify-center ">
            <div className="w-full max-w-lg ">
              {colaboradorAuth ? (
                <form
                  className="px-8 pt-6 pb-8 mb-4 rounded shadow-md"
                  onSubmit={formik.handleSubmit}>
                  <div className="flex items-center justify-center w-full">
                    <Dropzone token={token} />
                  </div>

                  <div className="mb-4">
                    <label
                      className="block mb-2 text-sm text-gray-500"
                      htmlFor="titulo">
                      Titulo del producto
                    </label>
                    <input
                      type="titulo"
                      className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                      id="titulo"
                      placeholder="Titulo del producto"
                      value={formik.values.titulo}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />

                    {formik.touched.titulo && formik.errors.titulo ? (
                      <div className="mt-2 text-red-600">
                        <p className="text-sm">{formik.errors.titulo}</p>
                      </div>
                    ) : null}
                  </div>

                  <div className="grid w-full gap-4 py-2 mt-6 md:grid-cols-2">
                    <div>
                      <label
                        htmlFor="cargo"
                        className="block mb-2 text-sm text-gray-500">
                        Categoria
                      </label>
                      <select
                        className="flex w-full p-3 px-3 py-2 mb-3 leading-tight text-black border-2 border-gray-300 rounded-lg shadow outline-none"
                        name="cargo"
                        value={formik.values.cargo}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}>
                        <option value="administrador" className="text-black">
                          Administrador
                        </option>
                        <option value="colaborador" className="text-black">
                          Colaborador
                        </option>
                      </select>
                    </div>

                    <div className="mb-4">
                      <label
                        className="block mb-2 text-sm text-gray-500"
                        htmlFor="number">
                        Precio
                      </label>
                      <input
                        type="number"
                        className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                        id="precio"
                        placeholder="Precio del producto"
                        value={formik.values.precio}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                      />

                      {formik.touched.precio && formik.errors.precio ? (
                        <div className="mt-2 text-red-600">
                          <p className="text-sm">{formik.errors.precio}</p>
                        </div>
                      ) : null}
                    </div>
                  </div>

                  <div className="mb-4">
                    <label
                      className="block mb-2 text-sm text-gray-500"
                      htmlFor="contenido">
                      Descripcion
                    </label>
                    <textarea
                      type="text"
                      className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                      id="contenido"
                      placeholder="Descripcion del producto"
                      value={formik.values.contenido}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />

                    {formik.touched.contenido && formik.errors.contenido ? (
                      <div className="mt-2 text-red-600">
                        <p className="text-sm">{formik.errors.contenido}</p>
                      </div>
                    ) : null}
                  </div>

                  <div className="flex justify-between mx-2 mb-2">
                    <label className="relative inline-flex items-center m-2 cursor-pointer">
                      <input
                        type="checkbox"
                        name="estado"
                        value=""
                        className="sr-only peer"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        checked={formik.values.estado}
                      />
                      <div className="w-9 h-5 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                      <span className="ml-3 text-sm font-medium text-gray-900 dark:text-gray-500">
                        Publicar
                      </span>
                    </label>

                    <label className="relative inline-flex items-center m-2 cursor-pointer">
                      <input
                        type="checkbox"
                        name="descuento"
                        value=""
                        className="sr-only peer"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        checked={formik.values.descuento}
                      />
                      <div className="w-9 h-5 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                      <span className="ml-3 text-sm font-medium text-gray-900 dark:text-gray-500">
                        Descuento
                      </span>
                    </label>
                  </div>

                  <input
                    type="submit"
                    className="w-full p-2 text-white bg-orange-600 cursor-pointer hover:bg-orange-400"
                    value="Crear producto"
                  />
                </form>
              ) : (
                <h2 className="text-black">No tienes acceso</h2>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CrearProducto;
