import { URL_ALL_PKM, fetchAllPkms } from "./request.js";
class PokeCard extends HTMLElement {
    constructor(_root) {
        super();
        this._root = _root;
        this._root = this.attachShadow({ mode: 'open' });
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
        `;
    }
    connectedCallback() {
        const _data_generation = this.getAttribute('data-generation');
        const _data_sprite = this.getAttribute('data-sprite');
        const _data_name = this.getAttribute('data-name');
        const _data_stat_hp = this.getAttribute('data-stat-hp');
        const _data_stat_att = this.getAttribute('data-stat-att');
        const _data_stat_def = this.getAttribute('data-stat-def');
        const _data_stat_att_spe = this.getAttribute('data-stat-att-spe');
        const _data_stat_def_spe = this.getAttribute('data-stat-def-spe');
        const _data_stat_speed = this.getAttribute('data-stat-speed');
        this.buildDOM(_data_generation, _data_sprite, _data_name, _data_stat_hp, _data_stat_att, _data_stat_def, _data_stat_att_spe, _data_stat_def_spe, _data_stat_speed);
    }
    buildDOM(gen, sprite, name, stat_hp, stat_att, stat_def, stat_att_spe, stat_def_spe, stat_speed) {
        const cardDiv = document.createElement('div');
        cardDiv.classList.add('card');
        const title = document.createElement('h2'); // _data_name
        title.classList.add('card-name');
        title.textContent = name;
        cardDiv.append(title);
        const generation = document.createElement('span'); // _data_generation
        generation.classList.add('card-gen');
        generation.textContent = 'Gen : ' + gen;
        cardDiv.append(generation);
        const image = document.createElement('img'); // _data_sprite
        image.classList.add('card-img');
        image.src = sprite;
        cardDiv.append(image);
        const slotMoreBtn = document.createElement('slot'); // _data_id
        slotMoreBtn.name = "slot-more-btn";
        // slotMoreBtn.classList.add('more')
        cardDiv.append(slotMoreBtn);
        const slotModale = document.createElement('slot'); // _data_id
        slotModale.name = "slot-modale";
        cardDiv.append(slotModale);
        // stats--------------------------------------------------------------------------
        const stats = document.createElement('div');
        stats.classList.add('card-stats');
        const statHp = document.createElement('span'); // stat_hp
        statHp.classList.add('card-stat');
        statHp.textContent = 'HP : ' + stat_hp;
        stats.append(statHp);
        const statAtt = document.createElement('span'); // stat_att
        statAtt.classList.add('card-stat');
        statAtt.textContent = 'Att : ' + stat_att;
        stats.append(statAtt);
        const statDef = document.createElement('span'); // stat_def
        statDef.classList.add('card-stat');
        statDef.textContent = 'Def : ' + stat_def;
        stats.append(statDef);
        const statAttSpe = document.createElement('span'); // stat_att_spe
        statAttSpe.classList.add('card-stat');
        statAttSpe.textContent = 'Att.Spé : ' + stat_att_spe;
        stats.append(statAttSpe);
        const statDefSpe = document.createElement('span'); // stat_def_spe
        statDefSpe.classList.add('card-stat');
        statDefSpe.textContent = 'Def.Spé : ' + stat_def_spe;
        stats.append(statDefSpe);
        const statSpeed = document.createElement('span'); // stat_speed
        statSpeed.classList.add('card-stat');
        statSpeed.textContent = 'Vit : ' + stat_speed;
        stats.append(statSpeed);
        cardDiv.append(stats);
        this._root.append(cardDiv);
    }
}
const App = document.querySelector('#app');
window.customElements.define('poke-card', PokeCard);
function addPokeCard(data) {
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
            console.log(pkm.id + ' //TODO: encode createModale()');
        });
        moreBtn.textContent = '+';
        pokeCard.append(moreBtn);
        App === null || App === void 0 ? void 0 : App.append(pokeCard);
    }
    return data;
}
fetchAllPkms(URL_ALL_PKM, addPokeCard);
//# sourceMappingURL=pokeCard.js.map