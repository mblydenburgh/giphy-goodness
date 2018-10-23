//define jQuery Selectors
const buttonsSection = $(`#buttons`);
const searchButton = $(`#search-button`);
const resetButton = $(`#reset-button`);
const searchTextBox = $(`#search-box`);
const imagesView = $(`#content-images`);

//define global variables
let searchString;
const apiKey = 'rpelFBXi3lzv7VO6rXM08B9lJFN1a7aT';


let giphyMaker = {
    characters: ['dennis reynolds', 'frank reynolds', 'deandra reynolds', 'charlie kelly', 'mac mcdonald'],

    printButtons: function () { //loop through characters array and call makeButton on each
        buttonsSection.empty();
        this.characters.map(character => { this.makeButton(character) });

        //with buttons created, have event listener to serve imgs
        $(`.character-button`).click(function () {
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
            method: 'GET'
        }).done(function (response) {
            console.log(response);
            giphyMaker.printImages(response.data);
        })
    },

    printImages: function (dataArray) {
        //console.log(`dataArray: ${dataArray}`);
        dataArray.map(img => { this.makeImage(img) });

        $(`img`).click(function (event) {
            //console.log(event.target.attributes);
            let staticUrl = event.target.attributes[2].value;
            let animUrl = event.target.attributes[3].value;
            /*console.log(`static url: ${staticUrl}
animated url: ${animUrl}`);*/
            if (this.src === staticUrl) {
                //make animate
                this.src = animUrl;
            } else {
                //make static
                this.src = staticUrl;
            }
            //this.src = animUrl;
        })

    },

    makeImage: function (image) {
        let newImageDiv = $(`<div class="card">`);
        newImageDiv.html(`

        <img src="${image.images.fixed_height_still.url}" class="card-img-top" data-static="${image.images.fixed_height_still.url}" data-anim="${image.images.fixed_height.url}">
    <div class="card-body"><p class="card-text">url: ${image.url}<br>Giphy Score: ${image._score} <br> Rating: ${image.rating}</p><a href="${image.images.fixed_height.url}" download><button>Download</button></a></div>
        `);
        imagesView.prepend(newImageDiv);
    },

    clearData: function () { //reset the characters list back to its default values;
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