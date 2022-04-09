
const charactersElement = document.querySelector('.characters');
const characterURL = 'https://gateway.marvel.com:/v1/public/events/29/characters?limit=100&apikey=6abff8325df9c9e7ee6cf85b03d48d4e';


function getCharacterData() {

    if (localStorage.characterData) {
        return Promise.resolve(JSON.parse(localStorage.characterData)); // if data is in localStorage, return it
    }

    fetch(characterURL) //fetching the characters from the marvel api
        .then(response => response.json()) //converting the response to json
        .then(data => {

            localStorage.characterData = JSON.stringify(data); //storing the data in local storage
            return data;
        });
}



function addCharactersToPage(characterData) { //function to add the characters to the page
    console.log(characterData.data.results);
    characterData.data.results.forEach(result => {
        const characterImage = result.thumbnail.path + '/standard_medium.jpg';
        const characterElement = document.createElement('div');

        const imageElement = document.createElement('img');
        imageElement.src = characterImage;
        characterElement.appendChild(imageElement);

        const characterName = result.name;
        // const characterNameElement = document.createElement('h3');
        // characterNameElement.textContent = characterName;
        // characterElement.appendChild(characterNameElement);


        charactersElement.appendChild(characterElement);
    });
}


getCharacterData() // calling the function to get the data
    .then(addCharactersToPage);