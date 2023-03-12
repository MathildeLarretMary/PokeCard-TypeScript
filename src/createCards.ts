//--------------------------IMPORTS----------------------------
import { createOneCard } from './navSearch.js';
import { URL_ALL_PKM, fetchAllPkms, Data, fetchOnePkm } from './request.js';

//--------------------------CONSTANTES----------------------------
// on récupère la div "app" du document HTML
const app = document.querySelector('#app')! as HTMLDivElement

// ----------------------CLASS CARD--------------------------
export class PokemonCard {
    constructor (
        private id:number,
        private name:string,
        private image: string,
        private sprite: string,
        private apiGeneration:number,
        private stats : {
            HP:number,
            attack:number,
            defense:number,
            special_attack:number,
            special_defense:number,
            speed:number
        },
        private apiTypes: [{name:string}, {name?:string}]
    ) {}

    createCard() {
        // on crée une div
        let div = document.createElement('div') as HTMLDivElement
        // qui aura la class "card"
        div.classList.add('card')
        // dans laquelle il y aura
        div.innerHTML = `
        <h2 class="card-gen">Gen : ${this.apiGeneration}</h2>
        <img src="${this.sprite}" class="card-img">
        <span class="card-name">${this.name}</span>
        <button class="more">+</button>
        <div class="card-stats">
            <span class="card-stat">HP : ${this.stats.HP}</span>
            <span class="card-stat">Att : ${this.stats.attack}</span>
            <span class="card-stat">Def : ${this.stats.defense}</span>
            <span class="card-stat"> Att.Spé : ${this.stats.special_attack}</span>
            <span class="card-stat">Def.Spé : ${this.stats.special_defense}</span>
            <span class="card-stat">Vit : ${this.stats.speed}</span>
        </div>
        `;
        //console.log(pkm.apiTypes[0].name, pkm.apiTypes[1] ? pkm.apiTypes[1].name : "");
        
        // let moreBtn = document.querySelector('.more')! as HTMLButtonElement
        // moreBtn?.addEventListener('click', () => {
        //     //ça fait beaucoup là non?
        //     // fetchOnePkm(URL_ALL_PKM, createOneCard, this.id)
        // })
        // puis on rajoute chaque div dans la div "app"
        app.append(div)
    }

    createModale() {

        let div = document.createElement('div') as HTMLDivElement
        let divApp = document.createElement('div') as HTMLDivElement
        let closeBtn = document.createElement('button')! as HTMLButtonElement

        divApp.classList.add('modale')
        div.classList.add('card')
        div.classList.add('card-modale')
        closeBtn.classList.add('close-modale')
        closeBtn.textContent = "X"

        div.innerHTML = `
        <h2 class="card-gen">Gen : ${this.apiGeneration}</h2>
        <img src="${this.sprite}" class="card-img">
        <span class="card-name">${this.name}</span>
        <div class="card-stats">
            <span class="card-stat">HP : ${this.stats.HP}</span>
            <span class="card-stat">Att : ${this.stats.attack}</span>
            <span class="card-stat">Def : ${this.stats.defense}</span>
            <span class="card-stat"> Att.Spé : ${this.stats.special_attack}</span>
            <span class="card-stat">Def.Spé : ${this.stats.special_defense}</span>
            <span class="card-stat">Vit : ${this.stats.speed}</span>
        </div>
        `;
        //console.log(pkm.apiTypes[0].name, pkm.apiTypes[1] ? pkm.apiTypes[1].name : "");
        
        closeBtn.addEventListener('click', () => {
            app.removeChild(divApp)
        })
        // puis on rajoute chaque div dans la div "app"
        divApp.append(closeBtn)
        divApp.append(div)
        app.append(divApp)
    }
}

//----------------------------FONCTIONS CALLBACK-------------------------------
/**
 * 
 * @param datas prends un paramètre du type Datas ---> interface Datas
 * 
 * crée une carte dans le DOM pour chaque élément dans datas
 * @returns 
 */
export function constructCards(data : Data[]) : Data[] {
    // pour chaque élément dans data
    for(let pkm of data) {
        let newCard = new PokemonCard(pkm.id, pkm.name, pkm.image, pkm.sprite, pkm.apiGeneration, pkm.stats, pkm.apiTypes)
        newCard.createCard()
    }
    return data
}

//----------------------------USE FECTHES FUNCTIONS-------------------------------
fetchAllPkms(URL_ALL_PKM, constructCards)