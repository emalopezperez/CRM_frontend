import { useEffect, useState } from "react"
import Link from "next/link"
import { useRouter } from 'next/router';
import { FiEdit } from 'react-icons/fi';

const ListColaboradores = () => {
    const router = useRouter();

    const [listaColaboradores, setListaColaboradores] = useState([]);
    const [searchValue, setSearchValue] = useState("");

    const llamadoApi = () => {
        const apiUrl = "http://localhost:3001/api/";
        const token = localStorage.getItem("token");
        let filtro = searchValue
        let url = `${apiUrl}lista_colaboradores_admin/${filtro}`;

        fetch(url, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: token,
            },
        })
            .then((response) => response.json())
            .then((response) => {
                console.log(response);

                setListaColaboradores(response.colaboradores);
            })
            .catch((error) => {
                console.error(error);
            });
    };

    useEffect(() => {
        llamadoApi()
    }, [searchValue])

    return (
        <div className="flex flex-col pt-16 pb-16 pl-52">
            <div className="w-full m-auto mx-auto text-white shadow-md shadow-white rounded-xl lg:p-4 ">
                <div className="">
                    <span className="flex justify-center text-sm text-gray-300">Colaboradores</span>
                    <h2 className="flex justify-center my-4 font-sans text-2xl font-bold text-black">Todos los colaboradores</h2>
                    <div className="flex justify-center gap-6 mt-12 text-sm text-black">
                        <Link href='/account/crear_colaborador_admin' className="p-1 border rounded-md cursor-pointer hover:bg-gray-200">Todos los colaboradores</Link>
                        <Link href='/account/crear_colaborador_admin' className="p-1 border rounded-md cursor-pointer hover:bg-gray-200">Crear colaboradores</Link>
                    </div>
                    <div className="flex justify-center ">
                        <div className="w-full max-w-[600px]">
                            <div className="mt-14 ">
                                {
                                    !listaColaboradores ? (
                                        <h2 className="text-black">cargando...</h2>
                                    ) : (
                                        <>
                                            <form className="mb-5">
                                                <div className="flex flex-wrap justify-between mx-auto">
                                                    <div className="w-full px-2 mb-4 md:mb-0 ">
                                                        <div className="relative">
                                                            <input
                                                                value={ searchValue }
                                                                onChange={ (e) => setSearchValue(e.target.value) }
                                                                className="py-3 pl-10 pr-4 text-black rounded-md shadow-sm form-control list-search focus:outline-none focus:shadow-outline-blue focus:border-blue-300 "
                                                                type="search"
                                                                placeholder="Buscar colaborador"
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
                                                            Name
                                                        </th>
                                                        <th className="px-4 py-2 font-medium text-left text-gray-900 whitespace-nowrap">
                                                            Email
                                                        </th>
                                                        <th className="px-4 py-2 font-medium text-left text-gray-900 whitespace-nowrap">
                                                            Rol
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
                                                    { listaColaboradores.map((colaborador, index) => (
                                                        <tr key={ colaborador._id } className="odd:bg-gray-50">
                                                            <td className="px-4 py-2 font-medium text-gray-900 whitespace-nowrap">
                                                                { colaborador.nombre }
                                                            </td>
                                                            <td className="px-4 py-2 text-gray-700 whitespace-nowrap">
                                                                { colaborador.email }
                                                            </td>
                                                            <td className="px-4 py-2 text-gray-700 whitespace-nowrap">
                                                                { colaborador.rol }
                                                            </td>
                                                            <td className="px-4 py-2 text-gray-700 whitespace-nowrap">
                                                                { colaborador.estado ? (
                                                                    <span className="p-1 text-white bg-green-200 rounded-md">
                                                                        Activado
                                                                    </span>
                                                                ) : (
                                                                    <span className="p-1 text-white bg-red-300 rounded-md">
                                                                        Desactivado
                                                                    </span>
                                                                ) }
                                                            </td>

                                                            <td className="flex justify-center px-4 py-2 font-medium text-gray-900 cursor-pointer whitespace-nowrap" onClick={ () => router.push(`/account/edit_colaborador_admin/${colaborador._id}`) }>
                                                                <FiEdit />
                                                            </td>
                                                        </tr>
                                                    )) }
                                                </tbody>
                                            </table>
                                        </>
                                    )
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ListColaboradores