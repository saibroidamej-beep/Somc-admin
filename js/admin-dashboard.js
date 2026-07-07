import {
    auth,
    db,
    onAuthStateChanged,
    collection,
    getDocs
} from "./firebase.js";

const usersCount = document.getElementById("usersCount");
const ordersCount = document.getElementById("ordersCount");
const productsCount = document.getElementById("productsCount");
const coursesCount = document.getElementById("coursesCount");
const revenue = document.getElementById("revenue");

onAuthStateChanged(auth, async (user) => {

    if (!user) {
        window.location.href = "index.html";
        return;
    }

    loadDashboard();

});

async function loadDashboard() {

    try {

        // USERS
        const usersSnapshot = await getDocs(collection(db, "users"));
        usersCount.textContent = usersSnapshot.size;

        // ORDERS
        const ordersSnapshot = await getDocs(collection(db, "orders"));
        ordersCount.textContent = ordersSnapshot.size;

        let totalRevenue = 0;

        ordersSnapshot.forEach((doc) => {
            const order = doc.data();

            if (order.total) {
                totalRevenue += Number(order.total);
            }
        });

        revenue.textContent = "₦" + totalRevenue.toLocaleString();

        // SUPPLEMENTS
        const supplementsSnapshot = await getDocs(collection(db, "supplements"));
        productsCount.textContent = supplementsSnapshot.size;

        // COURSES
        const coursesSnapshot = await getDocs(collection(db, "courses"));
        coursesCount.textContent = coursesSnapshot.size;

    } catch (error) {

        console.log(error);

    }

}