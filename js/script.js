const form = document.querySelector(".form-product");
const nameInput = document.querySelector("#product-name");
const priceInput = document.querySelector("#product-price");
const imageInput = document.querySelector("#product-image");
const btnSave = document.querySelector(".btn-save");
const btnReset = document.querySelector(".btn-reset");
const productsList = document.querySelector(".products");

// const btnDelete = document.querySelectorAll("#icon-trash");
//   console.log(btnDelete.length);

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

async function addProductInitial() {
  const products = await fetch("http://localhost:3000/products")
  const productsData = await products.json()
  
  productsList.innerHTML = ""; // Limpa o conteúdo atual para evitar duplicatas
  
  productsData.forEach((product) => {
    const productCard = document.createElement('div');
    productCard.classList.add('product-card');
    productCard.setAttribute('key', product.id);
    
    const productImage = document.createElement('img');
    productImage.classList.add('product-image');
    productImage.src = product.image;
    productImage.alt = 'Product Image';
    
    const productInfo = document.createElement('div');
    
    const productName = document.createElement('h4');
    productName.classList.add('product-name');
    productName.textContent = product.name;
    
    const productPrice = document.createElement('p');
    productPrice.classList.add('product-price');
    productPrice.textContent = `$ ${product.price}`;
    
    const iconTrash = document.createElement('img');
    iconTrash.classList.add('icon-trash');
    iconTrash.id = 'icon-trash'; // Corrige o ID duplicado
    iconTrash.src = './assets/images/icon-trash.png';
    iconTrash.alt = 'Delete Product';
    iconTrash.addEventListener('click', () => deleteProduct(product.id)); // Adiciona o event listener para deletar o produto
    
    productInfo.appendChild(productName);
    productInfo.appendChild(productPrice);
    productInfo.appendChild(iconTrash);
    
    productCard.appendChild(productImage);
    productCard.appendChild(productInfo);
    
    productsList.appendChild(productCard);
  });
  
  // Seleciona os ícones de lixeira após adicionar os produtos ao DOM
  const btnDelete = document.querySelectorAll("#icon-trash");
  console.log(btnDelete.length);
}

addProductInitial();

async function deleteProduct(id) {
  console.log(id)
  try {
    const response = await fetch(`http://localhost:3000/products/${id}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      throw new Error('Erro ao excluir o produto');
    }

    // Atualiza a lista de produtos após a exclusão
    await addProductInitial();
  } catch (error) {
    console.error('Erro ao enviar a requisição:', error);
  }
}