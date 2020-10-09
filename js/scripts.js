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
  function addListItem(pokemon = {}) {
    let $pokemonList = $(".pokemon-list");
    let $listItem = $("<li>");
    let $button = $('<button class="button">' + pokemon.name + '</button>');
    $listItem.append($button);
    $pokemonList.append($listItem);
    $button.on("click", function (event) {
      showDetails(pokemon);
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
        pokemon.imageUrlBack = details.sprites.versions['generation-v']['black-white'].animated.back_default;
        pokemon.height = details.height;
        pokemon.types = [];
        for (let i = 0; i < details.types.length; i++) {
          pokemon.types.push(details.types[i].type.name);
        }
        // if (pokemon.types.includes("grass")) {
        //   $('#modal-container').css("background-color",
        //     "rgb(" + 0 + "," + 211 + "," + 0 + "," + 0.75 + ")");
        // } else if (pokemon.types.includes("fire")) {
        //   $('#modal-container').css("background-color",
        //     "rgb(" + 255 + "," + 0 + "," + 0 + "," + 0.75 + ")");
        // } else if (pokemon.types.includes("electric")) {
        //   $('#modal-container').css("background-color",
        //     "rgb(" + 243 + "," + 241 + "," + 0 + "," + 0.75 + ")");
        // } else if (pokemon.types.includes("poison")) {
        //   $('#modal-container').css("background-color",
        //     "rgb(" + 137 + "," + 2 + "," + 211 + "," + 0.75 + ")");
        //   $('#modal-container').css("background-color", "white");
        // } else if (pokemon.types.includes("flying")) {
        //   $('#modal-container').css("background-color",
        //     "rgb(" + 2 + "," + 155 + "," + 255 + "," + 0.75 + ")");
        // } else if (pokemon.types.includes("water")) {
        //   $('#modal-container').css("background-color",
        //     "rgb(" + 3 + "," + 52 + "," + 255 + "," + 0.75 + ")");
        // } else if (pokemon.types.includes("normal")) {
        //   $('#modal-container').css("background-color",
        //     "rgb(" + 255 + "," + 151 + "," + 0 + "," + 0.75 + ")");
        // } else if (pokemon.types.includes("fighting")) {
        //   $('#modal-container').css("background-color",
        //     "rgb(" + 242 + "," + 0 + "," + 137 + "," + 0.75 + ")");
        // } else if (pokemon.types.includes("ground")) {
        //   $('#modal-container').css("background-color",
        //     "rgb(" + 179 + "," + 87 + "," + 0 + "," + 0.75 + ")");
        // } else if (pokemon.types.includes("rock")) {
        //   $('#modal-container').css("background-color",
        //     "rgb(" + 161 + "," + 149 + "," + 137 + "," + 0.75 + ")");
        // } else if (pokemon.types.includes("bug")) {
        //   $('#modal-container').css("background-color",
        //     "rgb(" + 163 + "," + 88 + "," + 142 + "," + 0.75 + ")");
        // } else if (pokemon.types.includes("ghost")) {
        //   $('#modal-container').css("background-color",
        //     "rgb(" + 255 + "," + 255 + "," + 255 + "," + 0.75 + ")");
        // } else if (pokemon.types.includes("steel")) {
        //   $('#modal-container').css("background-color",
        //     "rgb(" + 132 + "," +132 + "," + 132 + "," + 0.75 + ")");
        // } else if (pokemon.types.includes("psychic")) {
        //   $('#modal-container').css("background-color",
        //     "rgb(" + 235 + "," + 95 + "," + 80 + "," + 0.75 + ")");
        // } else if (pokemon.types.includes("ice")) {
        //   $('#modal-container').css("background-color",
        //     "rgb(" + 19 + "," + 131 + "," + 255 + "," + 0.75 + ")");
        // } else if (pokemon.types.includes("dragon")) {
        //   $('#modal-container').css("background-color",
        //     "rgb(" + 250 + "," + 103 + "," + 44 + "," + 0.75 + ")");
        // } else if (pokemon.types.includes("dark")) {
        //   $('#modal-container').css("background-color",
        //     "rgb(" + 50 + "," + 50 + "," + 50 + "," + 0.75 + ")");
        // } else if (pokemon.types.includes("fairy")) {
        //   $('#modal-container').css("background-color",
        //     "rgb(" + 229 + "," + 131 + "," + 229 + "," + 0.75 + ")");
        // }
        pokemon.abilities = [];
        for (let i = 0; i < details.abilities.length; i++) {
          pokemon.abilities.push(details.abilities[i].ability.name);
        }
        // details.abilities.forEach(function (abilityName) {
        //   pokemon.abilities.push(abilityName.ability.name)
        // })
      })
      .catch(function (e) {
        console.error(e);
      });
  }

  // to show the modal content
  function showModal(pokemon) {
    let $modalContainer = $("#modal-container");
    // to clear the content of the modal
    $modalContainer.empty();
    // create a div element and add class modal
    let modal = $('<div class="modal"></div>');
    // create close button
    let closeButtonElement = $('<button class="modal-close">close</button>');
    // add event listener for button click
    closeButtonElement.on("click", hideModal);
    // create name element for modal content
    let nameElement = $("<h1>" + pokemon.name + "</h1>");
    // create images for modal content
    let imageElement = $('<img class="modal-img">');
    imageElement.attr("src", pokemon.imageUrl);
    let imageElementBack = $('<img class="modal-img-back">');
    imageElementBack.attr("src", pokemon.imageUrlBack);
    // create height element for modal content
    let heightElement = $('<p>' + 'Height: ' + pokemon.height + '</p');
    // put types element for modal content here
    let typesElement = $('<p>' + 'Types: ' + pokemon.types + '</p>');
    
    let abilitiesElement = $('<p>' + 'Abilities: ' + pokemon.abilities + '</p>');

    modal.append(closeButtonElement);
    modal.append(nameElement);
    modal.append(imageElement);
    modal.append(imageElementBack);
    modal.append(heightElement);
    modal.append(typesElement);
    modal.append(abilitiesElement);
    $modalContainer.append(modal);
    // add class to show modal
    $modalContainer.addClass("is-visible");
  }

  // hide modal when close button clicked
  function hideModal() {
    let $modalContainer = $("#modal-container");
    $modalContainer.removeClass("is-visible");
  }

  // hide modal when escape key is pressed
  jQuery(window).on("keydown", (e) => {
    let $modalContainer = $("#modal-container");
    if (e.key === "Escape" && $modalContainer.hasClass("is-visible")) {
      hideModal();
    }
  });

  // hide modal if mouse clicked outside
  let $modalContainer = document.querySelector('#modal-container');
  $modalContainer.addEventListener("click", e => {
    let target = e.target;
    if (target === $modalContainer) {
      hideModal();
    }
  })

  return {
    add: add,
    getAll: getAll,
    addListItem: addListItem,
    loadList: loadList,
    loadDetails: loadDetails,
    showDetails: showDetails,
    showModal: showModal,
    hideModal: hideModal,
  };
})();

pokemonRepository.loadList().then(function () {
  // Now the data is loaded!
  pokemonRepository.getAll().forEach(function (pokemon) {
    pokemonRepository.addListItem(pokemon);
  });
});


