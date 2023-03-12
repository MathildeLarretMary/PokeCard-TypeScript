import { pkmNameList, fetchIt, URL_ALL_PKM } from "./request.js";
import { toNoAccent } from "./Fuctions.js";
// Get nav-input and nav-submit
const nav_input = document.querySelector('.nav-input');
const nav_submit = document.querySelector('.nav-submit');
const navbar = document.querySelector('.navbar');
nav_submit.addEventListener('click', () => {
    var _a;
    submitSearch(pkmNameList, nav_input.value);
    if (nav_input.value !== "") {
        nav_input.value = "";
        (_a = navbar.querySelector('ul')) === null || _a === void 0 ? void 0 : _a.remove();
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
    createFindedList(ul, allFindedList);
    if (nav_input.value === "" && navbar.querySelector('ul')) {
        (_b = navbar.querySelector('ul')) === null || _b === void 0 ? void 0 : _b.remove();
    }
});
nav_input.addEventListener('keyup', (e) => {
    var _a;
    if (e.code === 'Enter') {
        submitSearch(pkmNameList, nav_input.value);
        if (nav_input.value !== "") {
            nav_input.value = "";
            (_a = navbar.querySelector('ul')) === null || _a === void 0 ? void 0 : _a.remove();
        }
    }
});
function submitSearch(list, _value) {
    let idSearched;
    for (let obj of list) {
        if (toNoAccent(obj.name.toLowerCase()) === toNoAccent(_value.toLowerCase())) {
            idSearched = obj.pokeid;
            fetchIt(URL_ALL_PKM, createOneCard, idSearched);
            console.log(idSearched);
        }
    }
}
function createOneCard(data) {
    console.log(data);
}
function createFindedList(ElementHTML, list) {
    list.map((e) => {
        // create li list
        let li = document.createElement('li');
        li.classList.add('list-fined-li');
        li.textContent = e[1];
        li.addEventListener('click', () => {
            var _a;
            if (li.textContent) {
                submitSearch(pkmNameList, li.textContent);
                if (nav_input.value !== "") {
                    nav_input.value = "";
                    (_a = navbar.querySelector('ul')) === null || _a === void 0 ? void 0 : _a.remove();
                }
            }
        });
        ElementHTML.append(li);
    });
    navbar.append(ElementHTML);
}
//# sourceMappingURL=navSearch.js.map