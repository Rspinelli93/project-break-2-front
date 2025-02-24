let urlAll = 'https://project-break-2-2025.onrender.com/products'

const divRender = document.getElementById("div-render");

//*links
const remeras = document.getElementById("Remeras");
const pantalones = document.getElementById("Pantalones");
const zapatos = document.getElementById("Zapatos");
const accesorios = document.getElementById("Accesorios");
//*links

const productList = document.createElement("ul");
productList.id = "products-list";
const productDesc = document.createElement("ul")
productDesc.id = "product-description";

// todo ----- NAVIGATION AND CLEARING DIV --------- //
async function navigateTo(page) {
    try {
        const response = await fetch(`./pages/${page}.html`);
        if (!response.ok) throw new Error("Page not found");

        const html = await response.text();
        divRender.innerHTML = html;
        history.pushState(null, '', `./${page}`); 
        //! ESTO
    } catch (error) {
        
        console.error("Error loading page:", error);
        divRender.innerHTML = "<p>Page not found.</p>";
    }
}
const clearAll = () => {
    divRender.innerHTML = '';
    productList.innerHTML = '';
}

// todo ----- RENDER MAIN AND API CALL --------- //
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
            divRender.appendChild(productList)
        } catch (error) {
            console.error('Error fetching product:', error);
        }
    }

};
//* Calling show all
showAll();

// todo ----- SHOW BY ID --------- //
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
    divRender.appendChild(productDesc)
};
//*Details button
productList.addEventListener("click", (event) => {
    if (event.target.tagName === "BUTTON") {
        const productId = event.target.getAttribute("data-id");
        showById(productId);
    }
});

// todo ----- SHOW BY CATEGORY --------- //
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
            divRender.appendChild(productList)
        } catch (error) {
            console.error('Error fetching product:', error);
        }
    }
};

//* LINKS (show by cat)
remeras.addEventListener("click", (event) => {
    event.preventDefault();
    history.pushState(null, '', '/');         //! ESTO
    showByCategory("Camisetas")
});
pantalones.addEventListener("click", (event) => {
    event.preventDefault();
    history.pushState(null, '', '/');         //! ESTO
    showByCategory("Pantalones")
});
zapatos.addEventListener("click", (event) => {
    event.preventDefault();
    history.pushState(null, '', '/');       //! ESTO
    showByCategory("Zapatos")
});
accesorios.addEventListener("click", (event) => {
    event.preventDefault();
    history.pushState(null, '', '/');      //! ESTO
    showByCategory("Accesorios")
});











//-------------------------------------------login temp

const loginButton = document.getElementById('login-button')
loginButton.addEventListener('click', () => {
    window.location.href = '/dashboard/dashboard.html';
})