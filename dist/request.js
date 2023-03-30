/* API : 'https://pokebuildapi.fr/api/v1'*/
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
//----------------------------CONSTANTES-------------------------------
export const URL_ALL_PKM = 'https://pokebuildapi.fr/api/v1/pokemon';
//------------------------------FECHTES-------------------------------
/**
 *
 * @param _url paramètre qui prend l'URL pour la méthodes fetch()
 * @param callback fonction callback qui va exécuter la fonction sur les éléments récupérés
 * @param callback ici (data : {}[]) => {}[] ---> les données passées et retournées sont un tableau d'objet ===> JSON
 * @returns
 */
export const fetchAllPkms = (_url, callback) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let response = yield fetch(_url);
        if (response.ok) {
            let data = yield response.json();
            callback(data);
            // return pour finir l'instruction de la fonction
            return;
        }
        throw new Error('Impossible de contacter le Serveur');
    }
    catch (error) {
        console.log(error);
    }
});
/**
 *
 * @param _url paramètre qui prend l'URL pour la méthodes fetch()
 * @param callback fonction callback qui va exécuter la fonction sur les éléments récupérés
 * @param _value élément passé dans param pour recherche plus précise number
 * @returns
 */
export const fetchOnePkm = (_url, callback, _value) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let response = yield fetch(_url + `/${_value}`);
        if (response.ok) {
            let data = yield response.json();
            callback(data);
            // return pour finir l'instruction de la fonction
            return;
        }
        throw new Error('Impossible de contacter le Serveur');
    }
    catch (error) {
        console.log(error);
    }
});
export function fetchPkmBy(element, _url, callback) {
    return __awaiter(this, void 0, void 0, function* () {
        if (typeof (element) === 'number') {
            console.log('by gen');
            try {
                let response = yield fetch(_url + `/generation/${element}`);
                if (response.ok) {
                    let data = yield response.json();
                    callback(data);
                    return;
                }
                throw new Error('Impossible de contacter le serveur fetchBy');
            }
            catch (error) {
                console.log(error);
            }
        }
        else if (typeof (element) === 'string') {
            console.log('by type');
            try {
                let response = yield fetch(_url + `/type/${element}`);
                if (response.ok) {
                    let data = yield response.json();
                    callback(data);
                    return;
                }
                throw new Error('Impossible de contacter le serveur fetchBy');
            }
            catch (error) {
                console.log(error);
            }
        }
    });
}
// on crée le tableau qui va acueillir tous les objets de type pokemonName
export let pkmNameList = [];
//----------------------------FONCTIONS CALLBACK-------------------------------
/**
 *
 * @param datas prends un paramètre du type Data ---> interface Data
 * @returns pkmNameList - Tableau rempli d'objets de type PokemonName
 */
export function getAllNames(data) {
    // console.log(datas);
    // pour chaque élément dans datas
    for (let datum of data) {
        // crée un objet de type PokemonName
        const pkmNameId = {
            pokeid: datum.id,
            name: datum.name,
        };
        // puis on push l'objet dans le tableau pkmNameList
        pkmNameList.push(pkmNameId);
    }
    // console.log(pkmNameList);
    return pkmNameList;
}
//----------------------------USE FECTHES FUNCTIONS-------------------------------
fetchAllPkms(URL_ALL_PKM, getAllNames);
//# sourceMappingURL=request.js.map