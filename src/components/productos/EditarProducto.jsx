import { useRouter } from "next/router";
import { useContext, useState, useEffect } from "react";
import Link from "next/link";
import authContext from "@/context/auth/authContext";
import productContext from "@/context/products/productContext";
import Dropzone from "../dropzone/Dropzone";
import Alerta from "../alertas/Alerta";
import AlertSuccess from "../alertas/AlertSucces";
import VariedadProducto from "./VariedadProducto";
import { useFormik } from "formik";
import * as Yup from "yup";

const EditarProducto = () => {
  const router = useRouter();
  const { id } = router.query;

  const AuthContext = useContext(authContext);
  const { token } = AuthContext;

  const ProductContext = useContext(productContext);
  const {
    mensaje_archivo,
    mensaje_producto,
    mensaje_variedad,
    editarProducto,
    obtenerProductoEdit,
    productoObtenido,
  } = ProductContext;

  const [colaboradorAuth, setColaboradorAuth] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (token) {
      setColaboradorAuth(!colaboradorAuth);
    }
  }, [token]);

  useEffect(() => {
    obtenerProductoEdit(id, token);
  }, [id]);

  const formik = useFormik({
    initialValues: {
      titulo: "",
      precio: "",
      descripcion: "",
      estado: "",
      descuento: "",
      categoria: "",
      str_variedad: "",
    },
    validationSchema: Yup.object({
      precio: Yup.number().min(0, "El precio debe ser mayor o igual a cero"),
    }),
    onSubmit: async (values) => {
      const productoActualizado = { ...productoObtenido, ...values };

      editarProducto(productoActualizado, id, token);
    },
  });

  useEffect(() => {
    formik.setValues({
      titulo: productoObtenido.titulo,
      precio: productoObtenido.precio,
      descripcion: productoObtenido.contenido,
      estado: productoObtenido.estado,
      descuento: productoObtenido.descuento,
      categoria: productoObtenido.categoria,
      str_variedad: productoObtenido.str_variedad,
    });
  }, [productoObtenido]);

  return (
    <section className="flex flex-col pt-16 pl-52">
      {loading ? (
        <p>Cargando datos del producto...</p>
      ) : (
        <>
          <div className="w-full m-auto mx-auto text-white shadow-md shadow-white rounded-xl lg:p-4 ">
            <div className="">
              {mensaje_archivo && <Alerta mensaje={mensaje_archivo} />}
              {mensaje_producto && <Alerta mensaje={mensaje_producto} />}

              {mensaje_variedad && <AlertSuccess mensaje={mensaje_variedad} />}
              <div className="flex justify-center pl-42"></div>
              <span className="flex justify-center text-sm text-gray-300">
                Editar
              </span>
              <h2 className="flex justify-center my-4 font-sans text-2xl font-bold text-black">
                Editar producto
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
                    <>
                      <form
                        className="px-8 pt-6 pb-8 mb-4 rounded shadow-md"
                        onSubmit={formik.handleSubmit}>
                        <div className="flex items-center justify-center w-full">
                          <Dropzone token={token} imagen={true} />
                        </div>

                        <div className="grid gap-4 mb-4 md:grid-cols-2">
                          <div>
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
                              defaultValue={productoObtenido.titulo}
                              value={formik.values.titulo}
                              onChange={formik.handleChange}
                              onBlur={formik.handleBlur}
                            />
                          </div>

                          <div>
                            <label
                              htmlFor="cargo"
                              className="block mb-2 text-sm text-gray-500">
                              Categoria
                            </label>
                            <select
                              className="flex w-full p-3 px-3 py-2 mb-3 leading-tight text-black border-2 border-gray-300 rounded-lg shadow outline-none"
                              name="categoria"
                              value={formik.values.categoria}
                              onChange={formik.handleChange}
                              onBlur={formik.handleBlur}>
                              <option  defaultValue disabled>
                                Seleccionar categoría
                              </option>
                              <option value="ropa">Ropa</option>
                              <option value="tecnologia">Tecnología</option>
                              <option value="hogar">Hogar</option>
                            </select>
                          </div>
                        </div>

                        <div className="grid w-full gap-4 py-2 mt-6 md:grid-cols-2">
                          <div>
                            <label
                              className="block mb-2 text-sm text-gray-500"
                              htmlFor="variedad">
                              Variedad
                            </label>
                            <input
                              type="text"
                              className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                              id="str_variedad"
                              placeholder="Variedad del producto"
                              defaultValue={productoObtenido.str_variedad}
                              value={formik.values.str_variedad}
                              onChange={formik.handleChange}
                              onBlur={formik.handleBlur}
                            />
                          </div>

                          <div className="mb-4">
                            <label
                              className="block mb-2 text-sm text-gray-500"
                              htmlFor="precio">
                              Precio
                            </label>
                            <input
                              type="number"
                              className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                              id="precio"
                              placeholder="Precio del producto"
                              defaultValue={productoObtenido.precio}
                              value={formik.values.precio}
                              onChange={formik.handleChange}
                              onBlur={formik.handleBlur}
                            />

                            {formik.touched.precio && formik.errors.precio ? (
                              <div className="mt-2 text-red-600">
                                <p className="text-sm">
                                  {formik.errors.precio}
                                </p>
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
                            defaultValue={productoObtenido.contenido}
                            value={formik.values.contenido}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                          />
                        </div>

                        <div className="flex justify-between mx-2 mb-2">
                          <label className="relative inline-flex items-center m-2 cursor-pointer">
                            <input
                              type="checkbox"
                              name="estado"
                              value="estado"
                              className="sr-only peer"
                              onChange={formik.handleChange}
                              onBlur={formik.handleBlur}
                              defaultChecked={productoObtenido.estado}
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
                              value="descuento"
                              className="sr-only peer"
                              onChange={formik.handleChange}
                              onBlur={formik.handleBlur}
                              defaultChecked={productoObtenido.descuento}
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
                          value="Editar producto"
                        />
                      </form>
                      <VariedadProducto
                        producto={productoObtenido._id}
                        str_variedad={productoObtenido.str_variedad}
                        titulo={productoObtenido.titulo}
                        id={id}
                      />

                      
                    </>
                  ) : (
                    <h2 className="text-black">No tienes acceso</h2>
                  )}
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </section>
  );
};

export default EditarProducto;
