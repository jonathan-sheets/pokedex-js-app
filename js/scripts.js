// IIFE
let pokemonRepository = (function () {
  let pokemonList = [];
  let apiUrl = "https://pokeapi.co/api/v2/pokemon/?limit=500";
  

  function add(pokemon) {
    if (
      typeof pokemon === "object" &&
      "name" in pokemon &&
      "detailsUrl" in pokemon
    ) {
      pokemonList.push(pokemon);
    }
  }
  function getAll() {
    return pokemonList;
  }
  function addListItem(pokemon) {
    pokemonRepository.loadDetails(pokemon).then(function () {
      let $pokemonList = $(".pokemon-list");
      let $listItem = $('<li id="list">');
      let $button = $('<button>' + pokemon.name + '</button>');
      let $image = $('<img class="button-icon" alt="button image" />');
      $image.attr("src", pokemon.imageUrl);
      $button.addClass("btn btn-light btn-lg");
      $button.append($image);
      $listItem.append($button);
      $pokemonList.append($listItem);
      $button.on("click", function (event) {
        showDetails(pokemon);
      });
    });
  }

  function showDetails(pokemon) {
    pokemonRepository.loadDetails(pokemon).then(function () {
      showModal(pokemon);
      console.log(pokemon);
    });
  }

  function loadList() {
    return $.ajax(apiUrl)
      .then(function (json) {
        json.results.forEach(function (item) {
          let pokemon = {
            name: item.name,
            detailsUrl: item.url,
          };
          add(pokemon);
        });
      })
      .catch(function (e) {
        console.error(e);
      });
  }

  function loadDetails(pokemon) {
    let url = pokemon.detailsUrl;
    return $.ajax(url)
      .then(function (details) {
        // Add details to the pokemon
        pokemon.imageUrl = details.sprites.other.dream_world.front_default;
        // pokemon.imageUrlBack = details.sprites.versions['generation-v']['black-white'].animated.back_default;
        pokemon.height = details.height;
        pokemon.weight = details.weight;
        pokemon.types = [];
        for (let i = 0; i < details.types.length; i++) {
          pokemon.types.push(details.types[i].type.name);
        }
        if (pokemon.types[0].includes("grass")) {
          $('.modal-body, .modal-header, .modal-footer').css("background-color",
            "rgb(" + 0 + "," + 211 + "," + 0 + "," + 0.75 + ")");
        } else if (pokemon.types[0].includes("fire")) {
          $('.modal-body, .modal-header, .modal-footer').css("background-color",
            "rgb(" + 255 + "," + 0 + "," + 0 + "," + 0.75 + ")");
        } else if (pokemon.types[0].includes("electric")) {
          $('.modal-body, .modal-header, .modal-footer').css("background-color",
            "rgb(" + 243 + "," + 241 + "," + 0 + "," + 0.75 + ")");
        } else if (pokemon.types[0].includes("poison")) {
          $('.modal-body, .modal-header, .modal-footer').css("background-color", 
            "rgb(" + 137 + "," + 2 + "," + 211 + "," + 0.75 + ")");
        } else if (pokemon.types[0].includes("flying")) {
          $('.modal-body, .modal-header, .modal-footer').css("background-color",
            "rgb(" + 2 + "," + 155 + "," + 255 + "," + 0.75 + ")");
        } else if (pokemon.types[0].includes("water")) {
          $('.modal-body, .modal-header, .modal-footer').css("background-color",
            "rgb(" + 3 + "," + 52 + "," + 255 + "," + 0.75 + ")");
        } else if (pokemon.types[0].includes("normal")) {
          $('.modal-body, .modal-header, .modal-footer').css("background-color",
            "rgb(" + 255 + "," + 151 + "," + 0 + "," + 0.75 + ")");
        } else if (pokemon.types[0].includes("fighting")) {
          $('.modal-body, .modal-header, .modal-footer').css("background-color",
            "rgb(" + 242 + "," + 0 + "," + 137 + "," + 0.75 + ")");
        } else if (pokemon.types[0].includes("ground")) {
          $('.modal-body, .modal-header, .modal-footer').css("background-color",
            "rgb(" + 179 + "," + 87 + "," + 0 + "," + 0.75 + ")");
        } else if (pokemon.types[0].includes("rock")) {
          $('.modal-body, .modal-header, .modal-footer').css("background-color",
            "rgb(" + 161 + "," + 149 + "," + 137 + "," + 0.75 + ")");
        } else if (pokemon.types[0].includes("bug")) {
          $('.modal-body, .modal-header, .modal-footer').css("background-color",
            "rgb(" + 163 + "," + 88 + "," + 142 + "," + 0.75 + ")");
        } else if (pokemon.types[0].includes("ghost")) {
          $('.modal-body, .modal-header, .modal-footer').css("background-color",
            "rgb(" + 255 + "," + 255 + "," + 255 + "," + 0.75 + ")");
        } else if (pokemon.types[0].includes("steel")) {
          $('.modal-body, .modal-header, .modal-footer').css("background-color",
            "rgb(" + 132 + "," +132 + "," + 132 + "," + 0.75 + ")");
        } else if (pokemon.types[0].includes("psychic")) {
          $('.modal-body, .modal-header, .modal-footer').css("background-color",
            "rgb(" + 235 + "," + 95 + "," + 80 + "," + 0.75 + ")");
        } else if (pokemon.types[0].includes("ice")) {
          $('.modal-body, .modal-header, .modal-footer').css("background-color",
            "rgb(" + 19 + "," + 131 + "," + 255 + "," + 0.75 + ")");
        } else if (pokemon.types[0].includes("dragon")) {
          $('.modal-body, .modal-header, .modal-footer').css("background-color",
            "rgb(" + 250 + "," + 103 + "," + 44 + "," + 0.75 + ")");
        } else if (pokemon.types[0].includes("dark")) {
          $('.modal-body, .modal-header, .modal-footer').css("background-color",
            "rgb(" + 50 + "," + 50 + "," + 50 + "," + 0.75 + ")");
        } else if (pokemon.types[0].includes("fairy")) {
          $('.modal-body, .modal-header, .modal-footer').css("background-color",
            "rgb(" + 229 + "," + 131 + "," + 229 + "," + 0.75 + ")");
        }
        pokemon.abilities = [];
        for (let i = 0; i < details.abilities.length; i++) {
          pokemon.abilities.push(details.abilities[i].ability.name);
        }
      })
      .catch(function (e) {
        console.error(e);
      });
  }

  // to show the modal content
  function showModal(pokemon) {
    let $modalHeader = $(".modal-header");
    let $modalBody = $(".modal-body");
    let $modalTitle = $(".modal-title");

    $('#pokedexModal').modal('show');

    // to clear the content of the modal
    $modalTitle.empty();
    $modalBody.empty();

    let nameElement = $("<h1>" + pokemon.name + "</h1>");
    let imageElement = $('<img class="modal-img" alt="pokemon image">');
    imageElement.attr("src", pokemon.imageUrl);
    // let imageElementBack = $('<img class="modal-img-back">');
    // imageElementBack.attr("src", pokemon.imageUrlBack);
    let heightElement = $('<p>' + 'Height: ' + pokemon.height + '</p>');
    let weightElement = $('<p>' + 'Weight: ' + pokemon.weight + '</p>');
    let typesElement = $('<p>' + 'Types: ' + pokemon.types + '</p>');
    
    let abilitiesElement = $('<p>' + 'Abilities: ' + pokemon.abilities + '</p>');

    $modalTitle.append(nameElement);
    $modalBody.append(imageElement);
    $modalBody.append(heightElement);
    $modalBody.append(weightElement);
    $modalBody.append(typesElement);
    $modalBody.append(abilitiesElement);
  }

  return {
    add: add,
    getAll: getAll,
    addListItem: addListItem,
    loadList: loadList,
    loadDetails: loadDetails,
    showDetails: showDetails,
    showModal: showModal,
  };
})();

pokemonRepository.loadList().then(function () {
  // Now the data is loaded!
  pokemonRepository.getAll().forEach(function (pokemon) {
    pokemonRepository.addListItem(pokemon);
  });
});

function myFunction() {
  let input, filter, ul, li, a, i, txtValue;
  input = document.getElementById("myInput");
  filter = input.value.toUpperCase();
  ul = document.getElementById("myUL");
  li = ul.querySelectorAll("#list");
  // console.log(li[0].querySelector("#test").getElementsByTagName("button")[0]);
  // li = ul.getElementsByTagName("li");
  for (i = 0; i < li.length; i++) {
    a = li[i].getElementsByTagName("button")[0];
    console.log(a.innerText);
    txtValue = a.textContent || a.innerText;
    if (txtValue.toUpperCase().indexOf(filter) > -1) {
      li[i].style.display = "";
    } else {
      li[i].style.display = "none";
    }
  }
}