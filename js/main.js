//Example fetch using pokemonapi.co
document.querySelector('button').addEventListener('click', getFetch)

function getFetch(){
  const baseURL = "https://api.pokemontcg.io/v2/cards"
  const pokemonOnlyURL = baseURL + "?q=" + "supertype:Pokémon" + "&pageSize=1"

  fetch(pokemonOnlyURL)
    .then(res => res.json()) // parse response as JSON
    .then(objReceived => {
      let totalAmountOfCards = objReceived.totalCount
      let randomCard = Math.floor(Math.random() * totalAmountOfCards) + 1 // +1 because there's no card number 0

      fetch(pokemonOnlyURL + `&page=${randomCard}`)
        .then(res => res.json()) // parse response as JSON
        .then(objReceived => {
          
          console.log(`Name: ${objReceived.data[0].name}`)
          console.log(`HP: ${objReceived.data[0].hp}`)
          console.log(objReceived)

        })
        .catch(err => {
            console.log(`error ${err}`)
        });
    })
    .catch(err => {
        console.log(`error ${err}`)
    });
}

// return fetch(`${baseUrl}?page=${randomPage}&pageSize=1`)