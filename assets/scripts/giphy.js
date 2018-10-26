//define jQuery Selectors
const buttonsSection = $(`#buttons`);
const searchButton = $(`#search-button`);
const resetButton = $(`#reset-button`);
const searchTextBox = $(`#search-box`);
const imagesView = $(`#content-images`);
const favoritesView = $(`#favorites`)


//define global variables
let searchString;
//let favorites = [];
const apiKey = 'rpelFBXi3lzv7VO6rXM08B9lJFN1a7aT';


let giphyMaker = {
    characters: ['dennis reynolds', 'frank reynolds', 'deandra reynolds', 'charlie kelly', 'mac mcdonald'],

    favorites: [],

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
        let newButton = $(`<button class='btn btn-info character-button'>`);
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
        });
    },

    printImages: function (dataArray) {
        //console.log(`dataArray: ${dataArray}`);
        dataArray.map(img => { this.makeImage(img) });

        let addFavBtn = $(`.add-favorite-btn`);

        addFavBtn.on("click", this.addFavorite);
    },

    makeImage: function (image) {
        let newImageDiv = $(`<div class="card">`);
        let fixedStillUrl = image.images.fixed_height_small_still.url;
        let fixedAnimatedUrl = image.images.fixed_height_small.url;
        let imageSource = image.source_tld;
        let imageRating = image.rating;
        let imageScore = image._score;
        newImageDiv.html(`
    <img src="${fixedStillUrl}" class="card-img-top" data-static="${fixedStillUrl}" data-anim="${fixedAnimatedUrl}">
    <div class="card-body">
    <p class="card-text">source: ${imageSource}<br>Giphy Score: ${imageScore} <br> Rating: ${imageRating}</p>
    <button id="download-btn" data-download="${fixedAnimatedUrl}">Download</button>
    <button class="add-favorite-btn" data-static="${fixedStillUrl}" data-anim="${fixedAnimatedUrl}" data-score="${imageScore}">Favorite</button>
    </div>
        `);
        imagesView.prepend(newImageDiv);
    },

    addFavorite: function (event) {
        //console.log(event.target.dataset.static);
        let fixedStillUrl = event.target.dataset.static;
        let fixedAnimatedUrl = event.target.dataset.anim;
        let score = event.target.dataset.score;
        console.log(`add favorite still: ${fixedStillUrl}`);
        console.log(`add favorite animated: ${fixedAnimatedUrl}`);

        giphyMaker.favorites.push({ static: fixedStillUrl, animated: fixedAnimatedUrl, score: score });
        localStorage.setItem("favorites", JSON.stringify(giphyMaker.favorites));

        //let newFavorite = $(`<img src="${fixedStillUrl}" data-static="${fixedStillUrl}" data-anim="${fixedAnimatedUrl}" data-source="${source}">`);
        //favoritesView.append(newFavorite);
        giphyMaker.printFavorites();
    },

    printFavorites: function () {
        favoritesView.html(`<h3 class="text-center">Favorites</h3>`)
        console.log(giphyMaker.favorites)
        giphyMaker.favorites.map(favorite => {
            let newFavorite = $(`<div class="card"><img class="card-img-top" src="${favorite.static}" data-static="${favorite.static}" data-anim="${favorite.animated}">
            <div class="card-body"><p class="card-text">Score: ${favorite.score}</p></div></div>`);
            favoritesView.append(newFavorite);
        })
    },

    clearData: function () { //reset the characters list back to its default values;
        this.characters = ['dennis reynolds', 'frank reynolds', 'deandra reynolds', 'charlie kelly', 'mac mcdonald'];
        this.printButtons();
    }
}

//display initial list of fictional characters
$(document).ready(function () {
    giphyMaker.printButtons();
    if (localStorage.getItem("favorites")) {
        giphyMaker.favorites = JSON.parse(localStorage.getItem("favorites"));
        giphyMaker.printFavorites();
    }
 

    searchButton.click(function () {
        searchString = searchTextBox.val();
        giphyMaker.addButton(searchString);
    });

    $(document.body).on("click", "img", function (event) {
        if (event.target.src === event.target.dataset.static) {
            //make animated
            event.target.src = event.target.dataset.anim;
        } else {
            //make static
            event.target.src = event.target.dataset.static;
        }
    });

    $(document.body).on("click","#download-btn",function(event){
        console.log(`downloading...`);
        console.log(event.target.dataset.download);
        let imgUrl = event.target.dataset.download;
        download(imgUrl,`${imgUrl}.gif`);
    });

})