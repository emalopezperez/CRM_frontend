import { useEffect, useState, useContext } from "react";
import authContext from "@/context/auth/authContext";
import Link from "next/link";
import { useRouter } from "next/router";
import { useFormik } from "formik";
import * as Yup from "yup";

const EditColaborador = () => {
  const router = useRouter();
  const { id } = router.query;

  const AuthContext = useContext(authContext);
  const { token } = AuthContext;

  const [colaboradorObtenido, setColaboradorObtenido] = useState([]);

  const llamadoApi = () => {
    const apiUrl = "http://localhost:3001/api/";
    let url = `${apiUrl}obtener_colaboradores_admin/${id}`;

    fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    })
      .then((response) => response.json())
      .then((response) => {
        setColaboradorObtenido(response.colaborador);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    llamadoApi();
  }, []);

  const formik = useFormik({
    initialValues: {
      nombre: "",
      apellido: "",
      email: "",
      cargo: "administrador",
    },
    validationSchema: Yup.object({
      email: Yup.string().email("El email no es valido"),
    }),

    onSubmit: async (values) => {
      const apiUrl = "http://localhost:3001/api/";

      let data = {
        email: values.email,
        nombre: values.nombre,
        apellido: values.apellido,
        rol: values.cargo,
      };

      await fetch(`${apiUrl}editar_colaboradores_admin/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
        body: JSON.stringify(data),
      })
        .then((response) => response.json())
        .then((response) => {
          router.push("/account/lista_colaboradores_admin");
        })
        .catch((error) => {
          console.error(error);
        });
    },
  });

  return (
    <div className="flex flex-col pt-16 pl-52">
      <div className="w-full m-auto mx-auto text-white shadow-md shadow-white rounded-xl lg:p-4 ">
        <div className="">
          <span className="flex justify-center text-sm text-gray-300">
            Colaboradores
          </span>
          <h2 className="flex justify-center my-4 font-sans text-2xl font-bold text-black">
            Editar colaborador
          </h2>
          <div className="flex justify-center gap-6 mt-12 text-sm text-black">
            <Link
              href="/account/lista_colaboradores_admin"
              className="p-1 border rounded-md cursor-pointer hover:bg-gray-200">
              Todos los colaboradores
            </Link>
            <Link
              href="/account/edit_colaborador_admin"
              className="p-1 border rounded-md cursor-pointer hover:bg-gray-200">
              Nuevo colaborador
            </Link>
          </div>

          {colaboradorObtenido ? (
            <div className="flex justify-center ">
              <div className="w-full max-w-lg ">
                <form
                  className="px-8 pt-6 pb-8 mb-4 rounded shadow-md"
                  onSubmit={formik.handleSubmit}>
                  <div className="grid w-full gap-4 py-2 mt-6 md:grid-cols-2">
                    <div className="flex flex-col">
                      <label
                        className="block mb-2 text-sm text-gray-500"
                        htmlFor="nombre">
                        Nombre
                      </label>
                      <input
                        type="text"
                        className="flex w-full p-3 px-3 py-2 leading-tight text-black border-2 border-gray-300 rounded-lg shadow outline-none appearance-none focus:outline-none focus:shadow-outline"
                        id="nombre"
                        placeholder="Nombre de Usuario"
                        value={formik.values.nombre}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                      />

                      {formik.touched.nombre && formik.errors.nombre ? (
                        <div className="mt-2 text-red-600">
                          <p className="text-sm">{formik.errors.nombre}</p>
                        </div>
                      ) : null}
                    </div>

                    <div className="mb-4">
                      <label
                        className="block mb-2 text-sm text-gray-500"
                        htmlFor="email">
                        Apellido
                      </label>
                      <input
                        type="apellido"
                        className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                        id="apellido"
                        placeholder="Apellido de Usuario"
                        value={formik.values.apellido}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                      />

                      {formik.touched.apellido && formik.errors.apellido ? (
                        <div className="mt-2 text-red-600">
                          <p className="text-sm">{formik.errors.apellido}</p>
                        </div>
                      ) : null}
                    </div>
                  </div>

                  <div className="mb-4">
                    <label
                      className="block mb-2 text-sm text-gray-500"
                      htmlFor="email">
                      Email
                    </label>
                    <input
                      type="email"
                      className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                      id="email"
                      placeholder="Email de Usuario"
                      value={formik.values.email}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />

                    {formik.touched.email && formik.errors.email ? (
                      <div className="mt-2 text-red-600">
                        <p className="text-sm">{formik.errors.email}</p>
                      </div>
                    ) : null}
                  </div>

                  <label
                    htmlFor="cargo"
                    className="block mb-2 text-sm text-gray-500">
                    Cargo
                  </label>
                  <select
                    className="flex w-full p-3 px-3 py-2 mb-3 leading-tight text-black border-2 border-gray-200 rounded-lg shadow outline-none"
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

                  <input
                    type="submit"
                    className="w-full p-2 text-white bg-orange-600 cursor-pointer hover:bg-orange-400"
                    value="Editar colaborador"
                  />
                </form>
              </div>
            </div>
          ) : (
            <>
              <div className="flex justify-center mt-36">
                <h2 className="text-black">
                  No se a encontrado colaborador para editar
                </h2>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default EditColaborador;