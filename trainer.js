let trainers = JSON.parse(localStorage.getItem("trainerData")) || [];

// ------------------------------
// Save trainers to localStorage
// ------------------------------
function saveTrainers() {
    localStorage.setItem("trainerData", JSON.stringify(trainers));
}

// ------------------------------
// Display trainers on screen
// ------------------------------
function loadTrainers() {
    const list = document.getElementById("trainerList");
    list.innerHTML = ""; // clear previous content

    trainers.forEach((t, index) => {
        const li = document.createElement("li");

        // Trainer text
        const text = document.createElement("span");
        text.textContent = `${t.name} — ${t.social} — ${t.availability} — ${t.costs}`;

        // Delete button
        const delBtn = document.createElement("button");
        delBtn.textContent = "Delete";
        delBtn.classList.add("delete-btn");

        // When clicked → delete trainer
        delBtn.addEventListener("click", () => {
            trainers.splice(index, 1); // remove from array
            saveTrainers();            // update localStorage
            loadTrainers();            // refresh UI
        });

        li.appendChild(text);
        li.appendChild(delBtn);
        list.appendChild(li);
    });
}

// Run display function once page loads
loadTrainers();

// ------------------------------
// Handle APPLY button click
// ------------------------------
document.getElementById("applyBtn").addEventListener("click", function () {

    const name = document.getElementById("nameInput").value;
    const social = document.getElementById("socialInput").value;
    const availability = document.getElementById("availabilityInput").value;
    const costs = document.getElementById("costsInput").value;

    if (!name || !social || !availability || !costs) {
        alert("Please fill out all fields.");
        return;
    }

    // Create trainer object
    const trainer = {
        name: name,
        social: social,
        availability: availability,
        costs: costs
    };

    // Add to list
    trainers.push(trainer);

    // Save updated list
    saveTrainers();

    // Refresh UI
    loadTrainers();

    // Clear form
    document.getElementById("nameInput").value = "";
    document.getElementById("socialInput").value = "";
    document.getElementById("availabilityInput").value = "";
    document.getElementById("costsInput").value = "";
});