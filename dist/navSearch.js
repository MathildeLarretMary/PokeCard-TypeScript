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
nav_input.addEventListener('keyup', () => {
    var _a, _b;
    // create list with all names includes input.value on keyup
    let allFindedList = [];
    //if there is 'ul' on navbar, delete if on keyup to have new 'ul' list
    (_a = navbar.querySelector('ul')) === null || _a === void 0 ? void 0 : _a.remove();
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
    createAllLis(ul, allFindedList);
    if (nav_input.value === "" && navbar.querySelector('ul')) {
        (_b = navbar.querySelector('ul')) === null || _b === void 0 ? void 0 : _b.remove();
    }
});
function createAllLis(ElementHTML, list) {
    list.map((e) => {
        // create li list
        let li = document.createElement('li');
        li.classList.add('list-fined-li');
        li.textContent = e[1];
        // ul.remove()
        // li.replaceWith(e[1])
        ElementHTML.append(li);
    });
    navbar.append(ElementHTML);
}
//# sourceMappingURL=navSearch.js.map