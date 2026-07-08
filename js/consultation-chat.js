import { db } from "./firebase.js";

import {
    collection,
    addDoc,
    query,
    orderBy,
    onSnapshot,
    serverTimestamp
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";

// Get consultation ID from URL
const params = new URLSearchParams(window.location.search);
const consultationId = params.get("id");

const chatBox = document.getElementById("chatBox");
const sendBtn = document.getElementById("sendBtn");
const messageInput = document.getElementById("message");

// Check if consultation ID exists
if (!consultationId) {

    chatBox.innerHTML = "<h2>No consultation found.</h2>";

    throw new Error("Missing consultation ID");

}

const messagesRef = collection(
    db,
    "consultationChats",
    consultationId,
    "messages"
);

const q = query(messagesRef, orderBy("createdAt"));

onSnapshot(q, (snapshot) => {

    chatBox.innerHTML = "";

    if (snapshot.empty) {
        chatBox.innerHTML = "<p>No messages yet.</p>";
        return;
    }

    snapshot.forEach((doc) => {

        const data = doc.data();

        const div = document.createElement("div");

        div.className = "message " + data.sender;

        div.innerHTML = data.text;

        chatBox.appendChild(div);

    });

    chatBox.scrollTop = chatBox.scrollHeight;

});

sendBtn.addEventListener("click", async () => {

    const text = messageInput.value.trim();

    if (!text) return;

    try {

        await addDoc(messagesRef, {

            sender: "patient",

            text: text,

            createdAt: serverTimestamp()

        });

        messageInput.value = "";

    } catch (error) {

        console.error(error);

        alert(error.message);

    }

});