let urlAll = 'https://project-break-2-2025.onrender.com/dashboard'

const divRender = document.getElementById("div-render");
const productList = document.createElement("ul");
productList.id = "products-list";
const productDesc = document.createElement("ul")
productDesc.id = "product-description";

const productos = document.getElementById("Productos");
const remeras = document.getElementById("Remeras");
const pantalones = document.getElementById("Pantalones");
const zapatos = document.getElementById("Zapatos");
const accesorios = document.getElementById("Accesorios");
const agregarProducto = document.getElementById("agregar-producto")

const clearAll = () => {
    divRender.innerHTML = '';
    productList.innerHTML = '';
}
const showSuccessMessage = (message, where) => {
    const messageDiv = document.createElement('div');
    messageDiv.textContent = message;
    messageDiv.style.color = "green";
    messageDiv.style.fontSize = "25px";
    messageDiv.style.fontWeight = "bold";
    messageDiv.style.marginBot = "20px";
    
    where.appendChild(messageDiv);

    setTimeout(() => {
        messageDiv.remove();
    }, 7000);
};
const showErrorMessage = (message, where) => {
    const messageDiv = document.createElement('div');
    messageDiv.textContent = message;
    messageDiv.style.color = "red";
    messageDiv.style.fontSize = "25px";
    messageDiv.style.fontWeight = "bold";
    messageDiv.style.marginBot = "20px";
    
    where.appendChild(messageDiv);

    setTimeout(() => {
        messageDiv.remove();
    }, 7000);
};
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

    if (!data) {
        divRender.innerHTML = '<h2>Debes estar logeado para acceder al Dashboard - <a href="../index.html">HOME</a></h2>'
    }

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
productos.addEventListener("click", (event) => {
    event.preventDefault();
    history.pushState(null, '', '/dashboard/dashboard.html#');
    showAll();
});
//* ----- SHOW BY ID --------- //
let buttonEdit;
let buttonEliminate;
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

    buttonEliminate = document.createElement("button");
    buttonEliminate.textContent = "Eliminate Product";
    buttonEliminate.setAttribute("data-id", product._id);
    const buttonElimLi = document.createElement("li");
    buttonElimLi.appendChild(buttonEliminate);
    productDesc.appendChild(buttonElimLi);

    divRender.appendChild(productDesc)

    buttonEdit.addEventListener("click", (event) => {
        if (event.target.tagName === "BUTTON") {
            const productId = event.target.getAttribute("data-id");
            editForm(productId);
        }
    });

    buttonEliminate.addEventListener("click", async (event) => {
        event.preventDefault();

        const isConfirmed = window.confirm("Estas seguro que quieres eliminar el Producto?");
        if (!isConfirmed) return; 

        const productId = event.target.getAttribute("data-id");

        try {
            const response = await fetch(`${urlAll}/${productId}/delete`, {
                method: "DELETE",
                headers: { "Content-Type": "application/json" }
            });

            if (response.ok) {
                showSuccessMessage("Producto eliminado con éxito, redirecting...", buttonElimLi);

                setTimeout(() => {
                    clearAll();
                    window.location.href = "/dashboard/dashboard.html";
                }, 3000);
            } else {
                showErrorMessage("Error al eliminar el producto", buttonElimLi);
            }
        } catch (error) {
            showErrorMessage("Error de conexión", buttonElimLi);
        }
    });    
};
productList.addEventListener("click", (event) => {
    if (event.target.tagName === "BUTTON") {
        const productId = event.target.getAttribute("data-id");
        showById(productId);
    }
});
//* ---- SHOW BY CATEGORY --------- //
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
remeras.addEventListener("click", (event) => {
    event.preventDefault();
    history.pushState(null, '', '/dashboard/dashboard.html#');
    showByCategory("Camisetas")
});
pantalones.addEventListener("click", (event) => {
    event.preventDefault();
    history.pushState(null, '', '/dashboard/dashboard.html#');
    showByCategory("Pantalones")
});
zapatos.addEventListener("click", (event) => {
    event.preventDefault();
    history.pushState(null, '', '/dashboard/dashboard.html#');
    showByCategory("Zapatos")
});
accesorios.addEventListener("click", (event) => {
    event.preventDefault();
    history.pushState(null, '', '/dashboard/dashboard.html#');
    showByCategory("Accesorios")
});
//* ---- ADD PRODUCT FORM -------- //
const agregarForm = () => {
    const formLable = document.createElement('form');
    formLable.id = "new-product-form";

    const template = `
        <label for="nombre">Nombre:</label>
        <input type="text" id="nombre" name="nombre" required><br><br>

        <label for="descripcion">Descripción:</label>
        <textarea id="descripcion" name="descripcion" required></textarea><br><br>

        <label for="imagen">Imagen URL:</label>
        <input type="url" id="imagen" name="imagen" required><br><br>

        <label for="categoria">Categoría:</label>
        <select id="categoria" name="categoria" required>
            <option value="Camisetas">Camisetas</option>
            <option value="Pantalones">Pantalones</option>
            <option value="Zapatos">Zapatos</option>
            <option value="Accesorios">Accesorios</option>
        </select>
        <br><br>

        <label for="talla">Talla:</label>
        <select id="talla" name="talla" required>
            <option value="XS">XS</option>
            <option value="S">S</option>
            <option value="M">M</option>
            <option value="L">L</option>
            <option value="XL">XL</option>
        </select>
        <br><br>

        <label for="precio">Precio:</label>
        <input type="number" id="precio" name="precio" step="0.01" required><br><br>

        <button type="submit" id="submitNew">Enviar</button>
    `;

    formLable.innerHTML = template;
    divRender.appendChild(formLable);

    formLable.addEventListener('submit', async (event) => {
        event.preventDefault();
        
        const formData = new FormData(formLable);
        const data = Object.fromEntries(formData);

        if (data.precio) {
            data.precio = Number(data.precio);
        }
        try {
            const response = await fetch(urlAll, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            });

            if (response.ok) {
                showSuccessMessage("Producto agregado con éxito", formLable);
                formLable.reset();
            } else {
                showErrorMessage("Error al agregar el producto", formLable);
            }
        } catch (error) {
            showErrorMessage("Error de conexión", formLable);
        }
    });
};
agregarProducto.addEventListener("click", (event) => {
    clearAll()
    agregarForm()
});
//* ----- UPDATE PRODUCTO FORM (init at getById)----- //
const editForm = async (id) => {
    clearAll()

    const formLable = document.createElement('form');
    formLable.id = "edit-form";
    
    const product = await apiCall(`${urlAll}/${id}`);

    const formTemplate = `
            <label for="nombre">Nombre:</label>
            <input type="text" id="nombre" name="nombre" value="${product.nombre}" required><br><br>

            <label for="descripcion">Descripción:</label>
            <textarea id="descripcion" name="descripcion" required>${product.descripcion}</textarea><br><br>

            <label for="imagen">Imagen URL:</label>
            <input type="url" id="imagen" name="imagen" value="${product.imagen}" required><br><br>

            <label for="categoria">Categoría:</label>
            <select id="categoria" name="categoria" required>
                <option value="Camisetas" ${product.categoria == 'Camisetas' ? 'selected' : ''}>Camisetas</option>
                <option value="Pantalones" ${product.categoria == 'Pantalones' ? 'selected' : ''}>Pantalones</option>
                <option value="Zapatos" ${product.categoria == 'Zapatos' ? 'selected' : ''}>Zapatos</option>
                <option value="Accesorios" ${product.categoria == 'Accesorios' ? 'selected' : ''}>Accesorios</option>
            </select>
            <br><br>
            <label for="talla">Talla:</label>
            <select id="talla" name="talla" required>
                <option value="XS" ${product.talla == 'XS' ? 'selected' : ''}>XS</option>
                <option value="S" ${product.talla == 'S' ? 'selected' : ''}>S</option>
                <option value="M" ${product.talla == 'M' ? 'selected' : ''}>M</option>
                <option value="L" ${product.talla == 'L' ? 'selected' : ''}>L</option>
                <option value="XL" ${product.talla == 'XL' ? 'selected' : ''}>XL</option>
            </select>
            <br><br>
            <label for="precio">Precio:</label>
            <input type="number" id="precio" name="precio" step="0.01" value="${product.precio}" required><br><br>
            <button type="submit">Enviar</button>
        `
    formLable.innerHTML = formTemplate
    divRender.appendChild(formLable)

    formLable.addEventListener('submit', async (event) => {
        event.preventDefault();
        
        const formData = new FormData(formLable);
        const data = Object.fromEntries(formData);

        if (data.precio) {
            data.precio = Number(data.precio);
        }
        try {
            const response = await fetch(`${urlAll}/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            });

            if (response.ok) {
                showSuccessMessage("Producto editado con éxito", formLable);
                setTimeout(() => {
                    clearAll();
                    showById(id);
                }, 3000);
            } else {
                showErrorMessage("Error al editar el producto", formLable);
            }
        } catch (error) {
            showErrorMessage("Error de conexión", formLable);
        }
    });
}

//* MISSING LOGIN, REGISTER AND LOGOUT

showAll();