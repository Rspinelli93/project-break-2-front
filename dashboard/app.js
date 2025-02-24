let urlAll = 'https://project-break-2-2025.onrender.com/dashboard'

const divRender = document.getElementById("div-render");

//*links
const productos = document.getElementById("Productos");
const remeras = document.getElementById("Remeras");
const pantalones = document.getElementById("Pantalones");
const zapatos = document.getElementById("Zapatos");
const accesorios = document.getElementById("Accesorios");
const agregarProducto = document.getElementById("agregar-producto")
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
productos.addEventListener("click", (event) => {
    event.preventDefault();
    history.pushState(null, '', '/dashboard/dashboard.html#');         //! ESTO
    showAll();
});
remeras.addEventListener("click", (event) => {
    event.preventDefault();
    history.pushState(null, '', '/dashboard/dashboard.html#');         //! ESTO
    showByCategory("Camisetas")
});
pantalones.addEventListener("click", (event) => {
    event.preventDefault();
    history.pushState(null, '', '/dashboard/dashboard.html#');         //! ESTO
    showByCategory("Pantalones")
});
zapatos.addEventListener("click", (event) => {
    event.preventDefault();
    history.pushState(null, '', '/dashboard/dashboard.html#');         //! ESTO
    showByCategory("Zapatos")
});
accesorios.addEventListener("click", (event) => {
    event.preventDefault();
    history.pushState(null, '', '/dashboard/dashboard.html#');         //! ESTO
    showByCategory("Accesorios")
});

// todo ----- FETCHING EDIT FORM --------- //
document.addEventListener("click", async (event) => {

    if (event.target === buttonEdit) {
        
        const productId = buttonEdit.getAttribute("data-id");
        
        try {
            const response = await fetch(`${urlAll}/${productId}/edit`);
            const formHtml = await response.text();

            divRender.innerHTML += formHtml; 
        } catch (error) {
            console.error("Error fetching form:", error);
        }
    }
});
// todo ----- FETCHING ADD-NEW FORM --------- //
const addNewForm = async () => {
    try {
        const response = await fetch(`${urlAll}/newProduct`);
        const formHtml = await response.text();
        divRender.innerHTML += formHtml; 
    } catch (error) {
        console.error("Error fetching form:", error);
    }
}
agregarProducto.addEventListener("click", (event) => {
    clearAll()
    addNewForm()
});

/* //* ------------------------- SENDING FORM EDIT PRODUCT

document.getElementById("editProductForm").addEventListener("submit", async (event) => {
    event.preventDefault(); // Prevent default form submission

    const productId = document.getElementById("productId").value;
    const updatedProduct = {
        nombre: document.getElementById("nombre").value,
        descripcion: document.getElementById("descripcion").value,
        imagen: document.getElementById("imagen").value,
        categoria: document.getElementById("categoria").value,
        talla: document.getElementById("talla").value,
        precio: document.getElementById("precio").value
    };

    console.log("Sending update request for product ID:", productId);
    console.log("Updated data:", updatedProduct);

    try {
        const response = await fetch(`${urlAll}/${productId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(updatedProduct)
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const result = await response.json();
        console.log("Product updated successfully:", result);
        alert("Product updated successfully!");
    } catch (error) {
        console.error("Error updating product:", error);
        alert("Error updating product. Check the console for details.");
    }
});

//* ------------------------- SENDING FORM NEW PRODUCT

document.getElementById("submitNew").addEventListener("click", async (event) => {
    event.preventDefault(); 

    const productData = {
        nombre: document.getElementById("nombre").value,
        descripcion: document.getElementById("descripcion").value,
        imagen: document.getElementById("imagen").value,
        categoria: document.getElementById("categoria").value,
        talla: document.getElementById("talla").value,
        precio: document.getElementById("precio").value
    };

    try {
        const response = await fetch("https://project-break-2-2025.onrender.com/dashboard", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(productData)
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const result = await response.json();
        console.log(result)
        alert("Product created successfully!");
        clearAll()
        addNewForm()
    } catch (error) {
        console.error("Error creating product:", error);
        alert("Error creating product. Check the console for details.");
    }
});
 */