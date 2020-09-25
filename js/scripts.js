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

// forEach loop that iterates over each item in pokemonList variable
pokemonList.forEach(function(pokemon) {
  let size;
  if (pokemon.height > 1.4) {
    size = "<br><span>This is a big Pokemon</span>";
  } else if (pokemon.height >= 1 && pokemon.height <= 1.4) {
    size = "<br><span>This is a medium Pokemon</span>";
  } else {
    size = "<br><span>This is a small Pokemon</span>";
  }

  //forEach loop inside above forEach loop iterating over each types array
  let color;
  pokemon.types.forEach(function(pokemonType)  {
    if (pokemonType == "grass")  {
      color = '<span style="color:#81be71;">';
    } else if (pokemonType == "ground") {
      color = '<span style="color:#714f32;">';
    } else if (pokemonType == "water") {
      color = '<span style="color:#1242b2;">';
    } else if (pokemonType == "flying") {
      color = '<span style="color:#02d5e9;">';
    } else if (pokemonType == "normal") {
      color = '<span style="color:#ff8900;">';
    } else if (pokemonType == "poison") {
      color = '<span style="color:#9b07ec;">';
    }
  });

  document.write(
    '<div class="box">' +
      pokemon.name +
      " (height: " +
      pokemon.height +
      "m" +
      ")" +
      " " +
      size + '<br>'
      + color +
      pokemon.types +
      " " +
      "</div>"
  );
});