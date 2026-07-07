import {
    auth,
    db,
    onAuthStateChanged,
    collection,
    getDocs
} from "./firebase.js";

const usersBody = document.getElementById("usersBody");

onAuthStateChanged(auth, async (user) => {

    if (!user) {
        window.location.href = "index.html";
        return;
    }

    try {

        const snapshot = await getDocs(collection(db, "users"));

        usersBody.innerHTML = "";

        snapshot.forEach((doc) => {

            const data = doc.data();

            usersBody.innerHTML += `
                <tr>
                    <td>${data.fullName || ""}</td>
                    <td>${data.email || ""}</td>
                    <td>${data.phone || ""}</td>
                    <td>${data.role || ""}</td>
                    <td>${data.status || "Active"}</td>
                </tr>
            `;

        });

    } catch (error) {

        alert(error.message);

    }

});