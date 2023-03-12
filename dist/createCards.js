//--------------------------IMPORTS----------------------------
import { URL_ALL_PKM, fetchAllPkms } from './request.js';
//--------------------------CONSTANTES----------------------------
// on récupère la div "app" du document HTML
const app = document.querySelector('#app');
// ----------------------CLASS CARD--------------------------
export class PokemonCard {
    constructor(id, name, image, sprite, apiGeneration, stats, apiTypes) {
        this.id = id;
        this.name = name;
        this.image = image;
        this.sprite = sprite;
        this.apiGeneration = apiGeneration;
        this.stats = stats;
        this.apiTypes = apiTypes;
    }
    createCard() {
        // on crée une div
        let div = document.createElement('div');
        // qui aura la class "card"
        div.classList.add('card');
        // dans laquelle il y aura
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
        // puis on rajoute chaque div dans la div "app"
        app.append(div);
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
export function constructCards(data) {
    // pour chaque élément dans data
    for (let pkm of data) {
        let newCard = new PokemonCard(pkm.id, pkm.name, pkm.image, pkm.sprite, pkm.apiGeneration, pkm.stats, pkm.apiTypes);
        newCard.createCard();
    }
    return data;
}
//----------------------------USE FECTHES FUNCTIONS-------------------------------
fetchAllPkms(URL_ALL_PKM, constructCards);
//# sourceMappingURL=createCards.js.map