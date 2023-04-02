import './navSearch.js';
import { PokeCard } from './pokeCard.js';
import { fetchAllPkms, URL_ALL_PKM } from './request.js';
import { addPokeCards, scrollToTop, removeButtonAfterScroll } from './Fuctions.js';
export const App = document.querySelector('#app');
window.customElements.define('poke-card', PokeCard);
window.addEventListener('scroll', scrollToTop);
window.addEventListener('scroll', removeButtonAfterScroll);
fetchAllPkms(URL_ALL_PKM, addPokeCards);
//# sourceMappingURL=index.js.map