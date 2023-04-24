import React, { useCallback, useState, useContext } from "react";
import { useDropzone } from "react-dropzone";
import productContext from "@/context/products/productContext";

const Dropzone = () => {
  const ProductContext = useContext(productContext);
  const { mostrarAlerta , obtenerImagenProducto} = ProductContext;

  const [predefinedImageDisplayed, setPredefinedImageDisplayed] =
    useState(false);

  const onDrop = useCallback(async (acceptedFiles) => {
    try {
      const formData = new FormData();
      formData.append("portada", acceptedFiles[0]);

      const portada = formData.get("portada");
      const nombreArchivo = portada.name;
      const tamanoArchivo = portada.size;
      const tipoArchivo = portada.type;

      if (tamanoArchivo <= 1000000) {
        if (
          tipoArchivo == "image/jpeg" ||
          tipoArchivo == "image/png" ||
          tipoArchivo == "image/webp" ||
          tipoArchivo == "image/jpg"
        ) {
          obtenerImagenProducto(portada)

          // Mostrar imagen predefinida
          setPredefinedImageDisplayed(true);
        } else {
          mostrarAlerta("Formato del archivo no aceptado");
        }
      } else {
        mostrarAlerta("Su imagen supera los limites");
      }
    } catch (error) {
      console.log(error);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive, acceptedFiles } =
    useDropzone({ onDrop });

  return (
    <>
      <label
        htmlFor="dropzone-file"
        {...getRootProps({ className: "dropzone w-full py-32" })}
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
          {isDragActive ? (
            <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
              <span className="font-semibold">Suelta el archivo</span>
            </p>
          ) : (
            <div>
              <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                <span className="font-semibold">Portada</span>
              </p>
              {predefinedImageDisplayed && (
                <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                  <span className="font-semibold">
                    Portada del producto cargada
                  </span>
                </p>
              )}
            </div>
          )}
          <p className="text-xs text-gray-500 dark:text-gray-400">
            SVG, PNG, JPG (MAX. 800x400px)
          </p>
        </div>
        <input
          id="dropzone-file"
          type="file"
          className="hidden"
          {...getInputProps()}
        />
      </label>
    </>
  );
};

export default Dropzone;
