// add pups to dog bar

const DOG_BASE_URL = "http://localhost:3000/pups";

window.addEventListener("DOMContentLoaded", showDogsInDogBar)

function showDogsInDogBar() {
  fetchDogs();
}

function fetchDogs() {
  fetch(DOG_BASE_URL)
  .then(resp => resp.json())
  .then(json => addDogs(json))
}

function addDogs(json) {
  const dogBar = document.querySelector("div#dog-bar");
  for (const dog of json) {
    let span = document.createElement("span");
    span.id = dog.id
    span.innerText = dog.name;
    dogBar.appendChild(span);

    span.addEventListener("click", function() {
      showDogInfoEventHandler(event);
    });
  }
}

// show more info about a dog on a click

function showDogInfoEventHandler(event) {
  const dogBar = document.querySelector("div#dog-bar");
  fetchDogInfo(event);

  function fetchDogInfo(event) {
    let dogId = event.target.id
    fetch(DOG_BASE_URL + `/${dogId}`)
    .then(resp => resp.json())
    .then(json => showDog(json))
  }

  function showDog(json) {
    const dogInfo = document.querySelector("div#dog-info");

    const img = document.createElement("img");
    const h2 = document.createElement("h2");
    const button = document.createElement("button");

    img.setAttribute("src", json.image);
    h2.innerText = json.name;
    json.isGoodDog ? button.innerText = "Good Dog!" : button.innerText = "Bad Dog!" 

    dogInfo.appendChild(img)
    dogInfo.appendChild(h2);
    dogInfo.appendChild(button);
  }
}

