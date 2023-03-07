//--------------------------IMPORTS----------------------------
import { URL_ALL_PKM, fetchIt, Datas } from './request.js';

//--------------------------CONSTANTES----------------------------
// on récupère la div "app" du document HTML
const app = document.querySelector('#app')! as HTMLDivElement

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
function constructCards(datas : Datas[]) : Datas[] {
    // console.log(datas);
    // pour chaque élément dans datas
    for(let pkm of datas) {
        // TODO: récupérer chacunes des stats de pkm.stats et mettre dans <div><ul><li>STAT</li></ul></div>
        // console.log(pkm.stats);
        // on crée une div
        let div = document.createElement('div') as HTMLDivElement
        // qui aura la class "card"
        div.classList.add('card')
        // dans laquelle il y aura
        div.innerHTML = `
        <span class="card-gen">Gen : ${pkm.apiGeneration}</span>
        <img src="${pkm.sprite}" class="card-img">
        <span class="card-name">${pkm.name}</span>
        `
        // puis on rajoute chaque div dans la div "app"
        app.append(div)
    }
    return datas
    
}

//----------------------------USE FECTHES FUNCTIONS-------------------------------
fetchIt(URL_ALL_PKM, constructCards)