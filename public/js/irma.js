// unser Irma.html Element fangen
// elemente definieren
import { loadSpieler, deleteSpieler } from "./FEServices.js";
// Für Fehler und Informationen
const messageFenster = document.getElementById("messages");
const messages = document.getElementById("messages");
messages.innerHTML = "<p>Bootstrap installiert und in public kopiert</p>" +
    "<p>Darstellung der Daten in Tabelle mit Del Funktion</p>" +
    "<p>Verschiebe del Eventlistener von tr nach td</p>" +
    "<p>offen: Message Fenster, Formular und Post</p>" +
    "<p>offen: lokales Del durch ID route ersetzen</p>";
const btnLoadSpieler = document.getElementById("btnLoadSpieler");
// fetch zum Backend machen und die Spieler holen
btnLoadSpieler.addEventListener("click", async () => {
    const spieler = await loadSpieler();
    console.log(spieler);
    anzeigeSpielerAlsTabelle(spieler);
});
const anzeigeSpielerAlsTabelle = (spieler) => {
    const output = document.getElementById('output');
    output.innerHTML = `
        <table class="table table-striped">
            <thead>
                <tr>
                    <th>ID</th>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Delete lokal</th>
                    <th>Delete über Route</th>
                    <th>Ändern Spieler über Route</th>
                </tr>
            </thead>
            <tbody id="table-body"></tbody>
        </table>
    `;
    const tbody = document.getElementById("table-body");
    spieler.forEach(sp => {
        const tr = document.createElement("tr");
        tr.id = `${sp.id}`;
        let td = document.createElement("td");
        td.textContent = `${sp.id}`;
        tr.append(td);
        td = document.createElement("td");
        td.textContent = sp.firstname;
        tr.append(td);
        td = document.createElement("td");
        td.textContent = sp.lastname;
        tr.append(td);
        td = document.createElement("td");
        td.textContent = `❌`;
        td.addEventListener("click", () => {
            console.log("aus der Tabelle");
            del(sp.id, spieler);
        });
        tr.append(td);
        td = document.createElement("td");
        td.textContent = `❌ Route`;
        td.addEventListener("click", () => {
            console.log("aus der Tabelle");
            delMitRoute(sp.id, spieler);
        });
        tr.append(td);
        // Ändern über Route
        tr.append(td);
        td = document.createElement("td");
        td.textContent = `Ändern Spieler ✏️`;
        td.addEventListener("click", () => {
            console.log("aus der Tabelle Spielerändern");
        });
        tr.append(td);
        tbody.append(tr);
    });
};
const anzeigeSpieler = (spieler) => {
    const output = document.getElementById("output");
    if (!output) {
        return;
    }
    output.innerHTML = "";
    const ul = document.createElement('ul');
    spieler.forEach((sp) => {
        const li = document.createElement('li');
        li.textContent = `spieler${sp.id} ${sp.lastname}`;
        li.addEventListener("click", () => {
            delListe(sp.id, spieler);
        });
        ul.appendChild(li);
    });
    output.appendChild(ul);
};
const del = (id, spieler) => {
    const newSpieler = spieler.filter((sp) => {
        return sp.id != id;
    });
    anzeigeSpielerAlsTabelle(newSpieler);
};
const delListe = (id, spieler) => {
    const newSpieler = spieler.filter((sp) => {
        return sp.id != id;
    });
    anzeigeSpieler(newSpieler);
};
const delMitRoute = async (id, spieler) => {
    const messageFenster = document.getElementById("messages");
    try {
        const answerDel = await deleteSpieler(id);
        console.log(answerDel);
        const spieler = await loadSpieler();
        console.log(spieler);
        anzeigeSpielerAlsTabelle(spieler);
    }
    catch (e) {
    }
};
const btnchangeSpieler = document.querySelector('#btnChangeSpieler');
btnchangeSpieler.addEventListener("click", () => {
});
const form = document.getElementById("spielerForm");
const statusEl = document.getElementById("status");
let spielerId = 0;
const spielerFirstnameInput = document.getElementById("firstName");
const spielerLastnameInput = document.getElementById("lastName");
const clubInput = document.getElementById("club");
const ageInput = document.getElementById("age");
const countryInput = document.getElementById("country");
const btnPost = document.getElementById("btnPost");
// Post
// Formulardaten einlesen (früher)
// Daten mit eventlistener übernehmen beim Buttonpress übernehmen
// preventDefault
// Validieren
// Spieleranlegen
// RefreshPlayer
btnPost.addEventListener("click", async (e) => {
    e.preventDefault();
});
// Ausgeben der Spieler Daten über die getRoute, die über die FEService aufgerufen wird
async function refreshPlayers() {
}
// Spieler ändern über Klick auf Bleistift
const btnPut = document.getElementById("btnPut");
const patchMitRoute = async (id, spieler) => {
};
// Daten des ausgewählten Spielers werden in die Form zum Ändern übernommen
const anzeigenSpielerinForm = (einzelSp) => {
    // Form freischalten
};
// mit Press auf dem Put Button werden Daten dann übernommen und über die FEService gepatched
//und über REfreshplayer wieder aktualisiert geladen
btnPut.addEventListener("click", async (e) => {
    // form soll nicht gelöscht werden
    e.preventDefault();
    console.log("check bin hier im Form für Patch");
    // 1) Werte aus dem DOM lesen
    const einzelSp = {
        id: spielerId,
        age: parseInt(ageInput.value),
        firstname: spielerFirstnameInput.value.trim(),
        lastname: spielerLastnameInput.value.trim(),
        country: countryInput.value.trim(),
        club: clubInput.value.trim()
    };
});
