import {  pkmNameList, PokemonName, fetchOnePkm, URL_ALL_PKM, Data, fetchPkmBy } from "./request.js";
import { toNoAccent } from "./Fuctions.js";
import { createModale } from "./Fuctions.js";

// Get nav-input and nav-submit
const nav_input = document.querySelector('.nav-input')! as HTMLInputElement
const nav_submit = document.querySelector('.nav-submit') as HTMLButtonElement
const navbar = document.querySelector('.navbar')! as HTMLElement
const nav_search_by = document.querySelector('#nav-search-btn')! as HTMLButtonElement

type checkBoxes = Array<number> | Array<string>

let listGen : checkBoxes = [1, 2, 3, 4, 5, 6, 7, 8]
let listType: checkBoxes = ["Normal", "Feu", "Eau", "Électrik", "Plante", "Glace", "Combat", "Poison", "Sol", "Vol", "Psy", "Insecte", "Roche", "Spectre", "Dragon", "Ténèbres", "Acier", "Fée"]

// ------------------------EVENT LISTENERS----------------------------
nav_submit.addEventListener('click', () => {
    submitSearch(pkmNameList, nav_input.value)

    if(nav_input.value !== "") {
        nav_input.value = ""
        navbar.querySelector('ul')?.remove()
    } 
})

nav_input.addEventListener('keyup', () => {
    // create list with all names includes input.value on keyup
    let allFindedList : Array<[number, string]> = []

    //if there is 'ul' on navbar, delete if on keyup to have new 'ul' list
    navbar.querySelector('ul')?.remove()
    

    // create ul list
    let ul = document.createElement('ul')! as HTMLUListElement
    ul.classList.add('list-finded')


    // afficher les "name" de chaque pkm qui contient input.value
    pkmNameList.forEach((element: PokemonName) =>  {
        if(element.name.toLowerCase().includes(nav_input.value.toLowerCase())) {
            allFindedList.push([element.pokeid, element.name])
            return allFindedList
        }
    })

    createFindedList(ul, allFindedList)

    if(nav_input.value === "" && navbar.querySelector('ul')) {
        navbar.querySelector('ul')?.remove()
    }

})

nav_input.addEventListener('keyup' , (e) => {
    if(e.code === 'Enter') {
        submitSearch(pkmNameList, nav_input.value)

        if(nav_input.value !== "") {
            nav_input.value = ""
            navbar.querySelector('ul')?.remove()
        } 
    }
})

