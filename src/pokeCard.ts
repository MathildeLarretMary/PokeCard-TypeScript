export class PokeCard extends HTMLElement {
    constructor(
        private _root: ShadowRoot
        ) {
        super()
        this._root = this.attachShadow({mode:'open'})
        this._root.innerHTML = `
        <style>
        
        
        ::slotted(button) {
            background-color: var(--light-color);
            color: var(--dark-color);
            border: var(--dark-color) solid 2px;
            position: absolute;
            right: 0;
            height: 20px;
            width: 20px;
            padding: 1px;
            border-radius: 30px;
            font-weight: bolder;
            font-size: large;
        }
        ::slotted(.normal) {
            --darktype-color : #6D6D4E;
            background-color: #A8A878;
        }
        ::slotted(.plante) {
            --darktype-color : #4E8234;
            background-color: #78C850;
        }
        ::slotted(.feu) {
            --darktype-color : #9C531F;
            background-color: #F08030;
        }
        ::slotted(.eau) {
            --darktype-color : #445E9C;
            background-color: #6890F0;
        }
        ::slotted(.électrik) {
            --darktype-color : #A1871F;
            background-color: #F8D030;
        }
        ::slotted(.glace) {
            --darktype-color : #638D8D;
            background-color: #98D8D8;
        }
        ::slotted(.combat) {
            --darktype-color : #7D1F1A;
            background-color: #C03028;
        }
        ::slotted(.poison) {
            --darktype-color : #682A68;
            background-color: #A040A0;
        }
        ::slotted(.sol) {
            --darktype-color : #927D44;
            background-color: #E0C068;
        }
        ::slotted(.vol) {
            --darktype-color : #6D5E9C;
            background-color: #A890F0;
        }
        ::slotted(.psy) {
            --darktype-color : #A13959;
            background-color: #F85888;
        }
        ::slotted(.insecte) {
            --darktype-color : #6D7815;
            background-color: #A8B820;
        }
        ::slotted(.roche) {
            --darktype-color : #786824;
            background-color: #B8A038;
        }
        ::slotted(.spectre) {
            --darktype-color : #493963;
            background-color: #705898;
        }
        ::slotted(.ténèbres) {
            --darktype-color : #49392F;
            background-color: #705848;
        }
        ::slotted(.dragon) {
            --darktype-color : #4924A1;
            background-color: #7038F8;
        }
        ::slotted(.acier) {
            --darktype-color : #787887;
            background-color: #B8B8D0;
        }
        ::slotted(.fée) {
            --darktype-color : #9B6470;
            background-color: #EE99AC;
        }

        ::slotted(span) {
            color: var(--light-color);
            border-radius: 10px;
        }
        </style>
        `

        let style = document.createElement('link')
        style.setAttribute('rel', 'stylesheet')
        style.setAttribute('href', 'pokeCard.css')
        this._root.append(style)
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
        cardDiv.append(slotMoreBtn)
        const divTypes = document.createElement('div')! as HTMLDivElement
        divTypes.classList.add('div-types')
        const slotTypes = document.createElement('slot')! as HTMLSlotElement // _data_id
        slotTypes.name = "slot-types"
        slotTypes.classList.add('slotted-types')
        divTypes.append(slotTypes)
        cardDiv.append(divTypes)

        // stats--------------------------------------------------------------------------
        const stats = document.createElement('div')! as HTMLDivElement
        stats.classList.add('card-stats')

        const statHp = document.createElement('span')! as HTMLSpanElement // stat_hp
        statHp.classList.add('card-stat')
        statHp.textContent = 'HP : '
        const spanHp = document.createElement('span')! as HTMLSpanElement
        spanHp.classList.add('stat')
        const spanHpValue = document.createElement('span')! as HTMLSpanElement
        spanHpValue.classList.add('stat-value')
        spanHpValue.textContent = stat_hp
        spanHpValue.setAttribute('style',`width: ${Number(stat_hp)*0.55}px; ` )
        spanHp.append(spanHpValue)
        stats.append(statHp)
        stats.append(spanHp)

        const statAtt = document.createElement('span')! as HTMLSpanElement // stat_att
        statAtt.classList.add('card-stat')
        statAtt.textContent = 'Att : '
        const spanAtt = document.createElement('span')! as HTMLSpanElement
        spanAtt.classList.add('stat')
        const spanAttValue = document.createElement('span')! as HTMLSpanElement
        spanAttValue.classList.add('stat-value')
        spanAttValue.textContent = stat_att
        spanAttValue.setAttribute('style',`width: ${Number(stat_att)*0.55}px; ` )
        spanAtt.append(spanAttValue)
        stats.append(statAtt)
        stats.append(spanAtt)

        const statDef = document.createElement('span')! as HTMLSpanElement // stat_def
        statDef.classList.add('card-stat')
        statDef.textContent = 'Def : '
        const spanDef = document.createElement('span')! as HTMLSpanElement
        spanDef.classList.add('stat')
        const spanDefValue = document.createElement('span')! as HTMLSpanElement
        spanDefValue.classList.add('stat-value')
        spanDefValue.textContent = stat_def
        spanDefValue.setAttribute('style',`width: ${Number(stat_def)*0.55}px; ` )
        spanDef.append(spanDefValue)
        stats.append(statDef)
        stats.append(spanDef)

        const statAttSpe = document.createElement('span')! as HTMLSpanElement // stat_att_spe
        statAttSpe.classList.add('card-stat')
        statAttSpe.textContent = 'Att.Spé : '
        const spanAttSpe = document.createElement('span')! as HTMLSpanElement
        spanAttSpe.classList.add('stat')
        const spanAttSpeValue = document.createElement('span')! as HTMLSpanElement
        spanAttSpeValue.classList.add('stat-value')
        spanAttSpeValue.textContent = stat_att_spe
        spanAttSpeValue.setAttribute('style',`width: ${Number(stat_att_spe)*0.55}px; ` )
        spanAttSpe.append(spanAttSpeValue)
        stats.append(statAttSpe)
        stats.append(spanAttSpe)

        const statDefSpe = document.createElement('span')! as HTMLSpanElement // stat_def_spe
        statDefSpe.classList.add('card-stat')
        statDefSpe.textContent = 'Def.Spé : '
        const spanDefSpe = document.createElement('span')! as HTMLSpanElement
        spanDefSpe.classList.add('stat')
        const spanDefSpeValue = document.createElement('span')! as HTMLSpanElement
        spanDefSpeValue.classList.add('stat-value')
        spanDefSpeValue.textContent = stat_def_spe
        spanDefSpeValue.setAttribute('style', `width: ${Number(stat_def_spe)*0.55}px; `)
        spanDefSpe.append(spanDefSpeValue)
        stats.append(statDefSpe)
        stats.append(spanDefSpe)

        const statSpeed = document.createElement('span')! as HTMLSpanElement // stat_speed
        statSpeed.classList.add('card-stat')
        statSpeed.textContent = 'Vit : '
        const spanSpeed = document.createElement('span')! as HTMLSpanElement
        spanSpeed.classList.add('stat')
        const spanSpeedValue = document.createElement('span')! as HTMLSpanElement
        spanSpeedValue.classList.add('stat-value')
        spanSpeedValue.textContent = stat_speed
        spanSpeedValue.setAttribute('style', `width: ${Number(stat_speed)*0.55}px; `)
        spanSpeed.append(spanSpeedValue)
        stats.append(statSpeed)
        stats.append(spanSpeed)

        cardDiv.append(stats)

        this._root.append(cardDiv)
    }
}