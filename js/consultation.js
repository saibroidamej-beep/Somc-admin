import { db } from "./firebase.js";
import {
  collection,
  addDoc,
  serverTimestamp
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";

const submitBtn = document.getElementById("submitBtn");
const status = document.getElementById("status");

submitBtn.addEventListener("click", async () => {

    const name = document.getElementById("name").value.trim();
    const age = document.getElementById("age").value.trim();
    const gender = document.getElementById("gender").value;
    const phone = document.getElementById("phone").value.trim();
    const complaint = document.getElementById("complaint").value.trim();
    const symptoms = document.getElementById("symptoms").value.trim();
    const duration = document.getElementById("duration").value.trim();
    const type = document.getElementById("type").value;

    if (!name || !age || !gender || !phone || !complaint || !symptoms) {
        status.innerHTML = "❌ Please complete all required fields.";
        return;
    }

    submitBtn.disabled = true;
    status.innerHTML = "Submitting consultation...";

    try {

        await addDoc(collection(db, "consultations"), {
            name,
            age,
            gender,
            phone,
            complaint,
            symptoms,
            duration,
            type,
            status: "Pending",
            createdAt: serverTimestamp()
        });

        status.innerHTML = "✅ Consultation submitted successfully.";

        document.getElementById("name").value = "";
        document.getElementById("age").value = "";
        document.getElementById("gender").value = "";
        document.getElementById("phone").value = "";
        document.getElementById("complaint").value = "";
        document.getElementById("symptoms").value = "";
        document.getElementById("duration").value = "";
        document.getElementById("type").selectedIndex = 0;

    } catch (error) {

        console.error("Firebase Error:", error);

        status.innerHTML =
            "❌ Error: " + error.code + "<br>" + error.message;

    } finally {

        submitBtn.disabled = false;

    }

});