import { URL_ALL_PKM, fetchAllPkms, Data, fetchOnePkm } from "./request.js"

class PokeCard extends HTMLElement {
    constructor(
        private _root: ShadowRoot
        ) {
        super()
        this._root = this.attachShadow({mode:'open'})
        this._root.innerHTML = `
        <style>
        .card, .resist-card {
            font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
            position: relative;
            background-color: var(--light-medium-color);
            border-radius: 20px;
            border: var(--dark-color) 4px solid;
            width: 250px;
            height: 350px;
            /*TODO: change on @media-queries */
            margin: 15px 0;
        
            display: flex;
            flex-wrap: wrap;
            justify-content: space-around;
        
            box-shadow: 3px 8px 7px 2px rgba(0,0,0,0.5);
        }
        
        .card {
            max-width: 250px;
        }
        
        .card-img {
            background-color: var(--medium-color);
            border: var(--dark-color) 3px solid;
            border-radius: 20px;
            margin: 10px auto 5px;
            width: 90%;
            height: 40%;
            object-fit: contain;
        }
        
        .card-name {
           text-transform: capitalize;
           color: var(--light-color);
            font-weight: 700;
            background-color: var(--dark-color);
            border-radius: 30px;
            padding: 3px 5px 5px 5px;
            margin: 5px 5px 5px 10px;
            position: absolute;
            left: 0;
        }
        
        .card-gen {
            font-weight: 300;
            font-size: smaller;
            background-color: var(--dark-medium-color);
            position: absolute;
            padding: 3px 7px 3px 5px;
            margin: 0 10px 8px;
            border-radius: 10px;
            bottom: 57%;
            right: 10px;
        }
        
        .card-stats {
            background-color: var(--medium-color);
            border: var(--dark-medium-color) 3px solid;
            border-radius: 20px;
            margin: 5px auto 10px;
            width: 90%;
            min-height: 50%;
        
            display: flex;
            flex-wrap: wrap;
        }
        
        .card-stat {
            background-color: var(--dark-medium-color);
            border-radius: 20px;
            width: 80%;
            margin: 2px auto;
            padding: 4px 10px 0;
        }
        
        ::slotted(button) {
            background-color: var(--light-color);
            color: var(--dark-color);
            border: var(--dark-color) solid 2px;
            position: absolute;
            right: 0;
            height: 30px;
            width: 30px;
            padding: 1px 1px 0 0;
            border-radius: 30px;
            font-weight: bolder;
            font-size: large;
        }
        </style>
        `
    }

    connectedCallback(): void {
        const _data_generation  = this.getAttribute('data-generation')!
        const _data_sprite = this.getAttribute('data-sprite')!
        const _data_name = this.getAttribute('data-name')!

        const _data_stat_hp = this.getAttribute('data-stat-hp')!
        const _data_stat_att = this.getAttribute('data-stat-att')!
        const _data_stat_def = this.getAttribute('data-stat-def')!
        const _data_stat_att_spe = this.getAttribute('data-stat-att-spe')!
        const _data_stat_def_spe = this.getAttribute('data-stat-def-spe')! 
        const _data_stat_speed = this.getAttribute('data-stat-speed')!


        this.buildDOM(
            _data_generation,
            _data_sprite,
            _data_name,
            _data_stat_hp,
            _data_stat_att,
            _data_stat_def,
            _data_stat_att_spe,
            _data_stat_def_spe,
            _data_stat_speed
        )
    }

    buildDOM(
        gen : string,
        sprite: string,
        name: string,
        stat_hp: string,
        stat_att: string,
        stat_def: string,
        stat_att_spe: string,
        stat_def_spe: string,
        stat_speed: string
        ) : void {
        const cardDiv = document.createElement('div')! as HTMLDivElement
        cardDiv.classList.add('card')

        const title = document.createElement('h2')! as HTMLHeadingElement // _data_name
        title.classList.add('card-name')
        title.textContent = name
        cardDiv.append(title)
        const generation = document.createElement('span')! as HTMLSpanElement // _data_generation
        generation.classList.add('card-gen')
        generation.textContent = 'Gen : ' + gen
        cardDiv.append(generation)
        const image = document.createElement('img')! as HTMLImageElement // _data_sprite
        image.classList.add('card-img')
        image.src = sprite
        cardDiv.append(image)
        const slotMoreBtn = document.createElement('slot')! as HTMLSlotElement // _data_id
        slotMoreBtn.name = "slot-more-btn"
        // slotMoreBtn.classList.add('more')
        cardDiv.append(slotMoreBtn)
        const slotModale = document.createElement('slot')! as HTMLSlotElement // _data_id
            slotModale.name = "slot-modale"
        cardDiv.append(slotModale)

        // stats--------------------------------------------------------------------------
        const stats = document.createElement('div')! as HTMLDivElement
        stats.classList.add('card-stats')

        const statHp = document.createElement('span')! as HTMLSpanElement // stat_hp
        statHp.classList.add('card-stat')
        statHp.textContent = 'HP : ' + stat_hp
        stats.append(statHp)
        const statAtt = document.createElement('span')! as HTMLSpanElement // stat_att
        statAtt.classList.add('card-stat')
        statAtt.textContent = 'Att : ' + stat_att
        stats.append(statAtt)
        const statDef = document.createElement('span')! as HTMLSpanElement // stat_def
        statDef.classList.add('card-stat')
        statDef.textContent = 'Def : ' + stat_def
        stats.append(statDef)
        const statAttSpe = document.createElement('span')! as HTMLSpanElement // stat_att_spe
        statAttSpe.classList.add('card-stat')
        statAttSpe.textContent = 'Att.Spé : ' + stat_att_spe
        stats.append(statAttSpe)
        const statDefSpe = document.createElement('span')! as HTMLSpanElement // stat_def_spe
        statDefSpe.classList.add('card-stat')
        statDefSpe.textContent = 'Def.Spé : ' + stat_def_spe
        stats.append(statDefSpe)
        const statSpeed = document.createElement('span')! as HTMLSpanElement // stat_speed
        statSpeed.classList.add('card-stat')
        statSpeed.textContent = 'Vit : ' + stat_speed
        stats.append(statSpeed)

        cardDiv.append(stats)

        this._root.append(cardDiv)
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
        })
        moreBtn.textContent = '+'
        pokeCard.append(moreBtn)

        App?.append(pokeCard)
    }
    return data
}

fetchAllPkms(URL_ALL_PKM, addPokeCard)

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
    //console.log(pkm.apiTypes[0].name, pkm.apiTypes[1] ? pkm.apiTypes[1].name : "");
    
    closeBtn.addEventListener('click', () => {
        App.removeChild(divApp)
    })
    // // puis on rajoute chaque div dans la div "app"
    divApp.append(closeBtn)
    divApp.append(pokeCard)
    divApp.append(divResists)
    App?.prepend(divApp)
}