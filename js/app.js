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
      <p>Avg. Rating: ${product.rating.rate} out of ${product.rating.count}</p>
      <h2>Price: $ ${product.price}</h2>
      <button onclick="addToCart(${product.price})" id="addToCart-btn" class="buy-now btn btn-warning">add to cart</button>
      <button onclick="getProductDetails(${product.id})" id="details-btn" class="btn btn-danger">Details</button></div>
      `;
    document.getElementById("all-products").appendChild(div);
  }
};
let count = 0;
const addToCart = (price) => {
  count = count + 1;
  updatePrice("price", price);

  updateTaxAndCharge();
  updateTotal();
  document.getElementById("total-Products").innerText = count;
};

const getInputValue = (id) => {
  const element = document.getElementById(id).innerText;
  const converted = parseFloat(element);
  return converted;
};

// main price update function
const updatePrice = (id, value) => {
  const convertedOldPrice = getInputValue(id);
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
  const priceConverted = getInputValue("price");
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
    getInputValue("price") + getInputValue("delivery-charge") +
    getInputValue("total-tax");
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
      <p>Avg. Rating: <b>${productDetails.rating.rate}</b> out of ${productDetails.rating.count} rating</p>
      <h2>Price: $ ${productDetails.price}</h2>
      <button onclick="addToCart(${productDetails.price})" id="addToCart-btn" class="buy-now btn btn-warning">add to cart</button>
  </div>
  `;
}