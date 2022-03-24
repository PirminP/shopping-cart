const fetchItem = async (id) => {
  const result = await fetch(`https://api.mercadolibre.com/items/${id}`);
  const data = await result.json();
  return data;
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchItem,
  };
}
