import {
      auth,
        signInWithEmailAndPassword
        } from "./firebase.js";

        const loginForm = document.getElementById("loginForm");

        loginForm.addEventListener("submit", async (e) => {

          e.preventDefault();

            const email = document.getElementById("email").value.trim();
              const password = document.getElementById("password").value;

                if (email === "" || password === "") {
                    alert("Please enter your email and password.");
                        return;
                          }

                            try {

                                await signInWithEmailAndPassword(auth, email, password);

                                    alert("Login successful.");

                                        window.location.href = "dashboard.html";

                                          } catch (error) {

                                              switch (error.code) {

                                                    case "auth/user-not-found":
                                                            alert("No account found with this email.");
                                                                    break;

                                                                          case "auth/wrong-password":
                                                                                  alert("Incorrect password.");
                                                                                          break;

                                                                                                case "auth/invalid-email":
                                                                                                        alert("Invalid email address.");
                                                                                                                break;

                                                                                                                      case "auth/invalid-credential":
                                                                                                                              alert("Invalid email or password.");
                                                                                                                                      break;

                                                                                                                                            default:
                                                                                                                                                    alert(error.message);

                                                                                                                                                        }

                                                                                                                                                          }

                                                                                                                                                          });
