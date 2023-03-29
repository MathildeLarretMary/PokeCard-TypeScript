import { URL_ALL_PKM, fetchAllPkms, Data } from "./request.js"

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
            min-width: 250px;
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
        
        .more {
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
        const _data_id = this.getAttribute('data-id')!

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
            _data_id,
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
        id: string,
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
        const moreBtn = document.createElement('button')! as HTMLButtonElement // _data_id
        moreBtn.classList.add('more')
        moreBtn.value = id
        moreBtn.textContent = '+'
        cardDiv.append(moreBtn)

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