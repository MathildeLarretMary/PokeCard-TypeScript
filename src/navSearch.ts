import {  pkmNameList, PokemonName, Data, fetchOnePkm, URL_ALL_PKM } from "./request.js";
import { toNoAccent } from "./Fuctions.js";
import { PokemonCard } from "./createCards.js";

// Get nav-input and nav-submit
const nav_input = document.querySelector('.nav-input')! as HTMLInputElement
const nav_submit = document.querySelector('.nav-submit') as HTMLButtonElement
const navbar = document.querySelector('.navbar')! as HTMLElement

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
        fetchOnePkm(URL_ALL_PKM, createOneCard, idSearched)
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

export function createOneCard(data: Data) : void {
    console.log(data);
    let newModale = new PokemonCard(data.id, data.name, data.image, data.sprite, data.apiGeneration, data.stats, data.apiTypes, data.apiResistances)
    newModale.createModale()
    return   
}