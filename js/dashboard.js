import {
    auth,
    db,
    doc,
    getDoc,
    onAuthStateChanged,
    signOut
} from "./firebase.js";

const welcomeName = document.getElementById("welcomeName");
const welcomeRole = document.getElementById("welcomeRole");
const logoutBtn = document.getElementById("logoutBtn");

onAuthStateChanged(auth, async (user) => {

    if (!user) {
        window.location.href = "index.html";
        return;
    }

    const docRef = doc(db, "users", user.uid);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {

        const data = docSnap.data();

        welcomeName.textContent = `Welcome, ${data.fullName}`;
        welcomeRole.textContent = `Role: ${data.role}`;

    }

});

logoutBtn.addEventListener("click", async (e) => {

    e.preventDefault();

    await signOut(auth);

    window.location.href = "index.html";

});