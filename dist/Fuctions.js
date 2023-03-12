/**
 *
 * @param {*} string takes a string with accents
 * @returns string with no accents
 */
export function toNoAccent(string) {
    return string.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}
//# sourceMappingURL=Fuctions.js.map