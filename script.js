const kartLists = {
    SODI_LIGHT: { list: [], drawn: [] },
    SODI_HEAVY: { list: [], drawn: [] },
    DMAX_LIGHT: { list: [], drawn: [] },
    DMAX_HEAVY: { list: [], drawn: [] }
};

let currentType = "SODI_LIGHT";
let tempList = [];

const sideInput = document.getElementById("sideInput");

sideInput.addEventListener("keypress", function (e) {
    if (e.key === "Enter") {
        addKart();
    }
});

function toggleMenu() {
    document.getElementById("sideMenu").classList.toggle("open");
}

function switchListType() {
    currentType = document.getElementById("listTypeSelect").value;
    tempList = [...kartLists[currentType].list];
    updateSideList();
}

function addKart() {
    const value = sideInput.value.trim();

    if (value === "") return;

    tempList.push(value);
    sideInput.value = "";
    updateSideList();
}

function updateSideList() {
    const sideList = document.getElementById("sideList");
    sideList.innerHTML = "";

    tempList.forEach((kart, index) => {
        const li = document.createElement("li");
        li.innerText = kart;

        li.onclick = () => {
            tempList.splice(index, 1);
            updateSideList();
        };

        sideList.appendChild(li);
    });
}

function applyList() {
    kartLists[currentType].list = [...tempList];
    kartLists[currentType].drawn = [];
    updateDisplay();
    toggleMenu();
}

function drawFromList(list, drawn) {
    const randomIndex = Math.floor(Math.random() * list.length);
    const drawnKart = list.splice(randomIndex, 1)[0];
    drawn.push(drawnKart);
    return drawnKart;
}

function generateRandomNumber(type) {
    const list = kartLists[type].list;

    if (list.length === 0) {
        alert(`No karts in ${type}`);
        return;
    }

    animateDraw(type);
}

function animateDraw(type) {
    const outputElement = document.getElementById("output");
    const list = kartLists[type].list;
    const drawn = kartLists[type].drawn;

    let iterations = 0;

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

function updateDisplay() {
    document.getElementById("listDisplay").innerText =
        `SODI LW: ${kartLists.SODI_LIGHT.list.join(", ")}
SODI HW: ${kartLists.SODI_HEAVY.list.join(", ")}
DMAX LW: ${kartLists.DMAX_LIGHT.list.join(", ")}
DMAX HW: ${kartLists.DMAX_HEAVY.list.join(", ")}`;

    document.getElementById("remainingCount").innerText =
        `SODI LW: ${kartLists.SODI_LIGHT.list.length}
SODI HW: ${kartLists.SODI_HEAVY.list.length}
DMAX LW: ${kartLists.DMAX_LIGHT.list.length}
DMAX HW: ${kartLists.DMAX_HEAVY.list.length}`;

    document.getElementById("drawnNumbers").innerText =
        `SODI LW: ${kartLists.SODI_LIGHT.drawn.join(", ")}
SODI HW: ${kartLists.SODI_HEAVY.drawn.join(", ")}
DMAX LW: ${kartLists.DMAX_LIGHT.drawn.join(", ")}
DMAX HW: ${kartLists.DMAX_HEAVY.drawn.join(", ")}`;
}

function clearAll() {
    for (const key in kartLists) {
        kartLists[key].list = [];
        kartLists[key].drawn = [];
    }

    tempList = [];
    updateSideList();
    updateDisplay();

    document.getElementById("output").innerText = "Kart Number:";
}

updateDisplay();