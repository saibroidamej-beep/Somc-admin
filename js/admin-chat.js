import { db } from "./firebase.js";

import {
  collection,
  addDoc,
  query,
  orderBy,
  onSnapshot,
  serverTimestamp
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";

const params = new URLSearchParams(window.location.search);
const consultationId = params.get("id");

const messagesDiv = document.getElementById("messages");
const sendBtn = document.getElementById("sendBtn");
const messageInput = document.getElementById("message");

if (!consultationId) {
    messagesDiv.innerHTML = "<h2 style='color:red'>No consultation ID found.</h2>";
    throw new Error("Missing consultation ID");
}

const messagesRef = collection(db, "consultationChats", consultationId, "messages");

const q = query(messagesRef, orderBy("createdAt"));

onSnapshot(q, (snapshot) => {

    messagesDiv.innerHTML = "";

    if (snapshot.empty) {
        messagesDiv.innerHTML = "<p>No messages yet.</p>";
        return;
    }

    snapshot.forEach((doc) => {

        const msg = doc.data();

        messagesDiv.innerHTML += `
            <div class="message ${msg.sender}">
                <strong>${msg.sender}</strong><br>
                ${msg.text}
            </div>
        `;

    });

    messagesDiv.scrollTop = messagesDiv.scrollHeight;

}, (error) => {

    console.error(error);

    messagesDiv.innerHTML =
        "<h2 style='color:red'>" + error.message + "</h2>";

});

sendBtn.addEventListener("click", async () => {

    const text = messageInput.value.trim();

    if (!text) return;

    try {

        await addDoc(messagesRef, {
            sender: "doctor",
            text,
            createdAt: serverTimestamp()
        });

        messageInput.value = "";

    } catch (error) {

        console.error(error);
        alert(error.message);

    }

});