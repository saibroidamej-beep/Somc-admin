import {
    auth,
    db,
    doc,
    getDoc,
    onAuthStateChanged
} from "./firebase.js";

const profileName = document.getElementById("profileName");
const profileEmail = document.getElementById("profileEmail");
const profilePhone = document.getElementById("profilePhone");
const profileRole = document.getElementById("profileRole");
const profileStatus = document.getElementById("profileStatus");

onAuthStateChanged(auth, async (user) => {

    if (!user) {
        window.location.href = "index.html";
        return;
    }

    try {

        const docRef = doc(db, "users", user.uid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {

            const data = docSnap.data();

            profileName.value = data.fullName || "";
            profileEmail.value = data.email || "";
            profilePhone.value = data.phone || "";
            profileRole.value = data.role || "";
            profileStatus.value = data.status || "Active";

        } else {

            alert("Profile not found.");

        }

    } catch (error) {

        alert(error.message);

    }

});