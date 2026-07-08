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

const messagesRef = collection(
    db,
    "consultationChats",
    consultationId,
    "messages"
);

const q = query(messagesRef, orderBy("createdAt"));

onSnapshot(q, (snapshot) => {

    messagesDiv.innerHTML = "";

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

});

sendBtn.addEventListener("click", async () => {

    const text = messageInput.value.trim();

    if (!text) return;

    await addDoc(messagesRef, {
        sender: "doctor",
        text: text,
        createdAt: serverTimestamp()
    });

    messageInput.value = "";

});