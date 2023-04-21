import Link from "next/link";
import { useContext, useState, useEffect } from "react";
import authContext from "@/context/auth/authContext";
import { useFormik } from "formik";
import * as Yup from "yup";

const CrearProducto = () => {
  const AuthContext = useContext(authContext);
  const { usuario } = AuthContext;

  const [colaboradorAuth, setColaboradorAuth] = useState(false);

  useEffect(() => {
    if (usuario) {
      setColaboradorAuth(!colaboradorAuth);
    }
  }, [usuario]);

  const formik = useFormik({
    initialValues: {
      titulo: "",
      precio: "",
      contenido: "",
      publicar: false,
      descuento: false,
      categoria: "administrador",
    },
    validationSchema: Yup.object({
      titulo: Yup.string().required("El titulo es obligatorio"),
      precio: Yup.number()
        .required("El precio es obligatorio")
        .min(0, "El precio debe ser mayor o igual a cero"),
      contenido: Yup.string().required("La descripcion es obligatorio"),
    }),
    onSubmit: async (values) => {
      console.log(values);
    },
  });

  return (
    <div className="flex flex-col pt-16 pl-52">
      <div className="w-full m-auto mx-auto text-white shadow-md shadow-white rounded-xl lg:p-4 ">
        <div className="">
          <div className="flex justify-center pl-42"></div>
          <span className="flex justify-center text-sm text-gray-300">
            Productos
          </span>
          <h2 className="flex justify-center my-4 font-sans text-2xl font-bold text-black">
            Nuevo producto
          </h2>
          <div className="flex justify-center gap-6 mt-12 text-sm text-black">
            <Link
              href="/account/lista_colaboradores_admin"
              className="p-1 border rounded-md cursor-pointer hover:bg-gray-200">
              Todos los colaboradores
            </Link>
            <Link
              href="/account/crear_colaborador_admin"
              className="p-1 border rounded-md cursor-pointer hover:bg-gray-200">
              Crear colaboradores
            </Link>
          </div>
          <div className="flex justify-center ">
            <div className="w-full max-w-lg ">
              {colaboradorAuth ? (
                <form
                  className="px-8 pt-6 pb-8 mb-4 rounded shadow-md"
                  onSubmit={formik.handleSubmit}>
                  <div className="flex items-center justify-center w-full">
                    <label
                      htmlFor="dropzone-file"
                      className="flex flex-col items-center justify-center w-full mb-5 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer h-34 bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                      <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <svg
                          aria-hidden="true"
                          className="w-10 h-10 mb-3 text-gray-400"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg">
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path>
                        </svg>
                        <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                          <span className="font-semibold">Portada</span>
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          SVG, PNG, JPG or GIF (MAX. 800x400px)
                        </p>
                      </div>
                      <input
                        id="dropzone-file"
                        type="file"
                        className="hidden"
                      />
                    </label>
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
                        name="publicar"
                        checked={formik.values.publicar}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        className="sr-only peer"
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
