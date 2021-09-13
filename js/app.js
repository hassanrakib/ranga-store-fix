// load products from api
const loadProducts = () => {
  const url = `https://fakestoreapi.com/products`;
  fetch(url)
    .then((response) => response.json())
    .then((data) => showProducts(data));
};
loadProducts();

// show all product in UI 
const showProducts = (products) => {
  const allProducts = products.map((pd) => pd);
  for (const product of allProducts) {
    const image = product.image;
    const div = document.createElement("div");
    div.classList.add("product");
    div.innerHTML = `<div class="single-product">
      <div>
    <img class="product-image" src=${image}></img>
      </div>
      <h3>${product.title}</h3>
      <p>Category: ${product.category}</p>
      <p>Avg. Rating: <b>${product.rating.rate}</b> <i class="fas fa-star text-warning"></i> (Rated by: <b>${product.rating.count}</b> <i class="far fa-user-circle text-warning"></i>)</p>
      <h2>Price: $ ${product.price}</h2>
      <button onclick="addToCart(${product.price})" id="addToCart-btn" class="buy-now btn btn-warning">add to cart</button>
      <button onclick="getProductDetails(${product.id})" id="details-btn" class="btn btn-danger">Details</button></div>
      `;
    document.getElementById("all-products").appendChild(div);
  }
};

// update my-cart
let count = 0;
const addToCart = (price) => {
  count = count + 1;
  updatePrice("price", price);

  updateTaxAndCharge();
  updateTotal();
  document.getElementById("total-Products").innerText = count;
};

// get inner text converted to number (different cost)
const getInnerTextNumber = (id) => {
  const element = document.getElementById(id).innerText;
  const converted = parseFloat(element);
  return converted;
};

// main price update function
const updatePrice = (id, value) => {
  const convertedOldPrice = getInnerTextNumber(id);
  const convertPrice = parseFloat(value);
  const total = convertedOldPrice + convertPrice;
  document.getElementById(id).innerText = total.toFixed(2);
};

// set innerText function
const setInnerText = (id, value) => {
  document.getElementById(id).innerText = value.toFixed(2);
};

// update delivery charge and total Tax
const updateTaxAndCharge = () => {
  const priceConverted = getInnerTextNumber("price");
  if (priceConverted > 200) {
    setInnerText("delivery-charge", 30);
    setInnerText("total-tax", priceConverted * 0.2);
  }
  if (priceConverted > 400) {
    setInnerText("delivery-charge", 50);
    setInnerText("total-tax", priceConverted * 0.3);
  }
  if (priceConverted > 500) {
    setInnerText("delivery-charge", 60);
    setInnerText("total-tax", priceConverted * 0.4);
  }
};

//grandTotal update function
const updateTotal = () => {
  const grandTotal =
    getInnerTextNumber("price") + getInnerTextNumber("delivery-charge") +
    getInnerTextNumber("total-tax");
  document.getElementById("total").innerText = grandTotal.toFixed(2);
};

// get single product details
const getProductDetails = productId => {
  const url = `https://fakestoreapi.com/products/${productId}`;
  fetch(url)
    .then(res => res.json())
    .then(data => showProductDetails(data));
}

// show single product details
const showProductDetails = productDetails => {
  const singleProductDetails = document.querySelector(".product-details");
  singleProductDetails.innerHTML = `
  <div id="single-product-details">
    <div>
    <img class="product-image" src=${productDetails.image}></img>
    </div>
      <h3>${productDetails.title}</h3>
      <p>${productDetails.description}</p>
      <p>Category: ${productDetails.category}</p>
      <p>Avg. Rating: <b>${productDetails.rating.rate}</b> <i class="fas fa-star text-warning"></i> (Rated by: <b>${productDetails.rating.count}</b> <i class="far fa-user-circle text-warning"></i>)</p>
      <h2>Price: $ ${productDetails.price}</h2>
      <button onclick="addToCart(${productDetails.price})" id="addToCart-btn" class="buy-now btn btn-warning">add to cart<i class="fas fa-arrow-circle-right text-warning"></i></button>
  </div>
  `;
}