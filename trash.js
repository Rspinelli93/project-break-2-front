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