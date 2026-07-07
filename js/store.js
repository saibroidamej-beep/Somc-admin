import {
    auth,
    db,
    collection,
    getDocs
} from "./firebase.js";

const storeProducts = document.getElementById("storeProducts");

loadProducts();

async function loadProducts(){

    const snapshot = await getDocs(collection(db,"supplements"));

    storeProducts.innerHTML = "";

    if(snapshot.empty){

        storeProducts.innerHTML="<h2>No supplements available.</h2>";
        return;

    }

    snapshot.forEach((doc)=>{

        const p=doc.data();

        storeProducts.innerHTML +=`

<div class="card">

<img src="${p.image || 'images/no-image.png'}"
style="width:100%;height:200px;object-fit:cover;border-radius:10px;">

<h3>${p.productName}</h3>

<h2>₦${p.price}</h2>

<p>${p.benefits}</p>

<button>
Buy Now
</button>

</div>

`;

    });

}