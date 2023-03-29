import { URL_ALL_PKM, fetchAllPkms, Data } from "./request.js"

class PokeCard extends HTMLElement {
    constructor(
        private _root: ShadowRoot
        ) {
        super()
        this._root = this.attachShadow({mode:'open'})
    }

    connectedCallback(): void {
        const _data_generation  = this.getAttribute('data-generation')!
        const _data_sprite = this.getAttribute('data-sprite')!
        const _data_name = this.getAttribute('data-name')!
        const _data_id = this.getAttribute('data-id')!

        const _data_stat_hp = this.getAttribute('data-stat-hp')!
        const _data_stat_att = this.getAttribute('data-stat-att')!
        const _data_stat_def = this.getAttribute('data-stat-def')!
        const _data_stat_att_spe = this.getAttribute('data-stat-att-spe')!
        const _data_stat_def_spe = this.getAttribute('data-stat-def-spe')! 
        const _data_stat_speed = this.getAttribute('data-stat-speed')!


        this._root.innerHTML = `
        <h2 class="card-gen">Gen : ${_data_generation}</h2>
        <img src="${_data_sprite}" class="card-img">
        <span class="card-name">${_data_name}</span><button value = "${_data_id}" class="more">+</button>
        <div class="card-stats">
            <span class="card-stat">HP : ${_data_stat_hp}</span>
            <span class="card-stat">Att : ${_data_stat_att}</span>
            <span class="card-stat">Def : ${_data_stat_def}</span>
            <span class="card-stat"> Att.Spé : ${_data_stat_att_spe}</span>
            <span class="card-stat">Def.Spé : ${_data_stat_def_spe}</span>
            <span class="card-stat">Vit : ${_data_stat_speed}</span>
        </div>
        ` 
    }

    buildDOM(
        gen : string,
        sprite: string,
        name: string,
        id: string,
        stat_hp: string,
        stat_att: string,
        stat_def: string,
        stat_att_spe: string,
        stat_def_spe: string,
        stat_speed: string
        ) : void {
           const title = document.createElement('h2')! as HTMLHeadingElement // _data_name
           const generation = document.createElement('span')! as HTMLSpanElement // _data_generation
           const image = document.createElement('img')! as HTMLImageElement // _data_sprite

    }
}

const App = document.querySelector('#app')! as HTMLDivElement
window.customElements.define('poke-card', PokeCard)

function addPokeCard(data:Data[]) : Data[] {
    for(let pkm of data) {
        let pokeCard = document.createElement('poke-card')
        pokeCard.setAttribute('data-name', pkm.name)
        pokeCard.setAttribute('data-sprite', pkm.sprite)
        pokeCard.setAttribute('data-generation', pkm.apiGeneration.toString())
        pokeCard.setAttribute('data-id', pkm.id.toString())
        pokeCard.setAttribute('data-stat-hp', pkm.stats.HP.toString())
        pokeCard.setAttribute('data-stat-att', pkm.stats.attack.toString())
        pokeCard.setAttribute('data-stat-def', pkm.stats.defense.toString())
        pokeCard.setAttribute('data-stat-att-spe', pkm.stats.special_attack.toString())
        pokeCard.setAttribute('data-stat-def-spe', pkm.stats.special_defense.toString())
        pokeCard.setAttribute('data-stat-speed', pkm.stats.speed.toString())        
        App?.append(pokeCard)
    }
    return data
}

fetchAllPkms(URL_ALL_PKM, addPokeCard)