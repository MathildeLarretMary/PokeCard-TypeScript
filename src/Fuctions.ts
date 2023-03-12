/**
 * 
 * @param {*} string takes a string with accents
 * @returns string with no accents
 */
export function toNoAccent(string: string) : string {
    return string.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}