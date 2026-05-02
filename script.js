let sodiList = [];
let sodiDrawn = [];

let dmaxList = [];
let dmaxDrawn = [];

let tempList = [];
let currentType = "SODI";

// TOGGLE MENU
function toggleMenu() {
    document.getElementById("sideMenu").classList.toggle("open");
}

// SWITCH LIST TYPE
function switchListType() {
    currentType = document.getElementById("listTypeSelect").value;
    tempList = [];
    updateSideList();
}

// ADD NUMBER ON ENTER
document.getElementById("sideInput").addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        const value = this.value.trim();
        if (value === "") return;

        if (tempList.includes(value)) {
            alert("Kart already added!");
            return;
        }

        tempList.push(value);
        updateSideList();
        this.value = "";
        this.blur();
    }
});

// UPDATE SIDE LIST
function updateSideList() {
    const list = document.getElementById("sideList");
    list.innerHTML = "";

    tempList.forEach((num, index) => {
        const li = document.createElement("li");
        li.textContent = num;

        li.onclick = () => {
            tempList.splice(index, 1);
            updateSideList();
        };

        list.appendChild(li);
    });
}

// APPLY LIST
function applyList() {
    if (tempList.length === 0) {
        alert("Add at least one kart.");
        return;
    }

    if (currentType === "SODI") {
        sodiList = [...tempList];
        sodiDrawn = [];
    } else {
        dmaxList = [...tempList];
        dmaxDrawn = [];
    }

    updateDisplay();
    toggleMenu();
}

// DRAW
function generateRandomNumber(type) {
    let list = type === "SODI" ? sodiList : dmaxList;
    if (list.length === 0) {
        alert(`No karts in ${type} list.`);
        return;
    }

    animateDraw(type);
}

// ANIMATION
function animateDraw(type) {
    const outputElement = document.getElementById("output");
    let iterations = 0;

    let list = type === "SODI" ? sodiList : dmaxList;
    let drawn = type === "SODI" ? sodiDrawn : dmaxDrawn;

    const interval = setInterval(() => {
        const temp = list[Math.floor(Math.random() * list.length)];
        outputElement.innerText = `Kart: ${temp}`;
        iterations++;

        if (iterations >= 20) {
            clearInterval(interval);
            const final = drawFromList(list, drawn);
            outputElement.innerText = `Kart: ${final}`;
            updateDisplay();
        }
    }, 100);
}

// DRAW FROM LIST
function drawFromList(list, drawnList) {
    const index = Math.floor(Math.random() * list.length);
    const number = list[index];

    list.splice(index, 1);
    drawnList.push(number);

    return number;
}

// UPDATE DISPLAY
function updateDisplay() {
    document.getElementById("listDisplay").innerText =
        `List 1: ${sodiList.join(", ")} | List 2: ${dmaxList.join(", ")}`;

    document.getElementById("remainingCount").innerText =
        `List 1 Remaining: ${sodiList.length} | List 2 Remaining: ${dmaxList.length}`;

    document.getElementById("drawnNumbers").innerText =
        `List 1: ${sodiDrawn.join(", ")} | List 2: ${dmaxDrawn.join(", ")}`;

    if (sodiList.length === 0 && dmaxList.length === 0) {
        document.getElementById("remainingCount").innerText = "All karts drawn!";
        document.getElementById("output").innerText = "Kart Number: None";
    }
}

// CLEAR
function clearAll() {
    const password = prompt("Enter password to clear data:");

    if (password === "Sandown2024") {
        if (confirm("Are you sure?")) {
            sodiList = [];
            sodiDrawn = [];
            dmaxList = [];
            dmaxDrawn = [];
            tempList = [];

            document.getElementById("sideList").innerHTML = "";
            document.getElementById("output").innerText = "Kart Number:";
            document.getElementById("listDisplay").innerText = "Your List:";
            document.getElementById("remainingCount").innerText = "Karts left to draw:";
            document.getElementById("drawnNumbers").innerText = "";
        }
    } else {
        alert("Incorrect password.");
    }
}