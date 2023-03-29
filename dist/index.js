import './navSearch.js';
import { PokeCard } from './pokeCard.js';
import { fetchAllPkms, URL_ALL_PKM } from './request.js';
import { addPokeCard } from './Fuctions.js';
export const App = document.querySelector('#app');
window.customElements.define('poke-card', PokeCard);
fetchAllPkms(URL_ALL_PKM, addPokeCard);
//# sourceMappingURL=index.js.map