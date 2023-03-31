import { pkmNameList, fetchOnePkm, URL_ALL_PKM, fetchPkmBy } from "./request.js";
import { toNoAccent, addPokeCards } from "./Fuctions.js";
import { createModale } from "./Fuctions.js";
import { App } from "./index.js";
// Get nav-input and nav-submit
const nav_input = document.querySelector('.nav-input');
const nav_submit = document.querySelector('.nav-submit');
const navbar = document.querySelector('.navbar');
const nav_search_by = document.querySelector('#nav-search-btn');
let listGen = [1, 2, 3, 4, 5, 6, 7, 8];
let listType = ["Normal", "Feu", "Eau", "Électrik", "Plante", "Glace", "Combat", "Poison", "Sol", "Vol", "Psy", "Insecte", "Roche", "Spectre", "Dragon", "Ténèbres", "Acier", "Fée"];
// ------------------------EVENT LISTENERS----------------------------
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
nav_search_by.addEventListener('click', () => {
    const checkBoxesDiv = document.createElement('div');
    checkBoxesDiv.classList.add('checkboxes');
    checkBoxesDiv.textContent = "Recherche Avancée :";
    const closeCheckBoxesDiv = document.createElement('button');
    closeCheckBoxesDiv.textContent = "X";
    closeCheckBoxesDiv.classList.add('close-checkboxes');
    closeCheckBoxesDiv.addEventListener('click', () => {
        navbar.removeChild(checkBoxesDiv);
    });
    checkBoxesDiv.append(closeCheckBoxesDiv);
    const checkBoxesGen = document.createElement('fieldset');
    const lengendGen = document.createElement('legend');
    lengendGen.textContent = "Par Génération :";
    checkBoxesGen.append(lengendGen);
    let checkboxesGenChecked = [];
    let checkboxesTypesChecked = [];
    listGen.forEach(element => {
        let div = document.createElement('div');
        let input = document.createElement('input');
        input.type = "checkbox";
        input.name = "gen-" + element;
        input.id = element.toString();
        input.addEventListener('change', () => {
            if (input.checked) {
                checkboxesGenChecked.push(element);
            }
            else {
                let find = checkboxesGenChecked.findIndex(e => e === element);
                checkboxesGenChecked.splice(find, 1);
            }
        });
        div.append(input);
        let label = document.createElement('label');
        label.textContent = "Gen " + element;
        label.htmlFor = "gen-" + element;
        div.append(label);
        checkBoxesGen.append(div);
        checkBoxesDiv.append(checkBoxesGen);
    });
    const submitGen = document.createElement('button');
    submitGen.textContent = "OK";
    submitGen.addEventListener('click', () => {
        if (typeof checkboxesGenChecked[0] !== 'undefined') {
            // TODO: remove all App children
            while (App.firstChild) {
                App.removeChild(App.firstChild);
            }
            console.log('on click submitGen');
            console.log('not null');
            checkboxesGenChecked.forEach(element => {
                console.log(element);
                fetchPkmBy(element, URL_ALL_PKM, addPokeCards);
            });
            console.log('after click submitGen');
        }
        console.log(checkboxesGenChecked);
        navbar.removeChild(checkBoxesDiv);
    });
    checkBoxesGen.append(submitGen);
    const checkBoxesTypes = document.createElement('fieldset');
    const lengendTypes = document.createElement('legend');
    lengendTypes.textContent = "Par Type :";
    checkBoxesTypes.append(lengendTypes);
    listType.forEach(element => {
        let div = document.createElement('div');
        let input = document.createElement('input');
        input.type = "checkbox";
        input.name = "type-" + element;
        input.id = element.toString();
        input.addEventListener('change', () => {
            if (input.checked) {
                checkboxesTypesChecked.push(element);
            }
            else {
                let find = checkboxesTypesChecked.findIndex(e => e === element);
                checkboxesTypesChecked.splice(find, 1);
            }
        });
        div.append(input);
        let label = document.createElement('label');
        label.textContent = element.toString();
        label.htmlFor = "type-" + element;
        div.append(label);
        checkBoxesTypes.append(div);
        checkBoxesDiv.append(checkBoxesTypes);
    });
    const submitTypes = document.createElement('button');
    submitTypes.textContent = "OK";
    submitTypes.addEventListener('click', () => {
        if (typeof checkboxesTypesChecked[0] !== 'undefined') {
            // TODO: remove all App children
            while (App.firstChild) {
                App.removeChild(App.firstChild);
            }
            console.log('on click submitTypes');
            checkboxesTypesChecked.forEach(element => fetchPkmBy(element, URL_ALL_PKM, addPokeCards));
            console.log('after click submitTypes');
        }
        console.log(checkboxesTypesChecked);
        navbar.removeChild(checkBoxesDiv);
    });
    checkBoxesTypes.append(submitTypes);
    navbar.append(checkBoxesDiv);
});
function logData(data) {
    addPokeCards(data);
}
// ------------------------FUNCTIONS----------------------------
/**
 *
 * @param list takes list of all pokemons names to compare with value
 * @param _value value to be compared on list
 * @returns fetchOnePkm() -> with id find and put on idSearched
 */
export function submitSearch(list, _value) {
    let idSearched;
    for (let obj of list) {
        if (toNoAccent(obj.name.toLowerCase()) === toNoAccent(_value.toLowerCase())) {
            idSearched = obj.pokeid;
            fetchOnePkm(URL_ALL_PKM, createModale, idSearched);
        }
    }
}
/**
 *
 * @param ElementHTML takes an HTMLUListElement to append <li> elements
 * @param list list of all pokemons to be compared
 */
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