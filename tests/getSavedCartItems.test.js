const localStorageSimulator = require('../mocks/localStorageSimulator');
const getSavedCartItems = require('../helpers/getSavedCartItems');

localStorageSimulator('getItem');

describe('Test the getSavedCartItems', () => {
  it('1) Verifies if getSavedCartItems is executed, localStorage.getItem is called', () => {
    expect.assertions(1);
    getSavedCartItems();
    expect(localStorage.getItem).toHaveBeenCalled();
  });
  it('2) Verifies if getSavedCartItems is executed, localStorage.getItem is called with parameter cartItems', () => {
    expect.assertions(1);
    getSavedCartItems();
    expect(localStorage.getItem).toHaveBeenCalledWith("cartItems");
  });
});
