// IIFE
let pokemonRepository = (function () {
  let pokemonList = [];
  let apiUrl = "https://pokeapi.co/api/v2/pokemon/?limit=500";
  let modalContainer = document.querySelector("#modal-container");

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
    let ul = document.querySelector(".pokemon-list");
    let li = document.createElement("li");
    let button = document.createElement("button");
    button.innerText = pokemon.name;
    button.classList.add("button");
    li.appendChild(button);
    ul.appendChild(li);
    button.addEventListener("click", function (event) {
      showDetails(pokemon);
    });
  }

  function loadList() {
    return fetch(apiUrl)
      .then(function (response) {
        return response.json();
      })
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
    return fetch(url)
      .then(function (response) {
        return response.json();
      })
      .then(function (details) {
        // Add details to the pokemon
        pokemon.imageUrl = details.sprites.other.dream_world.front_default;
        pokemon.imageUrlBack = details.sprites.versions['generation-v']['black-white'].animated.back_default;
        pokemon.height = details.height;
        pokemon.types = [];
        details.types.forEach(function (typeName) {
          pokemon.types.push(typeName.type.name)
        })
        pokemon.abilities = [];
        details.abilities.forEach(function (abilityName) {
          pokemon.abilities.push(abilityName.ability.name)
        })
      })
      .catch(function (e) {
        console.error(e);
      });
  }

  function showDetails(pokemon) {
    pokemonRepository.loadDetails(pokemon).then(function () {
      showModal(pokemon);
      console.log(pokemon);
    });
  }

  // to show the modal content
  function showModal(pokemon) {
    let modalContainer = document.querySelector("#modal-container");
    // to clear the content of the modal
    modalContainer.innerHTML = "";
    // create a div element
    let modal = document.createElement("div");
    // add class to div element
    modal.classList.add("modal");
    // create close button
    let closeButtonElement = document.createElement("button");
    closeButtonElement.classList.add("modal-close");
    closeButtonElement.innerText = "close";
    // add event listener for button click
    closeButtonElement.addEventListener("click", hideModal);
    // create name element for modal content
    let nameElement = document.createElement("h1");
    nameElement.innerText = pokemon.name;
    // create image for modal content
    let imageElement = document.createElement("img");
    imageElement.classList.add("modal-img");
    imageElement.setAttribute("src", pokemon.imageUrl);

    let imageElementBack = document.createElement("img");
    imageElementBack.classList.add("modal-img-back");
    imageElementBack.setAttribute("src", pokemon.imageUrlBack);
    // create height element for modal content
    let heightElement = document.createElement("p");
    heightElement.innerText = "Height: " + pokemon.height;
    // put types element for modal content here
    let typesElement = document.createElement("p");
    typesElement.innerText = "Types: " + pokemon.types;
    if (pokemon.types.includes("grass")) {
      modal.style.backgroundColor =
        "rgb(" + 0 + "," + 211 + "," + 0 + "," + 0.75 + ")";
    } else if (pokemon.types.includes("fire")) {
      modal.style.backgroundColor =
        "rgb(" + 255 + "," + 0 + "," + 0 + "," + 0.75 + ")";
    } else if (pokemon.types.includes("electric")) {
      modal.style.background =
        "rgb(" + 243 + "," + 241 + "," + 0 + "," + 0.75 + ")";
    } else if (pokemon.types.includes("poison")) {
      modal.style.background =
        "rgb(" + 137 + "," + 2 + "," + 211 + "," + 0.75 + ")";
    } else if (pokemon.types.includes("flying")) {
      modal.style.background =
        "rgb(" + 2 + "," + 155 + "," + 255 + "," + 0.75 + ")";
    } else if (pokemon.types.includes("water")) {
      modal.style.background =
        "rgb(" + 3 + "," + 52 + "," + 255 + "," + 0.75 + ")";
    } else if (pokemon.types.includes("normal")) {
      modal.style.background =
        "rgb(" + 255 + "," + 151 + "," + 0 + "," + 0.75 + ")";
    } else if (pokemon.types.includes("fighting")) {
      modal.style.background =
        "rgb(" + 242 + "," + 0 + "," + 137 + "," + 0.75 + ")";
    } else if (pokemon.types.includes("ground")) {
      modal.style.background =
        "rgb(" + 179 + "," + 87 + "," + 0 + "," + 0.75 + ")";
    } else if (pokemon.types.includes("rock")) {
      modal.style.background =
        "rgb(" + 161 + "," + 149 + "," + 137 + "," + 0.75 + ")";
    } else if (pokemon.types.includes("bug")) {
      modal.style.background =
        "rgb(" + 163 + "," + 88 + "," + 142 + "," + 0.75 + ")";
    } else if (pokemon.types.includes("ghost")) {
      modal.style.background =
        "rgb(" + 255 + "," + 255 + "," + 255 + "," + 0.75 + ")";
    } else if (pokemon.types.includes("steel")) {
      modal.style.background =
        "rgb(" + 132 + "," +132 + "," + 132 + "," + 0.75 + ")";
    } else if (pokemon.types.includes("psychic")) {
      modal.style.background =
        "rgb(" + 235 + "," + 95 + "," + 80 + "," + 0.75 + ")";
    } else if (pokemon.types.includes("ice")) {
      modal.style.background =
        "rgb(" + 19 + "," + 131 + "," + 255 + "," + 0.75 + ")";
    } else if (pokemon.types.includes("dragon")) {
      modal.style.background =
        "rgb(" + 250 + "," + 103 + "," + 44 + "," + 0.75 + ")";
    } else if (pokemon.types.includes("dark")) {
      modal.style.background =
        "rgb(" + 50 + "," + 50 + "," + 50 + "," + 0.75 + ")";
        modal.style.color = "white";
    } else if (pokemon.types.includes("fairy")) {
      modal.style.background =
        "rgb(" + 229 + "," + 131 + "," + 229 + "," + 0.75 + ")";
    }
    let abilitiesElement = document.createElement("p");
    abilitiesElement.innerText = "Abilities: " + pokemon.abilities;

    modal.appendChild(closeButtonElement);
    modal.appendChild(nameElement);
    modal.appendChild(imageElement);
    modal.appendChild(imageElementBack);
    modal.appendChild(heightElement);
    modal.appendChild(typesElement);
    modal.appendChild(abilitiesElement);
    modalContainer.appendChild(modal);
    // add class to show modal
    modalContainer.classList.add("is-visible");
  }

  // hide modal when close button clicked
  function hideModal() {
    let modalContainer = document.querySelector("#modal-container");
    modalContainer.classList.remove("is-visible");
  }

  // hide modal when escape key is pressed
  window.addEventListener("keydown", (e) => {
    let modalContainer = document.querySelector("#modal-container");
    if (e.key === "Escape" && modalContainer.classList.contains("is-visible")) {
      hideModal();
    }
  });

  // hide modal if mouse clicked outside
  modalContainer.addEventListener("click", (e) => {
    let target = e.target;
    if (target === modalContainer) {
      hideModal();
    }
  });

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


