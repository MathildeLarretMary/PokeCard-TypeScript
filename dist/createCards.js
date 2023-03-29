"use strict";
// //--------------------------IMPORTS----------------------------
// import { URL_ALL_PKM, fetchAllPkms, Data, fetchOnePkm } from './request.js';
// //--------------------------CONSTANTES----------------------------
// // on récupère la div "app" du document HTML
// const app = document.querySelector('#app')! as HTMLDivElement
// // ----------------------CLASS CARD--------------------------
// export class PokemonCard {
//     constructor (
//         private id:number,
//         private name:string,
//         private image: string,
//         private sprite: string,
//         private apiGeneration:number,
//         private stats : {
//             HP:number,
//             attack:number,
//             defense:number,
//             special_attack:number,
//             special_defense:number,
//             speed:number
//         },
//         private apiTypes: [{name:string}, {name?:string}],
//         private apiResistances: [{[props:string] : string | number}]
//     ) {}
//     createCard() {
//         // on crée une div
//         let div = document.createElement('div') as HTMLDivElement
//         // qui aura la class "card"
//         div.classList.add('card')
//         // dans laquelle il y aura
//         div.innerHTML = `
//         <h2 class="card-gen">Gen : ${this.apiGeneration}</h2>
//         <img src="${this.sprite}" class="card-img">
//         <span class="card-name">${this.name}</span>
//         <button value = "${this.id}" class="more">+</button>
//         <div class="card-stats">
//             <span class="card-stat">HP : ${this.stats.HP}</span>
//             <span class="card-stat">Att : ${this.stats.attack}</span>
//             <span class="card-stat">Def : ${this.stats.defense}</span>
//             <span class="card-stat"> Att.Spé : ${this.stats.special_attack}</span>
//             <span class="card-stat">Def.Spé : ${this.stats.special_defense}</span>
//             <span class="card-stat">Vit : ${this.stats.speed}</span>
//         </div>
//         `;
//         let moreInfoBtn = div.querySelector('button')! as HTMLButtonElement
//         moreInfoBtn!.onclick = function() {
//             fetchOnePkm(URL_ALL_PKM, createOneCard, +moreInfoBtn.value)
//         }
//         // //console.log(pkm.apiTypes[0].name, pkm.apiTypes[1] ? pkm.apiTypes[1].name : "");
//         // // puis on rajoute chaque div dans la div "app"
//         app.append(div)
//     }
//     createModale() {
//         let div = document.createElement('div') as HTMLDivElement
//         let divApp = document.createElement('div') as HTMLDivElement
//         let closeBtn = document.createElement('button')! as HTMLButtonElement
//         let divResists = document.createElement('div')! as HTMLDivElement
//         let divCardStats = document.createElement('div')! as HTMLDivElement
//         divApp.classList.add('modale')
//         divResists.classList.add('card','card-modale', 'resist-card')
//         divCardStats.classList.add('card-stats-restist')
//         divResists.append(divCardStats)
//         div.classList.add('card')
//         div.classList.add('card-modale')
//         closeBtn.classList.add('close-modale')
//         closeBtn.textContent = "X"
//         div.innerHTML = `
//         <h2 class="card-gen">Gen : ${this.apiGeneration}</h2>
//         <img src="${this.sprite}" class="card-img">
//         <span class="card-name">${this.name}</span>
//         <div class="card-stats">
//             <span class="card-stat">HP : ${this.stats.HP}</span>
//             <span class="card-stat">Att : ${this.stats.attack}</span>
//             <span class="card-stat">Def : ${this.stats.defense}</span>
//             <span class="card-stat"> Att.Spé : ${this.stats.special_attack}</span>
//             <span class="card-stat">Def.Spé : ${this.stats.special_defense}</span>
//             <span class="card-stat">Vit : ${this.stats.speed}</span>
//         </div>
//         `;
//         this.apiResistances.forEach((element) => {
//             let newStat = document.createElement('span')! as HTMLSpanElement
//             newStat.classList.add('card-stat-resist')
//             newStat.innerHTML = `${element.name} : <span class="${element.damage_relation}">x${element.damage_multiplier}</span>`
//             divCardStats.append(newStat)
//         })
//         //console.log(pkm.apiTypes[0].name, pkm.apiTypes[1] ? pkm.apiTypes[1].name : "");
//         closeBtn.addEventListener('click', () => {
//             app.removeChild(divApp)
//         })
//         // puis on rajoute chaque div dans la div "app"
//         divApp.append(closeBtn)
//         divApp.append(div)
//         divApp.append(divResists)
//         app.append(divApp)
//     }
//     get getId() : number {return this.id}
// }
// //----------------------------FONCTIONS CALLBACK-------------------------------
// /**
//  * 
//  * @param datas prends un paramètre du type Datas ---> interface Datas
//  * 
//  * crée une carte dans le DOM pour chaque élément dans datas
//  * @returns 
//  */
// export function constructCards(data : Data[]) : Data[] {
//     // pour chaque élément dans data
//     for(let pkm of data) {
//         let newCard = new PokemonCard(pkm.id, pkm.name, pkm.image, pkm.sprite, pkm.apiGeneration, pkm.stats, pkm.apiTypes, pkm.apiResistances)
//         newCard.createCard()
//     }
//     return data
// }
// //----------------------------USE FECTHES FUNCTIONS-------------------------------
// fetchAllPkms(URL_ALL_PKM, constructCards)
//# sourceMappingURL=createCards.js.map