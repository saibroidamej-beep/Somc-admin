import { db } from "./firebase.js";

import {
    collection,
    query,
    orderBy,
    onSnapshot
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";

const consultationList = document.getElementById("consultationList");

const consultationsRef = collection(db, "consultations");

const q = query(
    consultationsRef,
    orderBy("createdAt", "desc")
);

onSnapshot(q, (snapshot) => {

    consultationList.innerHTML = "";

    if (snapshot.empty) {

        consultationList.innerHTML =
        "<h2>No consultation requests yet.</h2>";

        return;

    }

    snapshot.forEach((doc) => {

        const data = doc.data();

        consultationList.innerHTML += `

        <div class="card">

            <h3>👤 ${data.name}</h3>

            <p><b>Phone:</b> ${data.phone}</p>

            <p><b>Complaint:</b> ${data.complaint}</p>

            <p><b>Symptoms:</b> ${data.symptoms}</p>

            <p><b>Duration:</b> ${data.duration}</p>

            <p><b>Consultation:</b> ${data.type}</p>

            <p><b>Status:</b> ${data.status}</p>

            <button onclick="location.href='admin-chat.html?id=${doc.id}'">
                💬 Open Chat
            </button>

        </div>

        `;

    });

}, (error) => {

    console.error(error);

    consultationList.innerHTML =
    "<h2 style='color:red'>" + error.message + "</h2>";

});