nav_search_by.addEventListener('click', () => {
    const checkBoxesDiv = document.createElement('div')! as HTMLDivElement
    checkBoxesDiv.classList.add('checkboxes')
    checkBoxesDiv.textContent = "Recherche Avancée :"

    const closeCheckBoxesDiv = document.createElement('button')! as HTMLButtonElement
    closeCheckBoxesDiv.textContent = "X"
    closeCheckBoxesDiv.classList.add('close-checkboxes')
    closeCheckBoxesDiv.addEventListener('click', () => {
        navbar.removeChild(checkBoxesDiv)
    })
    checkBoxesDiv.append(closeCheckBoxesDiv)

    const checkBoxesGen = document.createElement('fieldset')! as HTMLFieldSetElement
    const lengendGen = document.createElement('legend')! as HTMLLegendElement
    lengendGen.textContent = "Par Génération :"
    checkBoxesGen.append(lengendGen)

    let checkboxesGenChecked : Array<number|string> = []
    let checkboxesTypesChecked : Array<number|string> = []

    listGen.forEach(element => {
        let div = document.createElement('div')! as HTMLDivElement
        let input = document.createElement('input')! as HTMLInputElement
        input.type = "checkbox"
        input.name = "gen-" + element
        input.id = element.toString()
        input.addEventListener('change', () => {
            if(input.checked) {
                checkboxesGenChecked.push(element)
            } else {
                let find = checkboxesGenChecked.findIndex(e => e === element)
                checkboxesGenChecked.splice(find, 1)
            }
        })
        div.append(input)
        let label = document.createElement('label')! as HTMLLabelElement
        label.textContent = "Gen " + element
        label.htmlFor = "gen-" + element
        div.append(label)
        checkBoxesGen.append(div)
        checkBoxesDiv.append(checkBoxesGen)
    })
    const submitGen = document.createElement('button')! as HTMLButtonElement
    submitGen.textContent = "OK"
    submitGen.addEventListener('click', () => {
        // TODO: remove all App children
        console.log('on click submitGen');
        checkboxesGenChecked.forEach(element => {
            fetchPkmBy(element, URL_ALL_PKM, logData)
        })
        console.log('after click submitGen');
        console.log(checkboxesGenChecked);
        navbar.removeChild(checkBoxesDiv)
    })
    checkBoxesGen.append(submitGen)

    const checkBoxesTypes = document.createElement('fieldset')! as HTMLFieldSetElement
    const lengendTypes = document.createElement('legend')! as HTMLLegendElement
    lengendTypes.textContent = "Par Type :"
    checkBoxesTypes.append(lengendTypes)
    listType.forEach(element => {
        let div = document.createElement('div')! as HTMLDivElement
        let input = document.createElement('input')! as HTMLInputElement
        input.type = "checkbox"
        input.name = "type-" + element
        input.id = element.toString()
        input.addEventListener('change', () => {
            if(input.checked) {
                checkboxesTypesChecked.push(element)
            } else {
                let find = checkboxesTypesChecked.findIndex(e => e === element)
                checkboxesTypesChecked.splice(find, 1)
            }
        })
        div.append(input)
        let label = document.createElement('label')! as HTMLLabelElement
        label.textContent = element.toString()
        label.htmlFor = "type-" + element
        div.append(label)
        checkBoxesTypes.append(div)
        checkBoxesDiv.append(checkBoxesTypes)
    })

    const submitTypes = document.createElement('button')! as HTMLButtonElement
    submitTypes.textContent = "OK"
    submitTypes.addEventListener('click', () => {
        // TODO: remove all App children
        console.log('on click submitTypes');
        checkboxesTypesChecked.forEach(element => {
            fetchPkmBy(element, URL_ALL_PKM, logData)
        })
        console.log('after click submitTypes');
        console.log(checkboxesTypesChecked);
        navbar.removeChild(checkBoxesDiv)
    })
    checkBoxesTypes.append(submitTypes)

    navbar.append(checkBoxesDiv)
})


function logData (data : Data) : void {
    // TODO: ENCODE buildDOM with all getted data
    // TODO: create all new App children
    console.log(data);
    
}

// ------------------------FUNCTIONS----------------------------
/**
 * 
 * @param list takes list of all pokemons names to compare with value
 * @param _value value to be compared on list
 * @returns fetchOnePkm() -> with id find and put on idSearched
 */
export function submitSearch<Type extends PokemonName[]>(list : Type, _value : string) {
    let idSearched  : number 

    for(let obj of list) {
        if(toNoAccent(obj.name.toLowerCase()) === toNoAccent(_value.toLowerCase())) {
        idSearched =  obj.pokeid
        fetchOnePkm(URL_ALL_PKM, createModale, idSearched)
        }
 }
}

/**
 * 
 * @param ElementHTML takes an HTMLUListElement to append <li> elements  
 * @param list list of all pokemons to be compared
 */
function createFindedList(ElementHTML:HTMLUListElement, list : Array<[number, string]>) : void {
    list.map((e) => {
        // create li list
        let li = document.createElement('li') as HTMLLIElement
        li.classList.add('list-fined-li')
        li.textContent = e[1]

        li.addEventListener('click' , () => {
            if(li.textContent) {
                submitSearch(pkmNameList, li.textContent)

                if(nav_input.value !== "") {
                    nav_input.value = ""
                    navbar.querySelector('ul')?.remove()
                } 
            }
        })

        ElementHTML.append(li)
        })

    navbar.append(ElementHTML)

}