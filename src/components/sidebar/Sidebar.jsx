import Link from "next/link";
import { useContext, useEffect, useState } from "react";
import authContext from "@/context/auth/authContext";

const Sidebar = () => {
  const AuthContext = useContext(authContext);
  const { usuario, cerrarSesion } = AuthContext;

  const [infoUsuario, setInfoUsuario] = useState(null);

  useEffect(() => {
    if (usuario) {
      setInfoUsuario({
        nombre: usuario.nombre,
        email: usuario.email,
      });
    }
  }, []);

  return (
    <div
      className="w-[80%] md:w-[40%] top-0 
        lg:w-80 h-full overflow-y-scroll text-gray-400 transition-all bg-[#181A20] p-4 lg:p-0 shadow-2xl lg:shadow-none z-50 fixed">
      <div className="px-4 py-6">
        <span className="grid w-32 h-10 text-xl font-bold text-white rounded-lg place-content-center">
          Logo
        </span>
        <nav aria-label="Main Nav" className="flex flex-col mt-6 space-y-1">
          <details className="group [&_summary::-webkit-details-marker]:hidden">
            <summary className="flex items-center justify-between px-4 py-2 text-gray-500 rounded-lg cursor-pointer hover:bg-gray-100 hover:text-gray-700">
              <div className="flex items-center gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-5 h-5 opacity-75"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>

                <span className="text-sm font-medium"> Dashboard </span>
              </div>

              <span className="transition duration-300 shrink-0 group-open:-rotate-180">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-5 h-5"
                  viewBox="0 0 20 20"
                  fill="currentColor">
                  <path
                    fillRule="evenodd"
                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </span>
            </summary>

            <nav aria-label="Teams Nav" className="flex flex-col px-4 mt-2">
              <Link
                href="#"
                className="flex items-center gap-2 px-4 py-2 text-gray-500 rounded-lg hover:bg-gray-100 hover:text-gray-700">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-5 h-5 opacity-75"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>

                <span className="text-sm font-medium"> Default </span>
              </Link>

              <Link
                href="#"
                className="flex items-center gap-2 px-4 py-2 text-gray-500 rounded-lg hover:bg-gray-100 hover:text-gray-700">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-5 h-5 opacity-75"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>

                <span className="text-sm font-medium"> Project M</span>
              </Link>

              <Link
                href="#"
                className="flex items-center gap-2 px-4 py-2 text-gray-500 rounded-lg hover:bg-gray-100 hover:text-gray-700">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-5 h-5 opacity-75"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>

                <span className="text-sm font-medium"> E-commerce</span>
              </Link>
            </nav>
          </details>

          <Link
            href="/account/lista_colaboradores_admin"
            className="flex items-center gap-2 px-4 py-2 text-gray-500 rounded-sm hover:bg-gray-100 hover:text-gray-700">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-5 h-5 opacity-75"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
              />
            </svg>

            <span className="text-sm font-medium"> Colaboradores </span>
          </Link>

          <span className="pt-6"></span>
          <Link
            href="#"
            className="flex items-center gap-2 px-4 py-2 text-gray-500 border-t border-gray-100 rounded-sm hover:bg-gray-100 hover:text-gray-700">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-5 h-5 opacity-75"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
              />
            </svg>

            <span className="text-sm font-medium"> Categorias </span>
          </Link>
          <Link
            href="/productos/lista_productos"
            className="flex items-center gap-2 px-4 py-2 text-gray-500 rounded-lg hover:bg-gray-100 hover:text-gray-700">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-5 h-5 opacity-75"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z"
              />
            </svg>

            <span className="text-sm font-medium"> Productos </span>
          </Link>
          <Link
            href=""
            className="flex items-center gap-2 px-4 py-2 text-gray-500 rounded-lg hover:bg-gray-100 hover:text-gray-700">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-5 h-5 opacity-75"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z"
              />
            </svg>

            <span className="text-sm font-medium"> Ingresos </span>
          </Link>

          <Link
            href="#"
            className="flex items-center gap-2 px-4 py-2 text-gray-500 rounded-lg hover:bg-gray-100 hover:text-gray-700">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-5 h-5 opacity-75"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z"
              />
            </svg>

            <span className="text-sm font-medium"> Ventas </span>
          </Link>
          <details className="group [&_summary::-webkit-details-marker]:hidden">
            <summary className="flex items-center justify-between px-4 py-2 text-gray-500 rounded-lg cursor-pointer hover:bg-gray-100 hover:text-gray-700">
              <div className="flex items-center gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-5 h-5 opacity-75"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>

                <span className="text-sm font-medium"> Account </span>
              </div>

              <span className="transition duration-300 shrink-0 group-open:-rotate-180">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-5 h-5"
                  viewBox="0 0 20 20"
                  fill="currentColor">
                  <path
                    fillRule="evenodd"
                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </span>
            </summary>

            <nav aria-label="Account Nav" className="flex flex-col px-4 mt-2">
              <form action="">
                <button
                  type="submit"
                  onClick={cerrarSesion}
                  className="flex items-center w-full gap-2 px-4 py-2 text-gray-500 rounded-lg hover:bg-gray-100 hover:text-gray-700">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-5 h-5 opacity-75"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                    />
                  </svg>

                  <span className="text-sm font-medium"> Logout </span>
                </button>
              </form>
            </nav>
          </details>
        </nav>
      </div>

      {infoUsuario ? (
        <div className="sticky inset-x-0 bottom-0 text-gray-400 border-t border-gray-100">
          <div className="flex items-center gap-2 p-4">
            <img
              alt="Man"
              src="https://images.unsplash.com/photo-1600486913747-55e5470d6f40?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80"
              className="object-cover w-10 h-10 rounded-full"
            />

            <div>
              <p className="text-xs">
                <strong className="block font-medium">
                  {infoUsuario.nombre}
                </strong>
                <span>{infoUsuario.email} </span>
              </p>
            </div>
          </div>
        </div>
      ) : (
        <Link href="/account/login_colaborador_admin">
          <button className="p-2 mt-20 text-black bg-white rounded-md hover:bg-gray-400">
            iniciar sesion
          </button>
        </Link>
      )}
    </div>
  );
};

export default Sidebar;
