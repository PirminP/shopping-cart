require('../mocks/fetchSimulator');
const { fetchItem } = require('../helpers/fetchItem');
const item = require('../mocks/item');

describe('Test the function fetchItem', () => {
  it('1) Verifies if fetchItem is function', () => {
    expect.assertions(1);
    expect(typeof fetchItem).toBe('function');
  });

  it('2) Verifies if fetchItem is executed with item MLB1615760527 and function fetch called', async () => {
    expect.assertions(1);
    await fetchItem('MLB1615760527');
    expect(fetch).toHaveBeenCalled();
  });

  it('3) Verifies when fetchItem is called with item MLB1615760527, function fetch uses endpoint https://api.mercadolibre.com/items/MLB1615760527', async () => {
    expect.assertions(1);
    await fetchItem('MLB1615760527');
    const url = 'https://api.mercadolibre.com/items/MLB1615760527';
    expect(fetch).toHaveBeenCalledWith(url);
  });

  it('4) Verifies if calling FetchItem with argument MLB1615760527, return has the same data structure as object item', async () => {
    expect.assertions(1);
    const result = await fetchItem('MLB1615760527');
    expect(result).toEqual(item);
  });

  it('5) Verifies if calling fetchItem without argument, following error message is returned: You must provide an url', async () => {
    expect.assertions(1);
    const noURL = await fetchItem();
    expect(noURL).toEqual(new Error ('You must provide an url'));
  });

});
