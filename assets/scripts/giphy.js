//api key rpelFBXi3lzv7VO6rXM08B9lJFN1a7aT

//define jQuery Selectors
const buttonsSection = $(`#buttons`);
const searchButton = $(`#search-button`);
const searchTextBox = $(`#search-box`);

//define global variables
let searchString;


let giphyMaker = {
    characters: ['dennis reynolds', 'frank reynolds', 'deandra reynolds', 'charlie kelly', 'mac mcdonald'],

    printButtons: function () {
        buttonsSection.empty();
        this.characters.map(character => { this.makeButton(character) });
    },

    makeButton: function (character) {
        //console.log(`making button with ${character}`);
        let newButton = $(`<button>`);
        newButton.text(character);
        buttonsSection.append(newButton);
    },

    addButton: function (searchString) {
        if (!this.characters.includes(searchString)) {
            this.characters.push(searchString);
            this.printButtons(searchString);
        }

    },

    getData: function () {
        return `coming soon!`;
    },
}

//display initial list of fictional characters
$(document).ready(function () {
    giphyMaker.printButtons();

    searchButton.click(function () {
        searchString = searchTextBox.val();
        //console.log(searchString);
        giphyMaker.addButton(searchString);
    })

})