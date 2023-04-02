import { fetchOnePkm,URL_ALL_PKM, Data } from "./request.js";
import { App } from "./index.js";
/**
 * 
 * @param {*} string takes a string with accents
 * @returns string with no accents
 */
export function toNoAccent(string: string) : string {
    return string.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

export function addPokeCards(data:Data[]) : void {
    for(let pkm of data) {
        let pokeCard = document.createElement('poke-card')
        pokeCard.setAttribute('data-name', pkm.name)
        pokeCard.setAttribute('data-sprite', pkm.sprite)
        pokeCard.setAttribute('data-generation', pkm.apiGeneration.toString())
        pokeCard.setAttribute('data-stat-hp', pkm.stats.HP.toString())
        pokeCard.setAttribute('data-stat-att', pkm.stats.attack.toString())
        pokeCard.setAttribute('data-stat-def', pkm.stats.defense.toString())
        pokeCard.setAttribute('data-stat-att-spe', pkm.stats.special_attack.toString())
        pokeCard.setAttribute('data-stat-def-spe', pkm.stats.special_defense.toString())
        pokeCard.setAttribute('data-stat-speed', pkm.stats.speed.toString()) 
        
        let moreBtn = document.createElement('button')! as HTMLButtonElement
        moreBtn.setAttribute('slot', 'slot-more-btn')
        moreBtn.addEventListener('click', () => {
            fetchOnePkm(URL_ALL_PKM, createModale, pkm.id)
            if(App.querySelector('.get-all-btn')!) {
                App.querySelector('.get-all-btn')!.setAttribute('style', 'visibility: hidden;')
            }
        })
        moreBtn.textContent = '+'
        pokeCard.append(moreBtn)

        pkm.apiTypes.forEach (element => {
            let pkmType = document.createElement('span')! as HTMLSpanElement
            pkmType.setAttribute('slot', 'slot-types')
            pkmType.setAttribute('style', 'padding: 3px 4px 2px; border-radius: 10px; border: var(--darktype-color) 2px solid;')
            pkmType.textContent = element.name ?? ""
            pkmType.classList.add(element.name?.toLowerCase() ?? "")
            pokeCard.append(pkmType)
        })

        App?.append(pokeCard)
    }
    // return data
}

export function createModale(data:Data) : void {
    let divApp = document.createElement('div')! as HTMLDivElement
    divApp.classList.add('modale')

    console.log(data);
    let closeBtn = document.createElement('button')! as HTMLButtonElement
    let divResists = document.createElement('div')! as HTMLDivElement
    let divCardStats = document.createElement('div')! as HTMLDivElement

    divResists.classList.add('card','card-modale', 'resist-card')
    divCardStats.classList.add('card-stats-restist')

    divResists.append(divCardStats)

    closeBtn.classList.add('close-modale')
    closeBtn.textContent = "X"


    let pokeCard = document.createElement('poke-card')
    pokeCard.classList.add('card-modale')
    pokeCard.setAttribute('data-name', data.name)
    pokeCard.setAttribute('data-sprite', data.sprite)
    pokeCard.setAttribute('data-generation', data.apiGeneration.toString())
    pokeCard.setAttribute('data-stat-hp', data.stats.HP.toString())
    pokeCard.setAttribute('data-stat-att', data.stats.attack.toString())
    pokeCard.setAttribute('data-stat-def', data.stats.defense.toString())
    pokeCard.setAttribute('data-stat-att-spe', data.stats.special_attack.toString())
    pokeCard.setAttribute('data-stat-def-spe', data.stats.special_defense.toString())
    pokeCard.setAttribute('data-stat-speed', data.stats.speed.toString())
    
    data.apiResistances.forEach((element) => {
        let newStat = document.createElement('span')! as HTMLSpanElement
        newStat.classList.add('card-stat-resist')
        newStat.innerHTML = `${element.name} : <span class="${element.damage_relation}">x${element.damage_multiplier}</span>`
        
        divCardStats.append(newStat)
    })

    data.apiTypes.forEach (element => {
        let pkmType = document.createElement('span')! as HTMLSpanElement
        pkmType.setAttribute('slot', 'slot-types')
        pkmType.setAttribute('style', 'padding: 3px 4px 2px; border-radius: 10px; border: var(--darktype-color) 2px solid;')
        pkmType.textContent = element.name ?? ""
        pkmType.classList.add(element.name?.toLowerCase() ?? "")
        pokeCard.append(pkmType)
    })
    
    closeBtn.addEventListener('click', () => {
        App.removeChild(divApp)
        if(App.querySelector('.get-all-btn')!) {
            App.querySelector('.get-all-btn')!.setAttribute('style', 'visibility: visible;')
        }
    })
    // // puis on rajoute chaque div dans la div "app"
    divApp.append(closeBtn)
    divApp.append(pokeCard)
    divApp.append(divResists)
    App?.prepend(divApp)
}