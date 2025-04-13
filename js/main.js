document.querySelector("#buttonLower").addEventListener("click", getFetch)
document.querySelector("#buttonHigher").addEventListener("click", getFetch)

const cardImageHolder = document.querySelector("img")
const pokeInfo = document.querySelector("#pokeInfo")
const pointsHolder = document.querySelector("#points")

let pointScore = 0
let lastHPvalue = null

function getFetch(event) {
  const baseURL = "https://api.pokemontcg.io/v2/cards";
  const pokemonOnlyURL = baseURL + "?q=" + "supertype:Pokémon" + "&pageSize=1";

  fetch(pokemonOnlyURL)
    .then(res => res.json()) // parse response as JSON
    .then(objReceived => {
      // get the total amount of cards
      let totalAmountOfCards = objReceived.totalCount;
      // get a random card number to use in the next fetch()
      let randomCard = Math.floor(Math.random() * totalAmountOfCards) + 1; // +1 because there's no card number 0

      fetch(pokemonOnlyURL + `&page=${randomCard}`)
        .then(res => res.json()) // parse response as JSON
        .then(objReceived => {
          console.log(objReceived)
          // change image to a new pokémon card
          cardImageHolder.src = objReceived.data[0].images.large
          // show some info about the current pokémon
          pokeInfo.innerText = `${objReceived.data[0].name}, ${objReceived.data[0].hp} HP`

          // logic for adding or subtracting points
          const id = event?.target?.id
          const currentHP = Number(objReceived.data[0].hp)

          // logic for point system
          // only execute if lastHPvalue exists
          if (lastHPvalue !== null) {
            if (id === "buttonLower") {
              if (lastHPvalue > currentHP) {
                pointScore += 1;
              } else if (lastHPvalue < currentHP) {
                pointScore -= 1;
              }
            } else if (id === "buttonHigher") {
              if (lastHPvalue < currentHP) {
                pointScore += 1;
              } else if (lastHPvalue > currentHP) {
                pointScore -= 1;
              }
            }
          }

          // update lastHPvalue with the HP of the last pokémon
          lastHPvalue = currentHP;
          // show updated points (this needs to be after the point calculation)
          pointsHolder.innerText = `Points: ${pointScore}`;

        })
        .catch(err => {
          console.log(`Error fetching card: ${err}`);
        });
    })
    .catch(err => {
      console.log(`Error fetching cards: ${err}`);
    });
}

// trigger start with a fake click at website load/refresh :)
getFetch({ target: { id: 'buttonHigher' } });