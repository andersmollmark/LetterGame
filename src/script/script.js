/**
 * Created by anders on 2017-09-02.
 */
var game = new Phaser.Game(1000, 600, Phaser.AUTO, '', {preload: preload, create: create, update: update});

var numberOfMissedLetters = 0;
var missedLettersLabel;
var missedLettersText;

var timer;

var createSpeed = 2000;
var letterSpeed = 100;
var nextLevel = 5;
var currentDifficulty = 1;
var currentDifficultyLabel = "Level:";
var currentDifficultyText;
var timeLabel;
var timeText;

var theLetters;

var alphabet = 'abcdefghijklmnopqrstuvxyzåäö';
var alphabetArray = [];
var alphabetMap = [];

var activeLetters = [];

var letterGroup;
var letterTimeout;

var number = 0;

function preload() {

    var allLetterPics = ALL_LETTERS.getAllPictures();
    for(var i = 0; i < allLetterPics.length; i++){
        game.load.image(allLetterPics[i].name, allLetterPics[i].path);
    }

    theLetters = allLetterPics;

    for (i = 0; i < alphabet.length; i++) {
        alphabetMap[alphabet[i].charAt(0)] = alphabet[i].charAt(0);
        alphabetArray[i] = alphabet[i].charAt(0);
    }


}

function create() {

    //  We're going to be using physics, so enable the Arcade Physics system
    game.physics.startSystem(Phaser.Physics.ARCADE);

    letterGroup = game.add.group();
    letterGroup.enableBody = true;
    letterGroup.physicsBodyType = Phaser.Physics.ARCADE;

    letterGroup.setAll('anchor.x', 0.5);
    letterGroup.setAll('anchor.y', 0.5);
    letterGroup.setAll('scale.x', 1);
    letterGroup.setAll('scale.y', 1);
    letterGroup.setAll('outOfBoundsKill', true);
    letterGroup.setAll('checkWorldBounds', true);


    missedLettersLabel = 'Missed letters: ';
    missedLettersText = game.add.text(10, 10, missedLettersLabel + numberOfMissedLetters, { font: '24px Arial', fill: '#fff' });

    timeLabel = 'Time: ';
    timer = game.time.create(false);
    timeText = game.add.text(700, 10, timeLabel + timer.seconds, { font: '24px Arial', fill: '#fff' });

    timer.start();

    currentDifficultyText = game.add.text(350, 10, currentDifficultyLabel + currentDifficulty, { font: '24px Arial', fill: '#fff' });

}

function checkLetter(event) {

    var keycode = event.which || event.keyCode;
    var letter = String.fromCharCode(keycode);

    var letterFromMap = alphabetMap[letter];

    var keycodeFromLetter = letter.charCodeAt(0);
    console.log('keycode:' + keycode + ' letter:' + letter + ' keyCodeFromLetter:' + keycodeFromLetter + ' letterFromMap:' + letterFromMap);

    if(activeLetters[letter] && activeLetters[letter].length > 0){
        console.log('killed...');
        var activeLetterArray = activeLetters[letter];
        var theLetter = activeLetterArray.pop();
        theLetter.letterObject.kill();
        console.log('number of letters:' + activeLetterArray.length);
    }

}

function update(){


    if(!letterTimeout){
        letterTimeout = window.setTimeout(function () {
            createLetter(letterGroup);
        }, createSpeed);
    }

    if(currentDifficulty < 16 && timer.seconds > nextLevel){
        letterSpeed += 10;
        createSpeed -= 100;
        nextLevel += 5;
        currentDifficulty += 1;
        currentDifficultyText.text = currentDifficultyLabel + currentDifficulty;
    }

    timeText.text = timeLabel + timer.seconds.toFixed(3);

    letterGroup.forEachAlive(function(letter){
        if(letter.y > 610){

            var activeLetterArray = activeLetters[letter.name];
            var theLetter = activeLetterArray.pop();
            letter.kill();
            numberOfMissedLetters++;
            console.log('to late, ' + numberOfMissedLetters);
            missedLettersText.text = missedLettersLabel + numberOfMissedLetters;

            if(numberOfMissedLetters === 10){
                game.add.text(350, 350, "Game over!", { font: '36px Arial', fill: '#fff' });
                game.paused = true;
            }

        }
    });



}

function createLetter(group){
    letterTimeout = undefined;
    var index = randomIntFromInterval(0, alphabet.length-1);
    // var index = 0;
    var xpos = randomIntFromInterval(5, 595);
    var theLetter = alphabetArray[index];

    // console.log('letter:' + theLetter);

    var templetter = group.create(xpos, 5, theLetters[index].name);
    templetter.body.velocity.y = letterSpeed;

    templetter.name = theLetters[index].name;
    number++;
    var newLetter = {
        letterObject: templetter,
        name: theLetters[index].name,
        number: number
    };
    addActiveLetter(newLetter);


}

function addActiveLetter(newLetter){
    if(!activeLetters[newLetter.name]){
        activeLetters[newLetter.name] = [];
    }
    activeLetters[newLetter.name].unshift(newLetter);
    console.log('number of letters when create:' + activeLetters[newLetter.name].length);
}

function randomIntFromInterval(min,max)
{
    return Math.floor(Math.random()*(max-min+1)+min);
}
