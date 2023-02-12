"use strict";
const houses = [
    { name: "Atreides", planets: "Calladan" },
    { name: "Corrino", planets: ["Kaitan", "Salusa Secundus"] },
    { name: "Harkonnen", planets: ["Giedi Prime", "Arrakis"] },
];
function findHouses(houses, filter) {
    let modifiedHouses = ((typeof houses === "string") ? JSON.parse(houses) : houses);
    let housesWithId = modifiedHouses.map((house, index) => {
        return Object.assign(Object.assign({}, house), { id: index });
    });
    if (filter) {
        housesWithId = housesWithId.filter(filter);
    }
    return housesWithId;
}
console.log(findHouses(JSON.stringify(houses), ({ name }) => name === "Atreides"));
console.log(findHouses(houses, ({ name }) => name === "Harkonnen"));
