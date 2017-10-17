/**
 * Created by anders on 2017-09-03.
 */
ALL_LETTERS = (function () {

    var alphabet = 'abcdefghijklmnopqrstuvxyzåäö';

    var allPictures = [];
    var service = {
        getAllPictures: getAllPictures,
        getLetter: getLetter
    };

    initLetters();


    function getLetter(letter){
        var result = letter;
        if(letter === 'å'){
            result = 'aa';
        }
        else if(letter === 'ä'){
            result = 'ae';
        }
        else if(letter === 'ö'){
            result = 'oe';
        }
        return result;
    }

    function getAllPictures() {
        return allPictures;
    }

    function initLetters() {
        for (i = 0; i < alphabet.length; i++) {
            var letter = alphabet[i].charAt(0);
            var theLetter = service.getLetter(letter);
            allPictures.push({
                name: theLetter,
                path: 'img/letters/' + theLetter + '.png'
            });
        }
    }

    return service;
}());
