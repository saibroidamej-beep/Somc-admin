import { db } from "./firebase.js";

import {
  collection,
  query,
  orderBy,
  onSnapshot
} from "https://www.gstatic.com/firebasejs/12.2.1/firebase-firestore.js";

const consultationList = document.getElementById("consultationList");

const q = query(
  collection(db, "consultations"),
  orderBy("createdAt", "desc")
);

onSnapshot(q, (snapshot) => {

  if (snapshot.empty) {
    consultationList.innerHTML = `
      <div class="empty">
        No consultation requests yet.
      </div>
    `;
    return;
  }

  consultationList.innerHTML = "";

  snapshot.forEach((doc) => {

    const data = doc.data();

    consultationList.innerHTML += `
      <div class="card">

        <h3>👤 ${data.name}</h3>

        <p><strong>Age:</strong> ${data.age}</p>

        <p><strong>Gender:</strong> ${data.gender}</p>

        <p><strong>Phone:</strong> ${data.phone}</p>

        <p><strong>Main Complaint:</strong> ${data.complaint}</p>

        <p><strong>Symptoms:</strong> ${data.symptoms}</p>

        <p><strong>Duration:</strong> ${data.duration}</p>

        <p><strong>Consultation Type:</strong> ${data.type}</p>

        <span class="status">${data.status}</span>

      </div>
    `;

  });

});