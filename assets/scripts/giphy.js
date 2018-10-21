//api key rpelFBXi3lzv7VO6rXM08B9lJFN1a7aT
//define jQuery Selectors
const buttonsSelector = $(`#butons`);


let giphyMaker = {
    characters: ['dennis reynolds', 'frank reynolds', 'deandra reynolds', 'charlie kelly', 'mac mcdonald'],

    printButtons: function() {
        this.characters.map(character=>{this.makeButton(character)});
    },

    makeButton:function(character){
        
    },

    getData: function () {
        return `coming soon!`;
    },
}

//display initial list of fictional characters
$(document).ready(function () {
    giphyMaker.printButtons();
})