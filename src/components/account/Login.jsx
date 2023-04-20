import { useState, useContext } from "react";
import { useRouter } from "next/router";
import { useFormik } from "formik";
import * as Yup from "yup";
import authContext from "@/context/auth/authContext";

const Login = () => {
  const AuthContext = useContext(authContext);
  const { usuarioAuth } = AuthContext;

  const [notificaciones, setNotificaciones] = useState(false);
  const router = useRouter();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("El email es obligatorio")
        .required("El email es obligatorio"),
      password: Yup.string()
        .required("El password es obligatorio")
        .min(6, "El pasword debe contener al menos 6 caracteres"),
    }),
    onSubmit: async (values) => {
      const apiUrl = "http://localhost:3001/api/";
      let data = {
        email: values.email,
        password: values.password,
      };
      await fetch(`${apiUrl}login_colaborador_admin`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })
        .then((response) => response.json())
        .then((response) => {
          if (response.data === undefined) {
            setNotificaciones(true);
          }
          if (response.token) {
            localStorage.setItem("token", response.token);

            usuarioAuth('ema')

            router.push("/");
          }
        })
        .catch((error) => {
          console.error(error);
        });
    },
  });

  return (
    <div>
      <div className="flex flex-col min-h-screen pl-52 pt-26">
        <div className="w-full m-auto mx-auto text-white shadow-md shadow-white rounded-xl lg:p-4 ">
          <div className="rounded-md">
            <h2 className="flex justify-center my-4 font-sans text-2xl font-bold text-black">
              Iniciar Sesión
            </h2>
            <span className="flex justify-center text-sm text-gray-300">
              Panel administrador
            </span>

            {notificaciones ? (
              <div className="flex justify-center mt-5 text-white ">
                <span className="p-2 bg-red-400 rounded-md">
                  Cuenta no activada
                </span>
              </div>
            ) : (
              ""
            )}
            <div className="flex justify-center ">
              <div className="w-full max-w-lg ">
                <form
                  className="px-8 pt-6 pb-8 mb-4 rounded shadow-md"
                  onSubmit={formik.handleSubmit}>
                  <div className="mb-4">
                    <label
                      className="block mb-2 text-sm text-gray-500"
                      htmlFor="email">
                      Email
                    </label>
                    <input
                      type="email"
                      className="flex w-full p-3 px-3 py-2 leading-tight text-black border-2 border-gray-300 rounded-lg shadow outline-none appearance-none focus:outline-none focus:shadow-outline"
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

                  <div className="mb-4">
                    <label
                      className="block mb-2 text-sm text-gray-500"
                      htmlFor="password">
                      Password
                    </label>
                    <input
                      type="password"
                      name="password" // agrega el atributo name
                      className="flex w-full p-3 px-3 py-2 leading-tight text-black border-2 border-gray-300 rounded-lg shadow outline-none appearance-none focus:outline-none focus:shadow-outline"
                      placeholder="Password de Usuario"
                      value={formik.values.password}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />

                    {formik.touched.password && formik.errors.password ? (
                      <div className="mt-2 text-red-600">
                        <p className="text-sm">{formik.errors.password}</p>
                      </div>
                    ) : null}
                  </div>
                  <input
                    type="submit"
                    className="w-full p-2 text-white bg-orange-600 cursor-pointer hover:bg-orange-400"
                    value="Iniciar Sesión"
                  />
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
