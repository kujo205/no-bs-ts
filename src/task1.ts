const houses = [
  { name: "Atreides", planets: "Calladan" },
  { name: "Corrino", planets: ["Kaitan", "Salusa Secundus"] },
  { name: "Harkonnen", planets: ["Giedi Prime", "Arrakis"] },
];

interface House {
  name: string;
  planets: string | string[];
}

interface HouseWithID extends House {
  id: string;
}

function findHouses(
  houses: House[] | string,
  filter?: (house: House) => boolean
): HouseWithID[] {
  
  let modifiedHouses = ((typeof houses === "string")?JSON.parse(houses):houses) as House[];
    let housesWithId=modifiedHouses.map((house,index) => {
    return {
      ...house,
      id: index,
    };
  }) as unknown as HouseWithID[];

  if (filter) {
    housesWithId = housesWithId.filter(filter);
  }

  return housesWithId;
}

console.log(
  findHouses(JSON.stringify(houses), ({ name }) => name === "Atreides")
);
console.log(findHouses(houses, ({ name }) => name === "Harkonnen"));
