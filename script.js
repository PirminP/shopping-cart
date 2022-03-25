// const { fetchProducts } = require('./helpers/fetchProducts');

// const { fetchItem } = require("./helpers/fetchItem");

function createProductImageElement(imageSource) {
  const img = document.createElement('img');
  img.className = 'item__image';
  img.src = imageSource;
  return img;
}

function createCustomElement(element, className, innerText) {
  const e = document.createElement(element);
  e.className = className;
  e.innerText = innerText;
  return e;
}

function createProductItemElement({ sku, name, image }) {
  const section = document.createElement('section');
  section.className = 'item';

  section.appendChild(createCustomElement('span', 'item__sku', sku));
  section.appendChild(createCustomElement('span', 'item__title', name));
  section.appendChild(createProductImageElement(image));
  section.appendChild(createCustomElement('button', 'item__add', 'Adicionar ao carrinho!'));

  const sectionItems = document.querySelector('.items');
  sectionItems.appendChild(section);
}

function getSkuFromProductItem(item) {
  return item.querySelector('span.item__sku').innerText;
}

function cartItemClickListener(event) {
  event.target.remove();
}

function createCartItemElement({ sku, name, salePrice }) {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.addEventListener('click', cartItemClickListener);
  
  const cartItems = document.querySelector('.cart__items');
  cartItems.appendChild(li);
}

async function addtoShoppingCart(event) {
  const getId = getSkuFromProductItem(event.target.parentElement);
  const item = await fetchItem(getId);
  const { id: sku, title: name, price: salePrice } = item;
  createCartItemElement({ sku, name, salePrice });
}

window.onload = async () => {
  const products = await fetchProducts('computador');
  products.results.forEach((product) => {
    const { id: sku, title: name, thumbnail: image } = product;
    createProductItemElement({ sku, name, image });
  });

  const buttons = document.querySelectorAll('.item__add');
  buttons.forEach((button) => button.addEventListener('click', addtoShoppingCart));
 };
