import './navSearch.js';
import { PokeCard } from './pokeCard.js';
import { fetchAllPkms, URL_ALL_PKM } from './request.js';
import { addPokeCards } from './Fuctions.js';
export const App = document.querySelector('#app');
window.customElements.define('poke-card', PokeCard);
fetchAllPkms(URL_ALL_PKM, addPokeCards);
//# sourceMappingURL=index.js.map