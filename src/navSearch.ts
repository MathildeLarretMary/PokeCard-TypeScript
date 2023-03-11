import {  pkmNameList, PokemonName } from "./request.js";

// Get nav-input and nav-submit
const nav_input = document.querySelector('.nav-input')! as HTMLInputElement
const nav_submit = document.querySelector('.nav-submit') as HTMLButtonElement
const navbar = document.querySelector('.navbar')! as HTMLElement

 

nav_submit.addEventListener('click', () => {
    console.log('click');
    console.log(pkmNameList);
    if(nav_input.value !== "") {
        console.log(nav_input.value); 
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

    console.log(allFindedList);

    createAllLis(ul, allFindedList)

    if(nav_input.value === "" && navbar.querySelector('ul')) {
        navbar.querySelector('ul')?.remove()
    }

})

function createAllLis(ElementHTML:HTMLUListElement, list : Array<[number, string]>) : void {
    list.map((e) => {
        // create li list
        let li = document.createElement('li') as HTMLLIElement
        li.classList.add('list-fined-li')
        li.textContent = e[1]
        // ul.remove()
        // li.replaceWith(e[1])
        ElementHTML.append(li)
        })

    navbar.append(ElementHTML)

}