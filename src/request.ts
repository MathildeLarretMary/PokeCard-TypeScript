/* API : 'https://pokebuildapi.fr/api/v1'*/

//----------------------------CONSTANTES-------------------------------
export const URL_ALL_PKM:string = 'https://pokebuildapi.fr/api/v1/pokemon'


//------------------------------FECHTES-------------------------------

/**
 * 
 * @param _url paramètre qui prend l'URL pour la méthodes fetch()
 * @param callback fonction callback qui va exécuter la fonction sur les éléments récupérés
 * @param callback ici (data : {}[]) => {}[] ---> les données passées et retournées sont un tableau d'objet ===> JSON
 * @returns 
 */
export const fetchIt = async (_url:string , callback: (datas : Data[]) => {}[] ) => {
    // Pour vérifier que tout se passe bien, on utilise un block "try/catch"
    try {
        // response va récupérer les résultats de la requête avec fetch()
        let response = await fetch(_url)
        // if status === 200, ---> tout est ok
        if(response.ok) {
            // on met le résultat de response.json() dans un table d'objets nommé "data"
            let data:Data[] = await response.json()
            console.log(data);
            
            // on donne ensuite ce tableau d'objet à la fonction callback
            callback(data)
            // return pour finir l'instruction de la fonction
            return 
        }
        // Si la réponse est différente du status 200, on crée une nouvelle Erreur
        throw new Error('Impossible de contacter le Serveur')
    } catch (error) {
        console.log(error);
    }
}

//----------------------------DEFINITIONS-------------------------------
// On crée le type de ce que l'on reçois 
// (ex: dans les paramètres d'une fonction)
export interface Data {
    id:number,
    name:string,
    image: string,
    sprite: string,
    apiGeneration:number,
    stats : {
        HP:number,
        attack:number,
        defense:number,
        special_attack:number,
        special_defense:number,
        speed:number
    },
    apiTypes: [{name:string}, {name?:string}]
}

// Interface de ce qu'on souhaite avoir au final ---> on crée donc un nouveau type
interface PokemonName {
    pokeid: number,
    name: string,
}

// on crée le tableau qui va acueillir tous les objets de type pokemonName
export let pkmNameList: PokemonName[] = []


//----------------------------FONCTIONS CALLBACK-------------------------------
/**
 * 
 * @param datas prends un paramètre du type Datas ---> interface Datas
 * @returns pkmNameList - Tableau rempli d'objets de type PokemonName
 */
export function getAllNames(data : Data[]) : PokemonName[] {
    // console.log(datas);
    
    // pour chaque élément dans datas
    for(let datum of data) {
        // crée un objet de type PokemonName
        const pkmNameId: PokemonName = {
            pokeid: datum.id,
            name: datum.name,
        }  
        // puis on push l'objet dans le tableau pkmNameList
        pkmNameList.push(pkmNameId) 
    }
    // console.log(pkmNameList);
    
    return pkmNameList
}

//----------------------------USE FECTHES FUNCTIONS-------------------------------
fetchIt(URL_ALL_PKM, getAllNames) 
// getAllPkms(datas : {}[]) ---> callbak: (datas : {}[])






