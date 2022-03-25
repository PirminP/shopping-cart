const localStorageSimulator = require('../mocks/localStorageSimulator');
const saveCartItems = require('../helpers/saveCartItems');

localStorageSimulator('setItem');

describe('Test the function saveCartItems', () => {
  it('1) Verifies if saveCartItems is executed with argument <ol><li>Item</li></ol>, localStorage.setItem is called', () => {
    expect.assertions(1);
    saveCartItems('<ol><li>Item</li></ol>');
    expect(localStorage.setItem).toHaveBeenCalled();
  });
  it('2) Verifies if saveCartItems is executed with argument <ol><li>Item</li></ol>, localStorage.setItem is called with parameters cartItems and saveCartItems', () => {
    expect.assertions(1);
    saveCartItems('<ol><li>Item</li></ol>');
    expect(localStorage.setItem).toHaveBeenCalledWith("cartItems", "\"<ol><li>Item</li></ol>\"");
  });
});
