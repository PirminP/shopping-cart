const getSavedCartItems = () => {
  const dataSavedLocal = localStorage.getItem('cartItems');
  if (dataSavedLocal === null || dataSavedLocal === undefined) {
    return console.log('Local data storage empty!');
  }
  const cartItems = JSON.parse(dataSavedLocal);
  const cartSaved = document.querySelector('.cart');
  cartSaved.innerHTML = cartItems;
};

if (typeof module !== 'undefined') {
  module.exports = getSavedCartItems;
}
