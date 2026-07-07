const button = document.getElementById("checkSymptoms");
const result = document.getElementById("result");

button.addEventListener("click", () => {

    const age = document.getElementById("age").value;
    const gender = document.getElementById("gender").value;
    const symptoms = document.getElementById("symptoms").value.toLowerCase();

    if (age === "" || gender === "" || symptoms === "") {
        alert("Please complete all fields.");
        return;
    }

    let output = "";

    if (symptoms.includes("fever")) {

        output += `
        <h3>Possible Causes</h3>
        <ul>
            <li>Malaria</li>
            <li>Typhoid Fever</li>
            <li>Viral Infection</li>
        </ul>
        `;

    }

    if (symptoms.includes("cough")) {

        output += `
        <h3>Possible Causes</h3>
        <ul>
            <li>Common Cold</li>
            <li>Flu</li>
            <li>Chest Infection</li>
        </ul>
        `;

    }

    if (symptoms.includes("headache")) {

        output += `
        <h3>Possible Causes</h3>
        <ul>
            <li>Stress</li>
            <li>Migraine</li>
            <li>High Fever</li>
        </ul>
        `;

    }

    if (symptoms.includes("stomach")) {

        output += `
        <h3>Possible Causes</h3>
        <ul>
            <li>Gastritis</li>
            <li>Food Poisoning</li>
            <li>Ulcer</li>
        </ul>
        `;

    }

    if (output === "") {

        output = `
        <h3>No match found.</h3>
        <p>Please consult a healthcare professional for further assessment.</p>
        `;

    }

    output += `

    <hr>

    <h3>Self Care</h3>

    <ul>

    <li>Drink plenty of water.</li>

    <li>Get enough rest.</li>

    <li>Eat healthy meals.</li>

    <li>Take medicines only as directed by a healthcare professional.</li>

    </ul>

    <hr>

    <h3>Seek urgent medical care immediately if you have:</h3>

    <ul>

    <li>Difficulty breathing.</li>

    <li>Chest pain.</li>

    <li>Severe bleeding.</li>

    <li>Loss of consciousness.</li>

    <li>Convulsions.</li>

    </ul>

    <p><strong>Disclaimer:</strong> This AI provides health education only. It is not a medical diagnosis. Please consult a qualified healthcare professional for proper evaluation and treatment.</p>

    `;

    result.innerHTML = output;

});