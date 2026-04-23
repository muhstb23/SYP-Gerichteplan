//import {IPlayer} from "./models";
// unser Irma.html Element fangen

// elemente definieren
import {loadSpieler, spielerAnlegen, deleteSpieler, spielerPatch} from "./FEServices";

// Für Fehler und Informationen
const messageFenster = document.getElementById("messages") as HTMLDivElement;

const messages = document.getElementById("messages")as HTMLDivElement;
messages.innerHTML = "<p>Bootstrap installiert und in public kopiert</p>" +
    "<p>Darstellung der Daten in Tabelle mit Del Funktion</p>"+
    "<p>Verschiebe del Eventlistener von tr nach td</p>" +
    "<p>offen: Message Fenster, Formular und Post</p>" +
    "<p>offen: lokales Del durch ID route ersetzen</p>";

const btnLoadSpieler = document.getElementById("btnLoadSpieler") as HTMLButtonElement;

// fetch zum Backend machen und die Spieler holen

btnLoadSpieler.addEventListener("click", async () => {
    const spieler:IPlayer[] =  await loadSpieler();
    console.log(spieler);
    anzeigeSpielerAlsTabelle(spieler);
})

const anzeigeSpielerAlsTabelle = (spieler:IPlayer[]) => {
    const output  = document.getElementById('output') as HTMLDivElement;
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

    const tbody = document.getElementById("table-body") as HTMLTableSectionElement;

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
            patchMitRoute(sp.id, spieler);
        });
        tr.append(td);

        tbody.append(tr);
    });
}

const anzeigeSpieler = (spieler: IPlayer[]) => {
    const output = document.getElementById("output") as HTMLDivElement;
    if(!output) {
        return;
    }

    output.innerHTML = "";

    const ul = document.createElement('ul');
    spieler.forEach((sp:IPlayer) => {
        const li = document.createElement('li');
        li.textContent = `spieler${sp.id} ${sp.lastname}`;

        li.addEventListener("click", () => {
            delListe(sp.id, spieler);
        })
        ul.appendChild(li);

    })

    output.appendChild(ul);
}

const del = (id:number, spieler:IPlayer[])=> {
    const newSpieler:IPlayer[] = spieler.filter((sp) => {
        return sp.id != id;
    })

    anzeigeSpielerAlsTabelle(newSpieler);
}

const delListe = (id:number, spieler:IPlayer[])=> {
    const newSpieler:IPlayer[] = spieler.filter((sp) => {
        return sp.id != id;
    })

    anzeigeSpieler(newSpieler);
}

const delMitRoute = async(id:number, spieler:IPlayer[]) => {
    const messageFenster = document.getElementById("messages") as HTMLDivElement;
    console.log("delMitRoute id: " + id);
    try {
        const answerDel:string = await deleteSpieler(id);
        console.log(answerDel);
        const spieler = await loadSpieler();
        console.log(spieler);
        anzeigeSpielerAlsTabelle(spieler);
    } catch (e) {

    }
}

// Spielerliste ändern Button
// Button muss d-block gesetzt werden

// Spielerliste ändern Button
// Button muss d-block gesetzt werden
const btnchangeSpieler = document.querySelector('#btnChangeSpieler') as HTMLButtonElement;

btnchangeSpieler.addEventListener("click", () => {
    console.log("Button geklickt");
    // Form Anzeigen
    const form = document.getElementById("spielerForm") as HTMLFormElement;
    form.className = "d-block"

});





// form Elemente außerhalb definieren
// können dann in mehreren Funktionen genutzt werden

const form = document.getElementById("spielerForm") as HTMLFormElement;
const statusEl = document.getElementById("messages") as HTMLDivElement;

let spielerId = 0;
const spielerFirstnameInput = document.getElementById("firstName") as HTMLInputElement;

const spielerLastnameInput = document.getElementById("lastName") as HTMLInputElement;

const clubInput = document.getElementById("club") as HTMLInputElement;

const ageInput = document.getElementById("age") as HTMLInputElement;

const countryInput = document.getElementById("country") as HTMLInputElement;

const btnPost =   document.getElementById("btnPost") as HTMLButtonElement;

// Post
// Formulardaten einlesen (früher)
// Daten mit eventlistener übernehmen beim Buttonpress übernehmen
// preventDefault
// Validieren
// Spieleranlegen
// RefreshPlayer

