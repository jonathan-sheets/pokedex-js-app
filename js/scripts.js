//creates pokemonList variable with multiple objects//
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

//for loop that iterates over each item in pokemonList variable//
for (let i = 0; i < pokemonList.length; i++) {
  //creates variable and conditional regarding size of pokemon//
  let size;
  if (pokemonList[i].height > 1.7) {
    size = "<span> - Wow, that's big!</span>"; //will print if size is greater than 1.7//
  } else {
    size = ""; //will not print any text if size is less than 1.7//
  }
  document.write(
    '<div class="box">' + //HTML used within JS//
      pokemonList[i].name +
      " (height: " +
      pokemonList[i].height +
      "m" +
      ")" +
      " " +
      size +
      " " +
      "</div>"
  );
}