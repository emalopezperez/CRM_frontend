const generarSku = (titulo, str_variedad, proveedor) => {
  const tresPrimerasLetras = (str) => str.substring(0, 3).toUpperCase();
  const sku = `${tresPrimerasLetras(proveedor)}${tresPrimerasLetras(str_variedad)}${tresPrimerasLetras(titulo)}`;
  return sku;
}

export default generarSku;