btnPost.addEventListener("click", async (e) => {
    e.preventDefault();
    console.log("bin hier im Form");
    // 1) Werte aus dem DOM lesen

    const spieler: IPlayer = {
        id: 1,
        age: parseInt(ageInput.value),
        firstname: spielerFirstnameInput.value.trim(),
        lastname: spielerLastnameInput.value.trim(),
        country: countryInput.value.trim(),
        club: clubInput.value.trim()
    };

    console.log(spieler);

    // 2) Mini-Validierung (zusätzlich zu required) mit trim() nimmt er die Leerzeichen raus
    if (!spieler.lastname || !spieler.club) {
        statusEl.textContent = "Bitte alle Felder korrekt ausfüllen.";
        return;
    }

    // 3) an Methode übergeben

    console.log("bin hier im try ...");
    const res:IPlayer|string = await spielerAnlegen(spieler);
    if (typeof res == "string")
        statusEl.textContent = `✅ ${res}`;

    else
        statusEl.textContent = `✅ Spieler mit ${res.firstname} und id= ${res.id} gespeichert!`;

    // optional: Formular leeren
    form.reset();

    await refreshPlayers();

});
// Ausgeben der Spieler Daten über die getRoute, die über die FEService aufgerufen wird

async function refreshPlayers() {
    console.log("refreshPlayers() gestartet");
    try {
        const players = await loadSpieler();
        console.log("players geladen:", players);
        anzeigeSpielerAlsTabelle(players);
        //anzeigenSpieler(players);
        console.log("Tabelle neu gerendert");
    } catch (err) {
        console.error("Fehler beim Neuladen:", err);
        statusEl.textContent = "❌ Fehler beim Neuladen der Spieler.";
    }
}

// Spieler ändern über Klick auf Bleistift



const btnPut =   document.getElementById("btnPut") as HTMLButtonElement;


const patchMitRoute = async(id:number, spieler: IPlayer[])=>{
    // Formular öffnen
    // Form Anzeigen


    // Anzeigen des Spielers im Form Über Id
    // Spielerdaten mit id holen
    try {
        const res = await fetch (`http://localhost:3000/api/players/${id}`);
        console.log(res.status);
        const einzelSp = await res.json();
        console.log(einzelSp);
        if (!res.ok) {
            new Error(einzelSp.message);
        }
        // Anzeigen im Formular
        anzeigenSpielerinForm(einzelSp);
    }
    catch (err) {
        const error:Error = err as Error;
        messageFenster.innerHTML += `<p>${error.message}</p>`;
    }
} ;

// Daten des ausgewählten Spielers werden in die Form zum Ändern übernommen

const anzeigenSpielerinForm = (einzelSp:IPlayer) => {
    // Form freischalten

    form.className = "d-block";
    // Form füllen

    spielerId = einzelSp.id;
    spielerFirstnameInput.value = einzelSp.firstname;

    spielerLastnameInput.value = einzelSp.lastname;

    clubInput.value = einzelSp.club;

    ageInput.value = einzelSp.age.toString();

    countryInput.value =einzelSp.country;

};

// mit Press auf dem Put Button werden Daten dann übernommen und über die FEService gepatched
//und über REfreshplayer wieder aktualisiert geladen

btnPut.addEventListener("click" , async(e) => {
    // form soll nicht gelöscht werden
    e.preventDefault();
    console.log("check bin hier im Form für Patch");
    // 1) Werte aus dem DOM lesen

    const einzelSp: IPlayer = {
        id: spielerId,
        age: parseInt(ageInput.value),
        firstname: spielerFirstnameInput.value.trim(),
        lastname: spielerLastnameInput.value.trim(),
        country: countryInput.value.trim(),
        club: clubInput.value.trim()
    };

    console.log(einzelSp);

    // 2) Mini-Validierung (zusätzlich zu required) mit trim() nimmt er die Leerzeichen raus
    // würde ich bei Patch weglassen

    // 3) an Methode übergeben

    const res:IPlayer|string = await spielerPatch(einzelSp, spielerId);
    if (typeof res == "string")
        messageFenster.innerHTML = `❌ ${res}`;

    else
        messageFenster.innerHTML = `✅ Spieler mit ${res.firstname} und id= ${res.id} gespeichert!`;

    // optional: Formular leeren
    form.reset();

    // aktualisierte Spieler werden geholt, haben wir schon bei Post verwendet
    refreshPlayers();


});

