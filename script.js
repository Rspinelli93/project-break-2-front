let urlAll = 'https://project-break-2-2025.onrender.com/products'
const productList = document.getElementById("products-list");

const remeras = document.getElementById("Remeras");
const pantalones = document.getElementById("Pantalones");
const zapatos = document.getElementById("Zapatos");
const accesorios = document.getElementById("Accesorios");
const agregarProducto = document.getElementById("Agregar producto");
const logout = document.getElementById("Logout");
const login = document.getElementById("Login");



const apiCall = async (url) => {
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error('Can not load the Data Base');
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error(error);
}};

//* FUNCTIONS
const showAll = async () => {
    
    productList.innerHTML = '';

    const data = await apiCall(urlAll);

    for (const element of data) {
        try {

            const productLi = document.createElement("li");

            productLi.innerHTML += `
                <img src="${element.imagen}" alt="Imagen ${element.nombre}">
                <h3>${element.nombre}</h3>
                <button data-id="${element._id}">Detalles</button>
            `;

            productList.appendChild(productLi);
        } catch (error) {
            console.error('Error fetching product:', error);
        }
    }

};
showAll();
const showById = async (id) => {
    productList.innerHTML = '';

    const product = await apiCall(`${urlAll}/${id}`);

    const productLi = document.createElement("li");

    const imageLi = document.createElement("li");
    const image = document.createElement("img");
    image.src = product.imagen;
    image.alt = `Imagen ${product.nombre}`;
    imageLi.appendChild(image);

    const nameLi = document.createElement("li");
    const name = document.createElement("h3");
    name.textContent = product.nombre;
    nameLi.appendChild(name);

    const descriptionLi = document.createElement("li");
    descriptionLi.textContent = product.descripcion;

    const sizeLi = document.createElement("li");
    sizeLi.textContent = `Talla: ${product.talla}`;

    const priceLi = document.createElement("li");
    priceLi.textContent = `${product.precio} €`;

    const buttonLi = document.createElement("li");
    const button = document.createElement("button");
    button.textContent = "Edit Product";
    button.setAttribute("data-id", product._id);
    buttonLi.appendChild(button);

    productLi.appendChild(imageLi);
    productLi.appendChild(nameLi);
    productLi.appendChild(descriptionLi);
    productLi.appendChild(sizeLi);
    productLi.appendChild(priceLi);
    productLi.appendChild(buttonLi);

    productList.appendChild(productLi);
};
const showByCategory = async (category) => {
    
    productList.innerHTML = '';

    const data = await apiCall(urlAll);
    const filterCategory = data.filter(array => array.categoria === category);
    
    for (const element of filterCategory) {
        try {

            const productLi = document.createElement("li");

            productLi.innerHTML += `
                <img src="${element.imagen}" alt="Imagen ${element.nombre}">
                <h3>${element.nombre}</h3>
                <button data-id="${element._id}">Detalles</button>
            `;

            productList.appendChild(productLi);
        } catch (error) {
            console.error('Error fetching product:', error);
        }
    }

};

//* LINKS
remeras.addEventListener("click", (event) => {
    event.preventDefault();
    showByCategory("Camisetas")
});
pantalones.addEventListener("click", (event) => {
    event.preventDefault();
    showByCategory("Pantalones")
});
zapatos.addEventListener("click", (event) => {
    event.preventDefault();
    showByCategory("Zapatos")
});
accesorios.addEventListener("click", (event) => {
    event.preventDefault();
    showByCategory("Accesorios")
});

//* EVENTS
productList.addEventListener("click", (event) => {
    if (event.target.tagName === "BUTTON") {
        const productId = event.target.getAttribute("data-id");
        showById(productId);
    }
});
