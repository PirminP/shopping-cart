// const { fetchProducts } = require('./helpers/fetchProducts');

// const getSavedCartItems = require("./helpers/getSavedCartItems");

// const getSavedCartItems = require("./helpers/getSavedCartItems");

// const saveCartItems = require("./helpers/saveCartItems");

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
  const savedCart = document.querySelector('.cart').innerHTML;
  saveCartItems(savedCart);

  // const productItemText = event.target.innerText;
  // const priceSearch = productItemText.search('PRICE: ');
  // const price = productItem.substr(priceSearch, productItem.length - priceSearch);
  // const totalAmount = document.querySelector('.total-price');
  // totalAmount.innerText = Number(totalAmount.innerText) - Number(price);
}

function emptyShoppingCart() {
  document.querySelectorAll('.cart__item').forEach((li) => li.remove());
  document.querySelector('.total-price').innerText = '0';
  saveCartItems(document.querySelector('.cart').innerHTML);
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
  saveCartItems(document.querySelector('.cart').innerHTML);

  // const totalAmount = document.querySelector('#cart-total');
  // totalAmount.innerText = Number(totalAmount.innerText) + salePrice;
}

// window.onload = async () => {
//   getSavedCartItems();
//   document.querySelectorAll('.cart__item').forEach((element) => {
//     element.addEventListener('click', cartItemClickListener);
//   });

//   const products = await fetchProducts('computador');
//   products.results.forEach((product) => {
//     const { id: sku, title: name, thumbnail: image } = product;
//     createProductItemElement({ sku, name, image });
//   });

//   const buttons = document.querySelectorAll('.item__add');
//   buttons.forEach((button) => button.addEventListener('click', addtoShoppingCart));
  
//   document.querySelector('.empty-cart').addEventListener('click', emptyShoppingCart);
//  };

function localStorageLoad() {
  const dataStorage = getSavedCartItems('cartItems');
  if (dataStorage === null || dataStorage === undefined) {
    return console.log('Local data storage empty!');
  }
  document.querySelector('cart').innerHTML = JSON.parse(dataStorage);
  document.querySelectorAll('.cart__item').forEach((element) => {
    element.addEventListener('click', cartItemClickListener);
  });
}

window.onload = async () => {
  localStorageLoad();
  const products = await fetchProducts('computador');
  products.results.forEach((product) => {
    const { id: sku, title: name, thumbnail: image } = product;
    createProductItemElement({ sku, name, image });
  });
  
  const buttons = document.querySelectorAll('.item__add');
  buttons.forEach((button) => button.addEventListener('click', addtoShoppingCart));
    
  document.querySelector('.empty-cart').addEventListener('click', emptyShoppingCart);
  };
