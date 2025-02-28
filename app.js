let urlAll = 'https://project-break-2-2025.onrender.com/products'

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
const loginLink = document.getElementById("Login");

const clearAll = () => {
    divRender.innerHTML = '';
    productList.innerHTML = '';
};
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
    showAll();
});
showAll();
//* ----- SHOW BY ID --------- //
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
productList.addEventListener("click", (event) => {
    if (event.target.tagName === "BUTTON") {
        const productId = event.target.getAttribute("data-id");
        showById(productId);
    }
});
//* ----- SHOW BY CATEGORY --------- //
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
//* ----- LOGIN --------- //
const CreateAnAccountLink = document.createElement('a')
CreateAnAccountLink.href = "#"
CreateAnAccountLink.innerText = "Create an Account"

const loginFunction = () => {
    const formLable = document.createElement('form');
    formLable.id = "login-form";

    const template = `
    <h2>Login</h2>
    <input type="email" id="email" name="email" placeholder="Email" required autocomplete="email">
    <input type="password" id="password" name="password" placeholder="Password" required autocomplete="current-password">
    <br>
    <button type="submit" id="login-button">Login</button>
    <br><br>
    `;

    formLable.innerHTML = template;
    formLable.appendChild(CreateAnAccountLink)
    divRender.appendChild(formLable);


    formLable.addEventListener('submit', async (event) => {
        event.preventDefault();
        
        const formData = new FormData(formLable);
        const dataRet = Object.fromEntries(formData);

        try {
            const response = await fetch(`${urlAll}/login`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(dataRet),
            });

            if (!response.ok) {
                throw new Error("Login failed");
            }

            const data = await response.json();
            localStorage.setItem("token", data.token); 
            console.log(data)

            window.location.href = "dashboard/dashboard.html";
        } catch (error) {
            console.error("Login error:", error);
            alert("Invalid credentials");
        }
    });
};
loginLink.addEventListener('click', (event) => {
    event.preventDefault();
    clearAll()
    loginFunction()
});
//* ----- REGISTER --------- //
const registerFunction = () => {
    const formLable = document.createElement('form');
    formLable.id = "register-form";

    const template = `
    <h2>Register</h2>
    <input type="hidden" name="_method" value="POST">
    <input type="email" name="email" placeholder="Email" required autocomplete="email">
    <input type="password" name="password" placeholder="Password" required></br>
    <button type="submit">Register</button></br></br>
    `;

    formLable.innerHTML = template;
    divRender.appendChild(formLable);

    formLable.addEventListener('submit', async (event) => {
        event.preventDefault();
        
        const formData = new FormData(formLable);
        const data = Object.fromEntries(formData);

        try {
            const response = await fetch(`${urlAll}/register`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            });

            if (!response.ok) {
                showErrorMessage("Usa otras credenciales", formLable);
                throw new Error("Usa otras credenciales");
            } else {
                showSuccessMessage("Usuario creado con exito", formLable);
                setTimeout(() => {
                    clearAll()
                    loginFunction()
                }, 2000);
            }
        } catch (error) {
            console.error('Error creating the account: ', error);
            alert("Use different credentials");
        }
    });
};
CreateAnAccountLink.addEventListener('click', (event) => {
    event.preventDefault();
    clearAll()
    registerFunction()
});