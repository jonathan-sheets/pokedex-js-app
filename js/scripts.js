//creates pokemonList variable with multiple objects//
let pokemonList = [
  {
    name: "Bulbasaur",
    height: 0.7,
    types: ["poison", "grass"],
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
    types: ["normal", "flying"],
  },
  {
    name: "Vigoroth",
    height: 1.4,
    types: ["normal"],
  },
];

//for loop that iterates over each item in pokemonList variable
for (let i = 0; i < pokemonList.length; i++) {
  //creates variable and conditional regarding size of pokemon
  let size;
  if (pokemonList[i].height > 1.4) {
    size = "<br><span>This is a big Pokemon</span>"; //will print if size is greater than 1.7
  } else if (pokemonList[i].height >= 1 && pokemonList[i].height <= 1.4) {
    size = "<br><span>This is a medium Pokemon</span>";
  } else {
    size = "<br><span>This is a small Pokemon</span>";
  }

  //for loop inside above for loop iterating over each types array
  let color;
  for (let k = 0; k < pokemonList[i].types.length; k++)  {
    //conditional regarding types of pokemon
    if (pokemonList[i].types[k] == "grass")  {
      color = '<span style="color:green;">'; //using CSS to change color based on type
    } else if (pokemonList[i].types[k] == "ground") {
      color = '<span style="color:brown;">';
    } else if (pokemonList[i].types[k] == "water") {
      color = '<span style="color:blue;">';
    } else if (pokemonList[i].types[k] == "flying") {
      color = '<span style="color:lightblue;">';
    } else if (pokemonList[i].types[k] == "normal") {
      color = '<span style="color:orange;">';
    } else if (pokemonList[i].types[k] == "poison") {
      color = '<span style="color:purple;">';
    }
  }

  document.write(
    '<div class="box">' + //HTML used within JS
      pokemonList[i].name +
      " (height: " +
      pokemonList[i].height +
      "m" +
      ")" +
      " " +
      size + '<br>'
      + color +
      pokemonList[i].types +
      " " +
      "</div>"
  );
}