
const charactersElement = document.querySelector('.characters'); // selecting the characters element
const characterURL = 'https://gateway.marvel.com:/v1/public/events/29/characters?limit=100&apikey=6abff8325df9c9e7ee6cf85b03d48d4e'; // function addCharactersToPage(characterData) { //function to add the characters to the page


function getCharacterData() {

    if (localStorage.characterData) { // if the local storage has data
        return Promise.resolve(JSON.parse(localStorage.characterData)); // if data is in localStorage, return it
    }

    fetch(characterURL) //fetching the characters from the marvel api
        .then(response => response.json()) //converting the response to json
        .then(data => {

            localStorage.characterData = JSON.stringify(data); //storing the data in local storage
            return data; // returning the data
        });
}

const hiddenCharacters = {

    1009165: true,
    1009726: true,
    1009299: true,
}

function addCharactersToPage(characterData) { //function to add the characters to the page
    console.log(characterData.data.results);   //logging the data to the console
    characterData.data.results.forEach(result => { // for each character in the data
        if (!hiddenCharacters[result.id]) {
            const characterImage = result.thumbnail.path + '/standard_medium.jpg'; // getting the image url
            const characterElement = document.createElement('div'); // creating a div element
            characterElement.classList.add('character'); // adding a class to the div element

            const imageElement = document.createElement('img'); // creating an image element
            imageElement.classList.add('image'); // adding a class to the image element
            imageElement.src = characterImage; // setting the image source
            characterElement.appendChild(imageElement); // appending the image to the div element

            const characterName = result.name.replace(/\(.*\)/, ''); // getting the character name
            const characterNameElement = document.createElement('h3'); // creating a h3 element
            characterNameElement.classList.add('name'); // adding a class to the h3 element
            characterNameElement.textContent = characterName; // setting the text content of the h3 element
            characterElement.appendChild(characterNameElement); // appending the h3 element to the div element

            charactersElement.appendChild(characterElement);

        }

    });
}



getCharacterData() // calling the function to get the data
    .then(addCharactersToPage); // calling the function to add the data to the page