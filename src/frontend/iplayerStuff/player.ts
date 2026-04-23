import {IPlayer} from "../models";

// unser Irma.html Element fangen
const btnLoadAll = document.getElementById("btnLoadAll") as HTMLButtonElement;

// fetch zum Backend machen und die Spieler holen

btnLoadAll.addEventListener("click", async () => {
    const spieler:IPlayer[] =  await loadSpieler();
    console.log(spieler);
    anzeigeSpieler(spieler);
})

const loadSpieler = async ():Promise<IPlayer[]> => {
    try {
        const response = await fetch("http://localhost:3000/api/players");
        console.log(response.status);
        // auch die Wandlung zu Json kann lange dauern → await
        const spieler:IPlayer[] = await response.json();
        return spieler;
    } catch (err) {
        const error = err as Error;
        console.log(error.message);
        return [];
    }
};

// im Output Div die Spieler anzeigen

const anzeigeSpieler = (spieler: IPlayer[]) => {
    const output = document.getElementById("output") as HTMLDivElement;
    if(!output) {
        return;
    }

    output.innerHTML = "";

    const ul = document.createElement('ul');
    spieler.forEach((sp:IPlayer) => {
        const li = document.createElement('li');
        li.textContent = `${sp.id} ${sp.lastname}`;

        li.addEventListener("click", () => {
            del(sp.id, spieler);
        })
        ul.appendChild(li);

    })

    output.appendChild(ul);
}

const del = (id:number, spieler:IPlayer[])=> {
    const newSpieler:IPlayer[] = spieler.filter((sp) =>{
        return sp.id != id;
    })

    anzeigeSpieler(newSpieler);
}