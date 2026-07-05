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

                  const fullname = document.getElementById("fullname").value.trim();
                    const email = document.getElementById("email").value.trim();
                      const phone = document.getElementById("phone").value.trim();
                        const password = document.getElementById("password").value;
                          const confirmPassword = document.getElementById("confirmPassword").value;

                            if (
                                fullname === "" ||
                                    email === "" ||
                                        phone === "" ||
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
                                                                                                                              fullname: fullname,
                                                                                                                                    email: email,
                                                                                                                                          phone: phone,
                                                                                                                                                createdAt: new Date().toISOString()
                                                                                                                                                    });

                                                                                                                                                        alert("Account created successfully.");

                                                                                                                                                            window.location.href = "index.html";

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
