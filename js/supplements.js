import {
    auth,
    db,
    onAuthStateChanged,
    collection,
    getDocs,
    doc,
    setDoc
} from "./firebase.js";

const productForm = document.getElementById("productForm");
const productsList = document.getElementById("productsList");

onAuthStateChanged(auth, (user) => {

    if (!user) {
        window.location.href = "index.html";
        return;
    }

    loadProducts();

});

productForm.addEventListener("submit", async (e) => {

    e.preventDefault();

    const productName = document.getElementById("productName").value.trim();
    const price = Number(document.getElementById("price").value);
    const benefits = document.getElementById("benefits").value.trim();
    const image = document.getElementById("image").value.trim();

    const productId = "PROD-" + Date.now();

    try {

        await setDoc(doc(db, "supplements", productId), {

            productId,
            productName,
            price,
            benefits,
            image,
            status: "Available",
            createdAt: new Date().toISOString()

        });

        alert("Supplement added successfully.");

        productForm.reset();

        loadProducts();

    } catch (error) {

        alert(error.message);

    }

});

async function loadProducts() {

    productsList.innerHTML = "";

    const snapshot = await getDocs(collection(db, "supplements"));

    if (snapshot.empty) {

        productsList.innerHTML = "<p>No supplements added yet.</p>";
        return;

    }

    snapshot.forEach((doc) => {

        const data = doc.data();

        productsList.innerHTML += `

        <div class="card">

            <h3>${data.productName}</h3>

            <p><strong>Price:</strong> ₦${data.price}</p>

            <p>${data.benefits}</p>

            <p><strong>Status:</strong> ${data.status}</p>

        </div>

        `;

    });

}