import {
    auth,
    db,
    createUserWithEmailAndPassword,
    doc,
    setDoc
} from "./firebase.js";

const signupForm = document.getElementById("signupForm");

signupForm.addEventListener("submit", async (e) => {

    e.preventDefault();

    const fullName = document.getElementById("fullName").value.trim();
    const email = document.getElementById("email").value.trim();
    const phone = document.getElementById("phone").value.trim();
    const role = document.getElementById("role").value;
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirmPassword").value;

    if (
    fullName === "" ||
    email === "" ||
    phone === "" ||
    role === "" ||
    password === "" ||
    confirmPassword === ""
) {
        alert("Please fill in all fields.");
        return;
    }

    if (password !== confirmPassword) {
        alert("Passwords do not match.");
        return;
    }

    if (password.length < 6) {
        alert("Password must be at least 6 characters.");
        return;
    }

    try {

        const userCredential = await createUserWithEmailAndPassword(
            auth,
            email,
            password
        );

        const user = userCredential.user;

        await setDoc(doc(db, "users", user.uid), {

            fullName: fullName,
            email: email,
           phone: phone,
role: role,
status: "active",
appointments: 0,
consultations: 0,
coursesCompleted: 0,
certificates: 0,
orders: 0,
            photo: "",
gender: "",
dateOfBirth: "",
country: "",
state: "",
address: "",

createdAt: new Date().toISOString(),
lastLogin: new Date().toISOString(),

appointments: 0,
consultations: 0,
orders: 0,
coursesCompleted: 0,
certificates: 0,

        });

        alert("Account created successfully.");

        window.location.href = "dashboard.html";

    } catch (error) {

        switch (error.code) {

            case "auth/email-already-in-use":
                alert("This email is already registered.");
                break;

            case "auth/invalid-email":
                alert("Invalid email address.");
                break;

            case "auth/weak-password":
                alert("Password is too weak.");
                break;

            default:
                alert(error.message);

        }

    }

});