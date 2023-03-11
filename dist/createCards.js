//--------------------------IMPORTS----------------------------
import { URL_ALL_PKM, fetchIt } from './request.js';
//--------------------------CONSTANTES----------------------------
// on récupère la div "app" du document HTML
const app = document.querySelector('#app');
// TODO: Est-ce pertinant de créer une interface pour les Cards?
// interface Card {
//     name: string,
//     sprite: string,
//     gen: number
// }
//----------------------------FONCTIONS CALLBACK-------------------------------
/**
 *
 * @param datas prends un paramètre du type Datas ---> interface Datas
 *
 * crée une carte dans le DOM pour chaque élément dans datas
 * @returns
 */
function constructCards(datas) {
    // pour chaque élément dans datas
    for (let pkm of datas) {
        // on crée une div
        let div = document.createElement('div');
        // qui aura la class "card"
        div.classList.add('card');
        // dans laquelle il y aura
        div.innerHTML = `
        <h2 class="card-gen">Gen : ${pkm.apiGeneration}</h2>
        <img src="${pkm.sprite}" class="card-img">
        <span class="card-name">${pkm.name}</span>
        <div class="card-stats">
            <span class="card-stat">HP : ${pkm.stats.HP}</span>
            <span class="card-stat">Att : ${pkm.stats.attack}</span>
            <span class="card-stat">Def : ${pkm.stats.defense}</span>
            <span class="card-stat"> Att.Spé : ${pkm.stats.special_attack}</span>
            <span class="card-stat">Def.Spé : ${pkm.stats.special_defense}</span>
            <span class="card-stat">Vit : ${pkm.stats.speed}</span>
        </div>
        `;
        console.log(pkm.apiTypes[0].name, pkm.apiTypes[1] ? pkm.apiTypes[1].name : "");
        // puis on rajoute chaque div dans la div "app"
        app.append(div);
    }
    return datas;
}
//----------------------------USE FECTHES FUNCTIONS-------------------------------
fetchIt(URL_ALL_PKM, constructCards);
//# sourceMappingURL=createCards.js.map