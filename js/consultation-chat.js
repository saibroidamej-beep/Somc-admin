import { db } from "./firebase.js";

import {
  collection,
  addDoc,
  query,
  orderBy,
  onSnapshot,
  serverTimestamp
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";

const consultationId = "demo-chat";

const chatBox = document.getElementById("chatBox");
const sendBtn = document.getElementById("sendBtn");
const messageInput = document.getElementById("message");

const messagesRef = collection(db, "consultationChats", consultationId, "messages");

const q = query(messagesRef, orderBy("timestamp"));

onSnapshot(q, (snapshot) => {

    chatBox.innerHTML = "";

    snapshot.forEach((doc) => {

        const data = doc.data();

        const div = document.createElement("div");

        div.className = "message " + data.sender;

        div.innerHTML = data.message;

        chatBox.appendChild(div);

    });

    chatBox.scrollTop = chatBox.scrollHeight;

});

sendBtn.addEventListener("click", async () => {

    const text = messageInput.value.trim();

    if (!text) return;

    await addDoc(messagesRef, {

        sender: "patient",

        message: text,

        timestamp: serverTimestamp()

    });

    messageInput.value = "";

});