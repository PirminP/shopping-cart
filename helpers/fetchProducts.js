const fetchProducts = async (parameter) => {
  if (!parameter) {
    return new Error('You must provide an url');
  }
  const result = await fetch('https://api.mercadolibre.com/sites/MLB/search?q=computador');
  const data = await result.json();
  return data;
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchProducts,
  };
}
