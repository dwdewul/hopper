'use strict';
// Enemies our player must avoid
var Enemy = function(x, y, speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    this.x = x;
    this.y = y;
    this.speed = speed;

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x += this.speed * dt;

    // Make enemies loop to left side of canvas after reaching canvas.width
    if (this.x >= 505) {
        this.x = 0;
    }

    // Check for collision with enemies or barrier-walls
    this.checkCollision();
    levelDiv.innerHTML = "Game Level: " + gameLevel;
    scoreDiv.innerHTML = "Score: " + score(gameLevel, lives);
    livesDiv.innerHTML = "Lives: " + lives;

};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function(x=202.5, y=400, step=50) {
    this.x = x;
    this.y = y;
    this.step = step;
    this.sprite = 'images/char-boy.png';
};

Player.prototype.update = function() {
    this.checkCollision();
    loseGame(lives, allEnemies);
};

// Draw the player on the screen, required method for game
// Display score
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);

};

Player.prototype.handleInput = function(keyPress) {
    if (keyPress == 'left' && this.x > 3) {
        this.x -= this.step;
    }
    if (keyPress == 'up') {
        this.y -= this.step;
    }
    if (keyPress == 'right' && this.x < 395) {
        this.x += this.step;
    }
    if (keyPress == 'down' && this.y < 400) {
        this.y += this.step;
    }
};

/*
Gives a message to the user to replay and also removes the game display information.
*/
var loseGame = function(lives, enemies){
    if(lives <= 0){
        var msg = "You lost! Reload to play again!";
        lostDiv.innerHTML = msg;
        scoreDiv.parentNode.remove(scoreDiv);
        livesDiv.parentNode.remove(livesDiv);
        levelDiv.parentNode.remove(levelDiv);
    }
}

/*
This function checks to see if the player had collided with either an
enemy or the top row; if they hit the top row then the game adds another level
*/
Enemy.prototype.checkCollision = function(anEnemy) {
    // Check for collision between enemy and player
    if (
        player.y + 131 >= this.y + 90
        && player.x + 25 <= this.x + 88
        && player.y + 73 <= this.y + 135
        && player.x + 76 >= this.x + 11) {

            player.x = 202.5;
            player.y = 383;
            lives-=1;
        }
    }

Player.prototype.checkCollision = function(){
    if (this.y + 15 <= 0) {
        addLevel(this);
        this.x = 202.5;
        this.y = 383;

        ctx.fillStyle = 'lightgray';
        ctx.fillRect(0, 0, 505, 171);

        }
    }

    // Check to see if player hits top of board


// Function for adding another level, and therefor another bug to the screen
var addLevel = function(){
    allEnemies.push(new Enemy(0, Math.random() * 184 + 50, 50));
    gameLevel = gameLevel + 1;
    console.log(gameLevel);
};

// This function returns the score
var score = function(gameLevel=1, lives=3){
    if(gameLevel == 1){
        return 0;
    }
    return 10 * gameLevel * lives;
}


// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

var allEnemies = [];
var player = new Player();

var gameLevel = 1;
var lives = 3;
var levelDiv = document.getElementById("level")
var scoreDiv = document.getElementById("score");
var livesDiv = document.getElementById("lives");
var lostDiv = document.getElementById("lost-msg");

var enemy = new Enemy(0, Math.random() * 184 + 50, 50);

allEnemies.push(enemy);


// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keydown', function(e) {
    var allowedKeys = {
        65: 'left',
        87: 'up',
        68: 'right',
        83: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});