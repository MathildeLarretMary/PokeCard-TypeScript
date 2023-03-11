import { pkmNameList } from "./request.js";
// Get nav-input and nav-submit
const nav_input = document.querySelector('.nav-input');
const nav_submit = document.querySelector('.nav-submit');
nav_submit.addEventListener('click', () => {
    console.log('click');
    console.log(pkmNameList);
    if (nav_input.value !== "") {
        console.log(nav_input.value);
    }
});
nav_input.addEventListener('keyup', () => {
    //TODO: afficher les "name" de chaque pkm qui contient input.value
    //TODO: create list with all names includes input.value on keyup
    // REGEX!!!!!!!!!!!!
    console.log(nav_input.value);
});
//# sourceMappingURL=navSearch.js.map