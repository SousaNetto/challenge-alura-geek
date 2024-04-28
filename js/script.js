const form = document.querySelector(".form-product");
const nameInput = document.querySelector("#product-name");
const priceInput = document.querySelector("#product-price");
const imageInput = document.querySelector("#product-image");
const btnSave = document.querySelector(".btn-save");
const btnReset = document.querySelector(".btn-reset");
const productsList = document.querySelector(".products");
const deleteProduct = document.querySelector(".icon-trash");

form.addEventListener("submit", (event) => {
  event.preventDefault()
})

btnSave.addEventListener("click", addProduct)

btnReset.addEventListener("click", () => {
  form.reset()
})

function addProduct() {
  const name = nameInput.value;
  const price = priceInput.value;
  const image = imageInput.value;

  const product = {
    name,
    price,
    image
  }

  productsList.innerHTML += `
    <div class="product-card">
      <div>
        <img class="product-image" src="${image}" alt="storm">
      </div>
      <div>
        <h4 class="product-name">${name}</h4>
        <p class="product-price">$ ${price}</p>
        <img class="icon-trash" src="./assets/images/icon-trash.png" alt="${name}">
      </div>
    </div>
  `

  nameInput.value = "";
  priceInput.value = "";
  imageInput.value = "";

  console.log(product)
}