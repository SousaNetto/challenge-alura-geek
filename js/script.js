const form = document.querySelector(".form-product");
const nameInput = document.querySelector("#product-name");
const priceInput = document.querySelector("#product-price");
const imageInput = document.querySelector("#product-image");
const btnSave = document.querySelector(".btn-save");
const btnReset = document.querySelector(".btn-reset");
const btnDelete = document.querySelectorAll(".icon-trash");
const productsList = document.querySelector(".products");

form.addEventListener("submit", (event) => {
  event.preventDefault()
})

btnSave.addEventListener("click", addProduct)

btnReset.addEventListener("click", () => {
  form.reset()
})

async function addProduct() {
  const name = nameInput.value;
  const price = priceInput.value;
  const image = imageInput.value;

  const product = {
    name,
    price,
    image
  }

  await addProductInDb(product);

  nameInput.value = "";
  priceInput.value = "";
  imageInput.value = "";
}
async function addProductInDb(product) {
  try {
    const response = await fetch("http://localhost:3000/products", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(product)
    });

    if (!response.ok) {
      throw new Error('Erro ao adicionar o produto');
    }

    const data = await response.json();
    alert.log('Resposta do servidor:', data);

  } catch (error) {
    alert.error('Erro ao enviar a requisição:', error);
  }
}


async function addProductInitial () {
  const products = await fetch("http://localhost:3000/products")
  const productsData = await products.json()

  productsData.map((product) => {
    productsList.innerHTML += `
      <div class="product-card" key="${product.id}">
        <div>
          <img class="product-image" src="${product.image}" alt="storm">
        </div>
        <div>
          <h4 class="product-name">${product.name}</h4>
          <p class="product-price">$ ${product.price}</p>
          <img class="icon-trash" src="./assets/images/icon-trash.png" alt="${product.productName}">
        </div>
      </div>
    `
  })
}
addProductInitial()