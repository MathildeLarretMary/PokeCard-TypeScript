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
export const fetchAllPkms = async (_url:string , callback: (data : Data[]) => void) => {

        try {
            let response = await fetch(_url)
    
            if(response.ok) {
                let data:Data[] = await response.json()
                
                callback(data)
                // return pour finir l'instruction de la fonction
                return 
            }
            throw new Error('Impossible de contacter le Serveur')
        } catch (error) {
            console.log(error);
        }

}
export let allPkms : Data[] = [] 

export const stockAllPkms = async (_url:string) =>  {

    try {
        let response = await fetch(_url)
        // .then(response => response.json())
        // .then(data =>{ return data })

        if(response.ok) {
            // let data: Data[] | void = await response.json()
            await response.json()
            .then(datum =>  {
                console.log(datum);
                allPkms = datum;
                return allPkms
            })
            
            // return pour finir l'instruction de la fonction
            // array.push(data)
        }
        throw new Error('Impossible de contacter le Serveur')
    } catch (error) {
        console.log(error);
    }

}

console.log(allPkms);


/**
 * 
 * @param _url paramètre qui prend l'URL pour la méthodes fetch()
 * @param callback fonction callback qui va exécuter la fonction sur les éléments récupérés
 * @param _value élément passé dans param pour recherche plus précise number 
 * @returns 
 */
export const fetchOnePkm = async (_url:string , callback: (data : Data) => void, _value:number) => {
    try {
        let response = await fetch(_url + `/${_value}`) 

        if(response.ok) {
            let data:Data = await response.json()
            
            callback(data)
            
            // return pour finir l'instruction de la fonction
            return 
        }
        throw new Error('Impossible de contacter le Serveur')
    } catch (error) {
        console.log(error);
    }
}

export async function fetchPkmBy(element:string|number, _url:string, callback : (data: Data[]) => void) {
    if(typeof(element)==='number') {
        console.log('by gen');
        try {
            let response = await fetch(_url + `/generation/${element}`)

            if(response.ok) {
                let data:Data[] = await response.json()

                callback(data)
                
                return
            }
            throw new Error('Impossible de contacter le serveur fetchBy')
            
        } catch (error) {
            console.log(error);
            
        }
    } else if (typeof(element)==='string') {
        console.log('by type');
        try {
            let response = await fetch(_url + `/type/${element}`)

            if(response.ok) {
                let data:Data[] = await response.json()

                callback(data)
                
                return
            }
            throw new Error('Impossible de contacter le serveur fetchBy')
            
        } catch (error) {
            console.log(error);
            
        }
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
    apiTypes: [{name:string}, {name?:string}],
    apiResistances: [{[props:string] : string | number}]
}

// Interface de ce qu'on souhaite avoir au final ---> on crée donc un nouveau type
export interface PokemonName {
    pokeid: number,
    name: string,
}

// on crée le tableau qui va acueillir tous les objets de type pokemonName
export let pkmNameList: PokemonName[] = []


//----------------------------FONCTIONS CALLBACK-------------------------------
/**
 * 
 * @param datas prends un paramètre du type Data ---> interface Data
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
fetchAllPkms(URL_ALL_PKM, getAllNames) 







