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


//* login

    import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.1.0/firebase-app.js';
    import { getAuth, signInWithEmailAndPassword } from 'https://www.gstatic.com/firebasejs/9.1.0/firebase-auth.js';

    // Firebase configuration
    const firebaseConfig = {
      apiKey: "YOUR_API_KEY",  // Replace with your API key from Firebase console
      authDomain: "project-break-back.firebaseapp.com",
      projectId: "project-break-back",
      storageBucket: "project-break-back.firebasestorage.app",
      messagingSenderId: "408546883394",
      appId: "1:408546883394:web:5b3c6d1da75af5d1c8badb"
    };

    // Initialize Firebase
    const app = initializeApp(firebaseConfig);
    const auth = getAuth(app);

    // Function to handle login
    async function loginUser(email, password) {
      try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const token = await userCredential.user.getIdToken();

        // Send the token to your server
        const response = await fetch('/api/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ token }),
        });

        const data = await response.json();
        console.log('Login success:', data);

      } catch (error) {
        console.error("Login error:", error.message);
      }
    }

    // Example login attempt
    loginUser('user@example.com', 'userpassword');

 // -------------------------- other ----------------------------------- //

    async function loginUser(email, password) {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const token = await userCredential.user.getIdToken();
    
      localStorage.setItem("firebaseToken", token); // Store token in localStorage
    }
    async function fetchData() {
      const token = localStorage.getItem("firebaseToken");
    
      const response = await fetch("/api/protected-data", {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      });
    
      const data = await response.json();
      console.log(data);
    }  