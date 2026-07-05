import {
      auth,
        signOut
        } from "./firebase.js";

        import {
          onAuthStateChanged
          } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-auth.js";

          const logoutBtn = document.getElementById("logoutBtn");

          // Check if user is logged in
          onAuthStateChanged(auth, (user) => {

            if (!user) {
                window.location.href = "index.html";
                  }

                  });

                  // Logout
                  logoutBtn.addEventListener("click", async () => {

                    try {

                        await signOut(auth);

                            alert("You have been logged out.");

                                window.location.href = "index.html";

                                  } catch (error) {

                                      alert(error.message);

                                        }

                                        });
