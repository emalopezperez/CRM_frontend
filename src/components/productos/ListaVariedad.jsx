import { useContext } from "react";
import productContext from "@/context/products/productContext";

const ListaVariedad = ({ element }) => {
  const ProductContext = useContext(productContext);
  const { eliminarVariedad } = ProductContext;

  function handleClick() {
    eliminarVariedad(element._id);
  }
  return (
    <table className="">
      <section className="flex items-center justify-between px-6 text-center">
        <div className="">
          <p className="font-bold text-md">{element.variedad}</p>
          <span className="text-sm text-gray-700">{element.sku}</span>
        </div>

        <div>
          <p>{element.stock}</p>
          <span className="text-sm text-gray-700">Unidades</span>
        </div>

        <div>
          <button
            onClick={handleClick}
            className="p-1 text-sm text-white bg-red-800 rounded-sm">
            Eliminar
          </button>
        </div>
      </section>
    </table>
  );
};

export default ListaVariedad;
