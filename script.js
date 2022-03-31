// const { fetchProducts } = require('./helpers/fetchProducts');

// const getSavedCartItems = require("./helpers/getSavedCartItems");

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

function getSkuFromProductItem(productItem) {
  return productItem.querySelector('span.item__sku').innerText;
}

function cartItemClickListener(event) {
  const productItemText = event.target.innerText;
  const priceSearch = productItemText.search('PRICE: ') + 8;
  const price = productItemText.substr(priceSearch, productItemText.length - priceSearch);
  event.target.remove();
  const totalAmount = document.querySelector('.total-price');
  totalAmount.innerText = Number(totalAmount.innerText) - Number(price);
  saveCartItems(document.querySelector('.cart').innerHTML);
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

function loadingApiStart() {
  const span = document.createElement('span');
  span.className = 'loading';
  span.innerText = '...carregando';
  document.querySelector('.container-title').appendChild(span);
}

function loadingApiEnd() {
  document.querySelector('.loading').remove();
}

async function addToShoppingCart(event) {
  const getId = getSkuFromProductItem(event.target.parentElement);
  loadingApiStart();
  const item = await fetchItem(getId);
  loadingApiEnd();
  const { id: sku, title: name, price: salePrice } = item;
  createCartItemElement({ sku, name, salePrice });
  const totalAmount = document.querySelector('#cart-total');
  totalAmount.innerText = Number(totalAmount.innerText) + salePrice;
  saveCartItems(document.querySelector('.cart').innerHTML);
}

function loadStorageLocal() {
  const storageData = getSavedCartItems('cartItems');
  if (storageData === null || storageData === undefined) {
     return console.log('empty local storage');
  } 
  document.querySelector('.cart').innerHTML = JSON.parse(storageData);
  document.querySelectorAll('.cart__item').forEach((element) => {
    element.addEventListener('click', cartItemClickListener);
  });
}

window.onload = async () => {
  loadStorageLocal();
  loadingApiStart();
  const products = await fetchProducts('computador');
  loadingApiEnd();
  products.results.forEach((product) => {
    const { id: sku, title: name, thumbnail: image } = product;
    createProductItemElement({ sku, name, image });
  });

  const buttons = document.querySelectorAll('.item__add');
  buttons.forEach((button) => button.addEventListener('click', addToShoppingCart));
  
  document.querySelector('.empty-cart').addEventListener('click', emptyShoppingCart);
 };