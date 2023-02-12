"use strict";
const houses = [
    { name: "Atreides", planets: "Calladan" },
    { name: "Corrino", planets: ["Kaitan", "Salusa Secundus"] },
    { name: "Harkonnen", planets: ["Giedi Prime", "Arrakis"] },
];
function findHouses(houses, filter) {
    if (typeof houses === 'string') {
        houses = JSON.parse(houses);
    }
    let housesWithId = houses.map(house => {
        return Object.assign(Object.assign({}, house), { id: house.name });
    });
    if (filter) {
        housesWithId = housesWithId.filter(filter);
    }
    return housesWithId;
}
console.log(findHouses(JSON.stringify(houses), ({ name }) => name === "Atreides"));
console.log(findHouses(houses, ({ name }) => name === "Harkonnen"));
