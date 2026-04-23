export const loadSpieler = async () => {
    console.log('FEServices loaded');
    try {
        const response = await fetch('http://localhost:3000/api/players');
        console.log(response.status);
        const spieler = await response.json();
        console.log(spieler);
        return spieler;
    }
    catch (e) {
        let err = e;
        console.log(`FEServices error: ${err.message}`);
    }
};
export async function spielerAnlegen(spieler) {
    try {
        console.log(JSON.stringify(spieler));
        const res = await fetch("http://localhost:3000/api/players", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(spieler),
        });
        if (!res.ok) {
            const msg = await res.text().catch(() => "");
            throw new Error(msg || "Fehler beim Speichern");
        }
        const antwort = await res.json();
        console.log(antwort.id);
        return antwort;
    }
    catch (err) {
        const error = err;
        return error.message;
    }
}
export async function spielerPatch(einzelSp, id) {
    try {
        console.log(JSON.stringify(einzelSp));
        const res = await fetch(`http://localhost:3000/api/players/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(einzelSp),
        });
        if (!res.ok) {
            const msg = await res.text().catch(() => "");
            throw new Error(msg || "Fehler beim Speichern");
        }
        const antwort = await res.json();
        console.log(antwort.id);
        return antwort;
    }
    catch (err) {
        const error = err;
        return error.message;
    }
}
const deleteSpieler1 = async (id) => {
    try {
        const res = await fetch(`http://localhost:3000/api/players/${id}`, {
            method: "DELETE"
        });
        if (!res.ok) {
            throw new Error(("Löschen war nicht erfolgreich"));
        }
        return "Löschen war erfolgreich";
    }
    catch (e) {
        let err = e;
        return err.message;
    }
};
export const deleteSpieler = async (id) => {
    console.log(`FEServices Deletespieler mit ${id} loaded`);
    try {
        const res = await fetch(`http://localhost:3000/api/players/${id}`, {
            method: "DELETE"
        });
        console.log(res.status);
        if (!res.ok) {
            throw new Error("Löschen fehlgeschlagen");
        }
        return "Löschen war erfolgreich";
    }
    catch (e) {
        let err = e;
        console.log(`FEServices error: ${err.message}`);
        return err.message;
    }
};
