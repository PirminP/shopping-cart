const getSavedCartItems = (key) => {
  const dataSavedLocal = localStorage.getItem(key);
  return dataSavedLocal;
  };

if (typeof module !== 'undefined') {
  module.exports = getSavedCartItems;
}