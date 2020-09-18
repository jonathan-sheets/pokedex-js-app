let pokemonList = [
  {
    name: "Bulbasaur",
    height: 0.7,
    types: ["grass", "poison"],
  },
  {
    name: "Venusaur",
    height: 2,
    types: ["grass", "poison"],
  },
  {
    name: "Sandslash",
    height: 1,
    types: ["ground"],
  },
  {
    name: "Squirtle",
    height: 0.5,
    types: ["water"],
  },
  {
    name: "Noctowl",
    height: 1.6,
    types: ["flying", "normal"],
  },
  {
    name: "Vigoroth",
    height: 1.4,
    types: ["normal"],
  },
];

for (let i = 0; i < pokemonList.length; i++) {
  let size;
  if (pokemonList[i].height > 1.7) {
    size = '<span>"Wow, that\'s big!"</span>';
  } else {
    size = "";
  }
  document.write(
    '<div class="box">' +
      pokemonList[i].name +
      " (height: " +
      pokemonList[i].height +
      ")" +
      " " +
      size +
      " " +
      "</div>"
  );
}