import {
    auth,
    db,
    onAuthStateChanged
} from "./firebase.js";

import {
    collection,
    getDocs
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";

const totalUsers = document.getElementById("totalUsers");

onAuthStateChanged(auth, async (user) => {

    if (!user) {
        window.location.href = "index.html";
        return;
    }

    try {

        const snapshot = await getDocs(collection(db, "users"));

        totalUsers.textContent = `${snapshot.size} Registered Users`;

    } catch (error) {

        console.log(error);

    }

});