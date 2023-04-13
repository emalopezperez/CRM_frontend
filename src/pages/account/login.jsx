import Layout from "@/layout/Layout"
import { useFormik } from "formik"
import * as Yup from "yup"


const Login = () => {
  const formik = useFormik({
    initialValues: {
      email: "",
      password: ""
    },
    validationSchema: Yup.object({
      email: Yup.string().email('El email es obligatorio').required('El email es obligatorio'),
      password: Yup.string().required('El password es obligatorio').min(6, "El pasword debe contener al menos 6 caracteres")
    }),
    onSubmit: (values) => {
      const apiUrl = "http://localhost:3001/api/"
      let data = {
        email: values.email,
        password: values.password
      }
      fetch(`${apiUrl}login_colaborador_admin`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      })
        .then(response => response.json())
        .then(data => console.log(data))
        .catch(error => console.error(error))
        .catch(parseError => console.error(parseError));
    }
  })
    

  return (
    <Layout>
      <div className="">
        <div className="flex flex-col items-center justify-center h-screen m-auto overflow-scroll ">
          <div className="bg-[#1E1F24] rounded-md">
            <h2 className="flex justify-center my-4 font-sans text-4xl font-bold text-white">Iniciar Sesión</h2>
            <span className="flex justify-center text-sm text-gray-300">Panel administrador</span>
            <div className="flex justify-center ">
              <div className="w-full max-w-lg ">
                <form
                  className="px-8 pt-6 pb-8 mb-4 rounded shadow-md"
                  onSubmit={ formik.handleSubmit }
                >

                  <div className="mb-4">
                    <label
                      className="block mb-2 text-sm text-gray-500"
                      htmlFor="email"
                    >Email</label>
                    <input
                      type="email"
                      className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                      id="email"
                      placeholder="Email de Usuario"
                      value={ formik.values.email }
                      onChange={ formik.handleChange }
                      onBlur={ formik.handleBlur }
                    />

                    { formik.touched.email && formik.errors.email ?
                      <div className="mt-2 text-red-600">
                        <p className="text-sm">{ formik.errors.email }</p>
                      </div>
                      : null
                    }
                  </div>

                  <div className="mb-4">
                    <label
                      className="block mb-2 text-sm text-gray-500"
                      htmlFor="password"
                    >Password</label>
                    <input
                      type="password"
                      className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                      id="password"
                      placeholder="Password de Usuario"
                      value={ formik.values.password }
                      onChange={ formik.handleChange }
                      onBlur={ formik.handleBlur }
                    />

                    { formik.touched.password && formik.errors.password ?
                      <div className="mt-2 text-red-600">
                        <p className="text-sm">{ formik.errors.password }</p>
                      </div>
                      : null
                    }
                  </div>
                  <input
                    type="submit"
                    className="w-full p-2 font-bold text-white uppercase bg-orange-600 cursor-pointer hover:bg-orange-400"
                    value="Iniciar Sesión"
                  />
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default Login