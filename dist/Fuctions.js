import { fetchOnePkm, URL_ALL_PKM } from "./request.js";
import { App } from "./index.js";
/**
 *
 * @param {*} string takes a string with accents
 * @returns string with no accents
 */
export function toNoAccent(string) {
    return string.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}
export function addPokeCard(data) {
    for (let pkm of data) {
        let pokeCard = document.createElement('poke-card');
        pokeCard.setAttribute('data-name', pkm.name);
        pokeCard.setAttribute('data-sprite', pkm.sprite);
        pokeCard.setAttribute('data-generation', pkm.apiGeneration.toString());
        pokeCard.setAttribute('data-stat-hp', pkm.stats.HP.toString());
        pokeCard.setAttribute('data-stat-att', pkm.stats.attack.toString());
        pokeCard.setAttribute('data-stat-def', pkm.stats.defense.toString());
        pokeCard.setAttribute('data-stat-att-spe', pkm.stats.special_attack.toString());
        pokeCard.setAttribute('data-stat-def-spe', pkm.stats.special_defense.toString());
        pokeCard.setAttribute('data-stat-speed', pkm.stats.speed.toString());
        let moreBtn = document.createElement('button');
        moreBtn.setAttribute('slot', 'slot-more-btn');
        moreBtn.addEventListener('click', () => {
            fetchOnePkm(URL_ALL_PKM, createModale, pkm.id);
        });
        moreBtn.textContent = '+';
        pokeCard.append(moreBtn);
        App === null || App === void 0 ? void 0 : App.append(pokeCard);
    }
    return data;
}
export function createModale(data) {
    let divApp = document.createElement('div');
    divApp.classList.add('modale');
    console.log(data);
    let closeBtn = document.createElement('button');
    let divResists = document.createElement('div');
    let divCardStats = document.createElement('div');
    divResists.classList.add('card', 'card-modale', 'resist-card');
    divCardStats.classList.add('card-stats-restist');
    divResists.append(divCardStats);
    closeBtn.classList.add('close-modale');
    closeBtn.textContent = "X";
    let pokeCard = document.createElement('poke-card');
    pokeCard.classList.add('card-modale');
    pokeCard.setAttribute('data-name', data.name);
    pokeCard.setAttribute('data-sprite', data.sprite);
    pokeCard.setAttribute('data-generation', data.apiGeneration.toString());
    pokeCard.setAttribute('data-stat-hp', data.stats.HP.toString());
    pokeCard.setAttribute('data-stat-att', data.stats.attack.toString());
    pokeCard.setAttribute('data-stat-def', data.stats.defense.toString());
    pokeCard.setAttribute('data-stat-att-spe', data.stats.special_attack.toString());
    pokeCard.setAttribute('data-stat-def-spe', data.stats.special_defense.toString());
    pokeCard.setAttribute('data-stat-speed', data.stats.speed.toString());
    data.apiResistances.forEach((element) => {
        let newStat = document.createElement('span');
        newStat.classList.add('card-stat-resist');
        newStat.innerHTML = `${element.name} : <span class="${element.damage_relation}">x${element.damage_multiplier}</span>`;
        divCardStats.append(newStat);
    });
    //console.log(pkm.apiTypes[0].name, pkm.apiTypes[1] ? pkm.apiTypes[1].name : "");
    closeBtn.addEventListener('click', () => {
        App.removeChild(divApp);
    });
    // // puis on rajoute chaque div dans la div "app"
    divApp.append(closeBtn);
    divApp.append(pokeCard);
    divApp.append(divResists);
    App === null || App === void 0 ? void 0 : App.prepend(divApp);
}
//# sourceMappingURL=Fuctions.js.map