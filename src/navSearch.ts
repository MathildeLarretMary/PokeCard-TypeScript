import {  pkmNameList, PokemonName } from "./request.js";
import { toNoAccent } from "./Fuctions.js";

// Get nav-input and nav-submit
const nav_input = document.querySelector('.nav-input')! as HTMLInputElement
const nav_submit = document.querySelector('.nav-submit') as HTMLButtonElement
const navbar = document.querySelector('.navbar')! as HTMLElement

//TODO: add search by id 
/*
on submit && "onclik" on <li> : get tuple by "name" value -> to get this.pkm  id
do the request with pkm id
*/

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

    createAllLis(ul, allFindedList)

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

function submitSearch<Type extends PokemonName[]>(list : Type, _value : string) {
    let idSearched  : number 

    for(let obj of list) {
        if(toNoAccent(obj.name.toLowerCase()) === toNoAccent(_value.toLowerCase())) {
        idSearched =  obj.pokeid
        console.log(idSearched);
        }
 }
}

function createAllLis(ElementHTML:HTMLUListElement, list : Array<[number, string]>) : void {
    list.map((e) => {
        // create li list
        let li = document.createElement('li') as HTMLLIElement
        li.classList.add('list-fined-li')
        li.textContent = e[1]

        li.addEventListener('click' , () => {
            if(li.textContent) {
                submitSearch(pkmNameList, li.textContent)
            }
        })

        ElementHTML.append(li)
        })

    navbar.append(ElementHTML)

}