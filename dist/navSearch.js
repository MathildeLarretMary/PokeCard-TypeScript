import { pkmNameList } from "./request.js";
// Get nav-input and nav-submit
const nav_input = document.querySelector('.nav-input');
const nav_submit = document.querySelector('.nav-submit');
const navbar = document.querySelector('.navbar');
nav_submit.addEventListener('click', () => {
    console.log('click');
    console.log(pkmNameList);
    if (nav_input.value !== "") {
        console.log(nav_input.value);
    }
});
// TODO: be able to remove ul>li  on keyup to show new list 
nav_input.addEventListener('keyup', () => {
    // create list with all names includes input.value on keyup
    let allFindedList = [];
    // create ul list
    let ul = document.createElement('ul');
    ul.classList.add('list-finded');
    // afficher les "name" de chaque pkm qui contient input.value
    pkmNameList.forEach((element) => {
        if (element.name.toLowerCase().includes(nav_input.value.toLowerCase())) {
            allFindedList.push([element.pokeid, element.name]);
            return allFindedList;
        }
    });
    console.log(allFindedList);
    allFindedList.map((e) => {
        // create li list
        let li = document.createElement('li');
        li.classList.add('list-fined-li');
        li.textContent = e[1];
        // ul.remove()
        ul.append(li);
    });
    navbar.append(ul);
});
//# sourceMappingURL=navSearch.js.map