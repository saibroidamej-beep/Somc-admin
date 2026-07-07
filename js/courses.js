import {
    auth,
    db,
    onAuthStateChanged,
    collection,
    getDocs,
    doc,
    setDoc
} from "./firebase.js";

const courseForm = document.getElementById("courseForm");
const coursesList = document.getElementById("coursesList");

onAuthStateChanged(auth, (user) => {

    if (!user) {
        window.location.href = "index.html";
        return;
    }

    loadCourses();

});

courseForm.addEventListener("submit", async (e) => {

    e.preventDefault();

    const courseTitle = document.getElementById("courseTitle").value.trim();
    const instructor = document.getElementById("instructor").value.trim();
    const description = document.getElementById("description").value.trim();
    const courseImage = document.getElementById("courseImage").value.trim();

    const courseId = "COURSE-" + Date.now();

    try {

        await setDoc(doc(db, "courses", courseId), {

            courseId,
            courseTitle,
            instructor,
            description,
            courseImage,
            status: "Published",
            createdAt: new Date().toISOString()

        });

        alert("Course added successfully.");

        courseForm.reset();

        loadCourses();

    } catch (error) {

        alert(error.message);

    }

});

async function loadCourses() {

    coursesList.innerHTML = "";

    try {

        const snapshot = await getDocs(collection(db, "courses"));

        if (snapshot.empty) {

            coursesList.innerHTML = "<p>No courses available.</p>";
            return;

        }

        snapshot.forEach((doc) => {

            const course = doc.data();

            coursesList.innerHTML += `

            <div class="card">

                <img src="${course.courseImage || 'images/no-image.png'}"
                     style="width:100%;height:180px;object-fit:cover;border-radius:10px;">

                <h3>${course.courseTitle}</h3>

                <p><strong>Instructor:</strong> ${course.instructor}</p>

                <p>${course.description}</p>

                <p><strong>Status:</strong> ${course.status}</p>

            </div>

            `;

        });

    } catch (error) {

        alert(error.message);

    }

}