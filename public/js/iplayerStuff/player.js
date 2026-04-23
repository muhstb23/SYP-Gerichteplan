// unser Irma.html Element fangen
const btnLoadAll = document.getElementById("btnLoadAll");
// fetch zum Backend machen und die Spieler holen
btnLoadAll.addEventListener("click", async () => {
    const spieler = await loadSpieler();
    console.log(spieler);
    anzeigeSpieler(spieler);
});
const loadSpieler = async () => {
    try {
        const response = await fetch("http://localhost:3000/api/players");
        console.log(response.status);
        // auch die Wandlung zu Json kann lange dauern → await
        const spieler = await response.json();
        return spieler;
    }
    catch (err) {
        const error = err;
        console.log(error.message);
        return [];
    }
};
// im Output Div die Spieler anzeigen
const anzeigeSpieler = (spieler) => {
    const output = document.getElementById("output");
    if (!output) {
        return;
    }
    output.innerHTML = "";
    const ul = document.createElement('ul');
    spieler.forEach((sp) => {
        const li = document.createElement('li');
        li.textContent = `${sp.id} ${sp.lastname}`;
        li.addEventListener("click", () => {
            del(sp.id, spieler);
        });
        ul.appendChild(li);
    });
    output.appendChild(ul);
};
const del = (id, spieler) => {
    const newSpieler = spieler.filter((sp) => {
        return sp.id != id;
    });
    anzeigeSpieler(newSpieler);
};
export {};
