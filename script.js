let urlAll = 'https://project-break-2-2025.onrender.com/products'
let urlDash = 'https://project-break-2-2025.onrender.com/dashboard'
const productList = document.getElementById("products-list");
const productDesc = document.getElementById("product-description");

const remeras = document.getElementById("Remeras");
const pantalones = document.getElementById("Pantalones");
const zapatos = document.getElementById("Zapatos");
const accesorios = document.getElementById("Accesorios");
const agregarProducto = document.getElementById("agregarProducto");
const logoutLink = document.getElementById("Logout");
const loginLink = document.getElementById("Login");
const formContainer = document.getElementById("form-container");

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

const clearAll = () => {
    productList.innerHTML = '';
    productDesc.innerHTML = '';
    formContainer.style.display = 'none';
}
const showAll = async () => {
    
    clearAll()

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

let buttonEdit;
const showById = async (id) => {
    clearAll()

    const product = await apiCall(`${urlAll}/${id}`);

    productDesc.innerHTML = `
        <li><img src="${product.imagen}" alt="Imagen ${product.nombre}"></li>
        <li><h3>${product.nombre}</h3></li>
        <li>${product.descripcion}</li>
        <li>Talla: ${product.talla}</li>
        <li>${product.precio} €</li>
    `;

    buttonEdit = document.createElement("button");
    buttonEdit.textContent = "Edit Product";
    buttonEdit.setAttribute("data-id", product._id);
    const buttonLi = document.createElement("li");
    buttonLi.appendChild(buttonEdit);
    productDesc.appendChild(buttonLi);
};
const showByCategory = async (category) => {
    
    clearAll()

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

//?Details button
productList.addEventListener("click", (event) => {
    if (event.target.tagName === "BUTTON") {
        const productId = event.target.getAttribute("data-id");
        showById(productId);
    }
});
//?Edit form
document.addEventListener("click", async (event) => {

    if (event.target === buttonEdit) {
        
        const productId = buttonEdit.getAttribute("data-id");

        try {
            const response = await fetch(`${urlDash}/${productId}/edit`);
            const formHtml = await response.text();

            formContainer.innerHTML = formHtml; 
        } catch (error) {
            //! SI NO ESTA LOGEADO; REDIRECT A LOGIN
            console.error("Error fetching form:", error);
        }
    }
});


/* //! DOESNT WORK!!!!!!!!!!!!!!!!!!!!!!!!!!!!
loginLink.addEventListener("click", function(event) {
    const loginForm = `
        <h2>Login</h2>
        <input type="hidden" name="_method" value="POST">
        <input type="email" name="email" placeholder="Email" required autocomplete="email">
        <input type="password" name="password" placeholder="Password" required autocomplete="current-password">
        <button type="submit">Login</button>
        <a href="/register">Create an Account</a>
        `;
    clearAll()
    event.preventDefault(); 
    formContainer.innerHTML = loginForm;
});
 */


document.addEventListener("DOMContentLoaded", () => {
    const agregarProducto = document.getElementById("AgregarProducto");
    console.log(agregarProducto); // Should log the <a> element
});

//*Evento edit product
//*Evento agregar producto

//*Pagina login
//*Pagina Create account
//*Pagina logout