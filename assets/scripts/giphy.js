//define jQuery Selectors
const buttonsSection = $(`#buttons`);
const searchButton = $(`#search-button`);
const resetButton = $(`#reset-button`);
const searchTextBox = $(`#search-box`);

//define global variables
let searchString;
const apiKey = 'rpelFBXi3lzv7VO6rXM08B9lJFN1a7aT';


let giphyMaker = {
    characters: ['dennis reynolds', 'frank reynolds', 'deandra reynolds', 'charlie kelly', 'mac mcdonald'],

    printButtons: function () {
        buttonsSection.empty();
        this.characters.map(character => { this.makeButton(character) });
        $(`.character-button`).click(function(){
            console.log(`passing ${this.innerHTML} to getData`);
            giphyMaker.getData(this.innerHTML);
        })
    },

    makeButton: function (character) {
        //console.log(`making button with ${character}`);
        let newButton = $(`<button class='character-button'>`);
        newButton.text(character);
        buttonsSection.append(newButton);
    },

    addButton: function (searchString) {
        if (!this.characters.includes(searchString)) { //if the characters array doesnt have the serach term, add it.
            this.characters.push(searchString);
            this.printButtons();
        }
    },

    getData: function (search) {
        $.ajax({
            url: `http://api.giphy.com/v1/gifs/search?q=${search}&api_key=${apiKey}&limit=10`,
            method:'GET'
        }).done(function(response){
            console.log(response);
        })
    },

    clearData: function(){ //reset the characters list back to its default values;
        this.characters = ['dennis reynolds', 'frank reynolds', 'deandra reynolds', 'charlie kelly', 'mac mcdonald'];
        this.printButtons();
    }
}

//display initial list of fictional characters
$(document).ready(function () {
    giphyMaker.printButtons();

    searchButton.click(function () {
        searchString = searchTextBox.val();
        //console.log(searchString);
        giphyMaker.addButton(searchString);
    });

})