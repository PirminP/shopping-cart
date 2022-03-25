require('../mocks/fetchSimulator');
const { fetchProducts } = require('../helpers/fetchProducts');
const computadorSearch = require('../mocks/search');

describe('Test the function fetchProducts', () => {
  it('1) Verifies if fetchProducts is function', () => {
    expect.assertions(1);
    expect(typeof fetchProducts).toBe('function');
  });

  it('2) Verifies if fetchProducts is executed with argument computador and function fetch called', async () => {
    expect.assertions(1);
    await fetchProducts('computador');
    expect(fetch).toHaveBeenCalled();
  });

  it('3) Verifies when fetchProducts is called with argument computador, function fetch uses endpoint https://api.mercadolibre.com/sites/MLB/search?q=computador', async () => {
    expect.assertions(1);
    await fetchProducts('computador');
    const url = 'https://api.mercadolibre.com/sites/MLB/search?q=computador';
    expect(fetch).toHaveBeenCalledWith(url);
  });

  it('4) Verifies if calling FetchProducts with argument computador has the same data structure as object computadorSearch', async () => {
    expect.assertions(1);
    const result = await fetchProducts('computador');
    expect(result).toEqual(computadorSearch);
  });

  it('5) Verifies if calling fetchProducts without argument, following error message is returned: You must provide an url', async () => {
    expect.assertions(1);
    const noURL = await fetchProducts();
    expect(noURL).toEqual(new Error ('You must provide an url'));
  });
});
