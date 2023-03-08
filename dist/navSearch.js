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
//# sourceMappingURL=navSearch.js.map