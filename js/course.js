import {
    auth,
    db,
    onAuthStateChanged,
    doc,
    getDoc,
    updateDoc
} from "./firebase.js";

const params = new URLSearchParams(window.location.search);
const courseId = params.get("id");

const courseTitle = document.getElementById("courseTitle");
const courseInstructor = document.getElementById("courseInstructor");
const courseDescription = document.getElementById("courseDescription");
const courseImage = document.getElementById("courseImage");
const lessons = document.getElementById("lessons");
const completeCourse = document.getElementById("completeCourse");

onAuthStateChanged(auth, async (user) => {

    if (!user) {
        window.location.href = "index.html";
        return;
    }

    if (!courseId) {
        alert("Course not found.");
        window.location.href = "student-courses.html";
        return;
    }

    try {

        const courseRef = doc(db, "courses", courseId);
        const courseSnap = await getDoc(courseRef);

        if (!courseSnap.exists()) {
            alert("Course not found.");
            return;
        }

        const course = courseSnap.data();

        courseTitle.textContent = course.courseTitle;
        courseInstructor.textContent = "Instructor: " + course.instructor;
        courseDescription.textContent = course.description;
        courseImage.src = course.courseImage || "images/no-image.png";

        lessons.innerHTML = `

        <div class="card">
            <h3>Lesson 1</h3>
            <p>Introduction</p>
        </div>

        <div class="card">
            <h3>Lesson 2</h3>
            <p>Main Training</p>
        </div>

        <div class="card">
            <h3>Lesson 3</h3>
            <p>Final Assessment</p>
        </div>

        `;

        completeCourse.onclick = async () => {

            const enrollRef = doc(
                db,
                "enrollments",
                user.uid + "_" + courseId
            );

            await updateDoc(enrollRef, {
                progress: 100,
                completed: true,
                completedAt: new Date().toISOString()
            });

            alert("🎉 Congratulations! Course completed.");

        };

    } catch (error) {

        alert(error.message);

    }

});