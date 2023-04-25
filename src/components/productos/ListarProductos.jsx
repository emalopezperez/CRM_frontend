import { useState, useContext, useEffect } from "react";
import Link from "next/link";
import authContext from "@/context/auth/authContext";
import { FiEdit } from "react-icons/fi";
import { GoKebabHorizontal } from "react-icons/go";
import { TiDeleteOutline, TiTickOutline } from "react-icons/ti";

const ListarProductos = () => {
  const AuthContext = useContext(authContext);
  const { token } = AuthContext;

  const [listaProductos, setListaProductos] = useState([]);
  const [searchValue, setSearchValue] = useState("");

  const llamadoApi = () => {
    const apiUrl = "http://localhost:3001/api/";
    let filtro = searchValue;
    let url = `${apiUrl}listar_productos_admin/${filtro}`;

    fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    })
      .then((response) => response.json())
      .then((response) => {
        console.log(response.productos.estado);
        setListaProductos(response.productos);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    llamadoApi();
  }, [searchValue]);

  return (
    <div className="flex flex-col pt-16 pb-16 pl-52">
      <div className="w-full m-auto mx-auto text-white shadow-md shadow-white rounded-xl lg:p-4 ">
        <div className="">
          <span className="flex justify-center text-sm text-gray-300">
            Productos
          </span>
          <h2 className="flex justify-center my-4 font-sans text-2xl font-bold text-black">
            Todos los productos
          </h2>
          <div className="flex justify-center gap-6 mt-12 text-sm text-black">
            <Link
              href="/productos/lista_productos"
              className="p-1 border rounded-md cursor-pointer hover:bg-gray-200">
              Todos los productos
            </Link>
            <Link
              href="/productos/registro_producto"
              className="p-1 border rounded-md cursor-pointer hover:bg-gray-200">
              Crear producto
            </Link>
          </div>
          <div className="flex justify-center ">
            <div className="w-full max-w-[600px]">
              <div className="mt-14 ">
                {!listaProductos ? (
                  <h2 className="text-black">cargando...</h2>
                ) : (
                  <>
                    <form className="mb-5">
                      <div className="flex flex-wrap justify-between mx-auto">
                        <div className="w-full px-2 mb-4 md:mb-0 ">
                          <div className="relative">
                            <input
                              value={searchValue}
                              onChange={(e) => setSearchValue(e.target.value)}
                              className="py-3 pl-10 pr-4 text-black rounded-md shadow-sm form-control list-search focus:outline-none focus:shadow-outline-blue focus:border-blue-300 "
                              type="search"
                              placeholder="Buscar producto"
                            />

                            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                              <span className="text-gray-500 sm:text-sm">
                                <i className="fe fe-search"></i>
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </form>

                    <table className="min-w-full text-sm divide-y-2 divide-gray-200">
                      <thead>
                        <tr>
                          <th className="px-4 py-2 font-medium text-left text-gray-900 whitespace-nowrap">
                            Titulo
                          </th>
                          <th className="px-4 py-2 font-medium text-left text-gray-900 whitespace-nowrap">
                            Stock
                          </th>
                          <th className="px-4 py-2 font-medium text-left text-gray-900 whitespace-nowrap">
                            precio
                          </th>
                          <th className="px-4 py-2 font-medium text-left text-gray-900 whitespace-nowrap">
                            Estado
                          </th>

                          <th className="px-4 py-2 font-medium text-left text-gray-900 whitespace-nowrap">
                            Acciones
                          </th>
                        </tr>
                      </thead>

                      <tbody className="divide-y divide-gray-200">
                        {listaProductos.map((producto, index) => (
                          <tr key={producto._id} className="odd:bg-gray-50">
                            <td className="px-4 py-2 font-medium text-gray-900 whitespace-nowrap">
                              {producto.titulo}
                            </td>
                            <td className="px-4 py-2 text-gray-700 whitespace-nowrap">
                              {producto.stock}
                            </td>
                            <td className="px-4 py-2 text-gray-700 whitespace-nowrap">
                              {producto.precio}
                            </td>
                            <td className="px-4 py-2 text-gray-700 whitespace-nowrap">
                              {producto.estado ? (
                                <span className="p-1 text-white bg-green-200 rounded-md">
                                  Publicado
                                </span>
                              ) : (
                                <span className="p-1 text-white bg-red-300 rounded-md">
                                  Desactivado
                                </span>
                              )}
                            </td>

                            <details className="group [&_summary::-webkit-details-marker]:hidden">
                              <summary className="flex items-center justify-between px-4 py-2 text-gray-500 rounded-lg cursor-pointer hover:bg-gray-100 hover:text-gray-700">
                                <div className="flex items-center gap-2 ">
                                  <span className="text-sm font-medium">
                                    {" "}
                                    <GoKebabHorizontal />{" "}
                                  </span>
                                </div>

                                <span className="transition duration-300 shrink-0 group-open:-rotate-180"></span>
                              </summary>

                              <nav
                                aria-label="Teams Nav"
                                className="absolute flex flex-col p-2 px-4 text-white rounded-md bg-black/90">
                                <button
                                  className="px-2 py-2 font-medium rounded-lg cursor-pointer hover:bg-gray-100 whitespace-nowrap hover:text-gray-700"
                                  onClick={() =>
                                    router.push(
                                      `/account/edit_colaborador_admin/${colaborador._id}`
                                    )
                                  }>
                                  <div className="flex items-center gap-3">
                                    <FiEdit className="text-yellow-600" />
                                    Edit
                                  </div>
                                </button>

                                <button
                                  href=""
                                  className="px-2 py-2 font-medium rounded-lg cursor-pointer hover:bg-gray-100 whitespace-nowrap hover:text-gray-700">
                                  <div className="flex items-center gap-1">
                                    {producto.estado ? (
                                      <span className="p-1 text-white bg-green-200 rounded-md">
                                        Publicado
                                      </span>
                                    ) : (
                                      <span className="p-1 text-white bg-red-300 rounded-md">
                                        Desactivado
                                      </span>
                                    )}
                                  </div>
                                </button>
                              </nav>
                            </details>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListarProductos;
