import { useEffect, useState } from "react"
import Link from "next/link"

const ListColaboradores = () => {
    const [listaColaboradores, setListaColaboradores] = useState([])

    useEffect(() => {
        const apiUrl = "http://localhost:3001/api/"
        const token = localStorage.getItem('token')

        fetch(`${apiUrl}lista_colaboradores_admin`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token
            }
        })
            .then(response => response.json())
            .then(response => {
                console.log(response)

                setListaColaboradores(response.colaboradores)
            })
            .catch(error => {
                console.error(error);
            });

    }, [])

    return (
        <div className="flex flex-col pt-16 pl-52">
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
                                <table className="min-w-full text-sm divide-y-2 divide-gray-200">
                                    <thead>
                                        <tr>
                                            <th
                                                className="px-4 py-2 font-medium text-left text-gray-900 whitespace-nowrap"
                                            >
                                                Name
                                            </th>
                                            <th
                                                className="px-4 py-2 font-medium text-left text-gray-900 whitespace-nowrap"
                                            >
                                                Email
                                            </th>
                                            <th
                                                className="px-4 py-2 font-medium text-left text-gray-900 whitespace-nowrap"
                                            >
                                                Rol
                                            </th>
                                            <th
                                                className="px-4 py-2 font-medium text-left text-gray-900 whitespace-nowrap"
                                            >
                                                Estado
                                            </th>
                                        </tr>
                                    </thead>

                                    <tbody className="divide-y divide-gray-200">
                                        { listaColaboradores.map((colaborador, index) => (
                                            <tr key={ colaborador._id } className="odd:bg-gray-50">
                                                <td className="px-4 py-2 font-medium text-gray-900 whitespace-nowrap">
                                                    { colaborador.nombre }
                                                </td>
                                                <td className="px-4 py-2 text-gray-700 whitespace-nowrap">{ colaborador.email }</td>
                                                <td className="px-4 py-2 text-gray-700 whitespace-nowrap">{ colaborador.rol }</td>
                                                <td className="px-4 py-2 text-gray-700 whitespace-nowrap">
                                                    {
                                                        colaborador.estado ? (
                                                            <span className="p-1 text-white bg-green-200 rounded-md">Activado</span>
                                                        ) : (
                                                            <span className="p-1 text-white bg-red-300 rounded-md">Desactivado</span>
                                                        )
                                                    }
                                                </td>
                                            </tr>
                                        )) }
                                    </tbody>

                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ListColaboradores