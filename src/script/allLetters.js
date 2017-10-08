/**
 * Created by anders on 2017-09-03.
 */
ALL_LETTERS = (function () {

    var alphabet = 'abcdefghijklmnopqrstuvxyzåäö';

    var allPictures = [];

    initLetters();

    var service = {
        getAllPictures: getAllPictures
    };

    function getAllPictures() {
        return allPictures;
    }

    function initLetters() {
        for (i = 0; i < alphabet.length; i++) {
            var letter = alphabet[i].charAt(0);
            if(letter === 'å'){
                letter = 'aa';
            }
            else if(letter === 'ä'){
                letter = 'ae';
            }
            else if(letter === 'ö'){
                letter = 'oe';
            }
            allPictures.push({
                name: letter,
                path: 'img/letters/' + letter + '.png'
            });
        }
    }

    return service;
}());
