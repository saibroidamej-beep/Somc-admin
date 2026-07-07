import {
    auth,
    db,
    onAuthStateChanged,
    collection,
    getDocs
} from "./firebase.js";

const ordersBody = document.getElementById("ordersBody");

onAuthStateChanged(auth, async (user) => {

    if (!user) {
        window.location.href = "index.html";
        return;
    }

    loadOrders();

});

async function loadOrders() {

    ordersBody.innerHTML = "";

    try {

        const snapshot = await getDocs(collection(db, "orders"));

        if (snapshot.empty) {

            ordersBody.innerHTML = `
                <tr>
                    <td colspan="5" style="text-align:center;">
                        No orders found.
                    </td>
                </tr>
            `;
            return;
        }

        snapshot.forEach((doc) => {

            const order = doc.data();

            ordersBody.innerHTML += `
                <tr>
                    <td>${order.customerName}</td>
                    <td>${order.product}</td>
                    <td>${order.quantity}</td>
                    <td>₦${order.total}</td>
                    <td>${order.deliveryStatus}</td>
                </tr>
            `;

        });

    } catch (error) {

        alert(error.message);

    }

}