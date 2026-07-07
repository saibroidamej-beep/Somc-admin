import {
    auth,
    db,
    onAuthStateChanged,
    collection,
    getDocs,
    doc,
    setDoc,
    getDoc
} from "./firebase.js";

const studentCourses = document.getElementById("studentCourses");

onAuthStateChanged(auth, async (user) => {

    if (!user) {
        window.location.href = "index.html";
        return;
    }

    loadCourses(user);

});

async function loadCourses(user) {

    studentCourses.innerHTML = "";

    try {

        const snapshot = await getDocs(collection(db, "courses"));

        if (snapshot.empty) {

            studentCourses.innerHTML = "<h2>No courses available.</h2>";
            return;

        }

        snapshot.forEach((courseDoc) => {

            const course = courseDoc.data();

            studentCourses.innerHTML += `

            <div class="card">

                <img src="${course.courseImage || 'images/no-image.png'}"
                style="width:100%;height:180px;object-fit:cover;border-radius:10px;">

                <h2>${course.courseTitle}</h2>

                <p><strong>Instructor:</strong> ${course.instructor}</p>

                <p>${course.description}</p>

                <button onclick="window.location.href='course.html?id=${course.courseId}'">
    Open Course
</button>

            </div>

            `;

        });

        window.enrollCourse = async function(courseId){

            try{

                const courseRef = doc(db,"courses",courseId);
                const courseSnap = await getDoc(courseRef);

                if(!courseSnap.exists()){
                    alert("Course not found.");
                    return;
                }

                const course = courseSnap.data();

                await setDoc(doc(db,"enrollments",user.uid+"_"+courseId),{

                    userId:user.uid,
                    courseId:courseId,
                    courseTitle:course.courseTitle,
                    enrolledAt:new Date().toISOString(),
                    progress:0,
                    completed:false,
                    certificateIssued:false

                });

                alert("Successfully enrolled!");

            }catch(error){

                alert(error.message);

            }

        };

    } catch (error) {

        alert(error.message);

    }

}