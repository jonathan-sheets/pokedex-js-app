// IIFE
let pokemonRepository = (function () {
  let pokemonList = [];
  let apiUrl = "https://pokeapi.co/api/v2/pokemon/?limit=150";
  

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
      let $listItem = $("<li>");
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
        if (pokemon.types.includes("grass")) {
          $('.modal-body, .modal-header, .modal-footer').css("background-color",
            "rgb(" + 0 + "," + 211 + "," + 0 + "," + 0.75 + ")");
        } else if (pokemon.types.includes("fire")) {
          $('.modal-body, .modal-header, .modal-footer').css("background-color",
            "rgb(" + 255 + "," + 0 + "," + 0 + "," + 0.75 + ")");
        } else if (pokemon.types.includes("electric")) {
          $('.modal-body, .modal-header, .modal-footer').css("background-color",
            "rgb(" + 243 + "," + 241 + "," + 0 + "," + 0.75 + ")");
        } else if (pokemon.types.includes("poison")) {
          $('.modal-body, .modal-header, .modal-footer').css("background-color", 
            "rgb(" + 137 + "," + 2 + "," + 211 + "," + 0.75 + ")");
        } else if (pokemon.types.includes("flying")) {
          $('.modal-body, .modal-header, .modal-footer').css("background-color",
            "rgb(" + 2 + "," + 155 + "," + 255 + "," + 0.75 + ")");
        } else if (pokemon.types.includes("water")) {
          $('.modal-body, .modal-header, .modal-footer').css("background-color",
            "rgb(" + 3 + "," + 52 + "," + 255 + "," + 0.75 + ")");
        } else if (pokemon.types.includes("normal")) {
          $('.modal-body, .modal-header, .modal-footer').css("background-color",
            "rgb(" + 255 + "," + 151 + "," + 0 + "," + 0.75 + ")");
        } else if (pokemon.types.includes("fighting")) {
          $('.modal-body, .modal-header, .modal-footer').css("background-color",
            "rgb(" + 242 + "," + 0 + "," + 137 + "," + 0.75 + ")");
        } else if (pokemon.types.includes("ground")) {
          $('.modal-body, .modal-header, .modal-footer').css("background-color",
            "rgb(" + 179 + "," + 87 + "," + 0 + "," + 0.75 + ")");
        } else if (pokemon.types.includes("rock")) {
          $('.modal-body, .modal-header, .modal-footer').css("background-color",
            "rgb(" + 161 + "," + 149 + "," + 137 + "," + 0.75 + ")");
        } else if (pokemon.types.includes("bug")) {
          $('.modal-body, .modal-header, .modal-footer').css("background-color",
            "rgb(" + 163 + "," + 88 + "," + 142 + "," + 0.75 + ")");
        } else if (pokemon.types.includes("ghost")) {
          $('.modal-body, .modal-header, .modal-footer').css("background-color",
            "rgb(" + 255 + "," + 255 + "," + 255 + "," + 0.75 + ")");
        } else if (pokemon.types.includes("steel")) {
          $('.modal-body, .modal-header, .modal-footer').css("background-color",
            "rgb(" + 132 + "," +132 + "," + 132 + "," + 0.75 + ")");
        } else if (pokemon.types.includes("psychic")) {
          $('.modal-body, .modal-header, .modal-footer').css("background-color",
            "rgb(" + 235 + "," + 95 + "," + 80 + "," + 0.75 + ")");
        } else if (pokemon.types.includes("ice")) {
          $('.modal-body, .modal-header, .modal-footer').css("background-color",
            "rgb(" + 19 + "," + 131 + "," + 255 + "," + 0.75 + ")");
        } else if (pokemon.types.includes("dragon")) {
          $('.modal-body, .modal-header, .modal-footer').css("background-color",
            "rgb(" + 250 + "," + 103 + "," + 44 + "," + 0.75 + ")");
        } else if (pokemon.types.includes("dark")) {
          $('.modal-body, .modal-header, .modal-footer').css("background-color",
            "rgb(" + 50 + "," + 50 + "," + 50 + "," + 0.75 + ")");
        } else if (pokemon.types.includes("fairy")) {
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
    let imageElement = $('<img class="modal-img">');
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