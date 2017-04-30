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

    // make enemies loop to left side of canvas after reaching canvas.width
    if (this.x >= 505) {
        this.x = 0;
    }

    // Check for collision with enemies or barrier-walls
    checkCollision(this);
    scoreDiv.innerHTML = "Game Level: " + gameLevel;
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function(x=202.5, y=400, speed=50) {
    this.x = x;
    this.y = y;
    this.speed = speed;
    this.sprite = 'images/char-boy.png';
};

Player.prototype.update = function() {

};

// Draw the player on the screen, required method for game
// Display score
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    // displayScoreLevel(score, gameLevel);

};

Player.prototype.checkPos = function(x, y){
    if(player.x > 400){
        return true;
    }
    if(player.y > 383){
        return true;
    }
    if(player.x < 3){
        return true;
    }
};

Player.prototype.handleInput = function(keyPress) {
    if (keyPress == 'left' && player.x > 3) {
        player.x -= player.speed;
    }
    if (keyPress == 'up') {
        player.y -= player.speed;
    }
    if (keyPress == 'right' && player.x < 395) {
        player.x += player.speed;
    }
    if (keyPress == 'down' && player.y < 400) {
        player.y += player.speed;
    }
};


var checkCollision = function(anEnemy) {
    // Check for collision between enemy and player
    if (
        player.y + 131 >= anEnemy.y + 90
        && player.x + 25 <= anEnemy.x + 88
        && player.y + 73 <= anEnemy.y + 135
        && player.x + 76 >= anEnemy.x + 11) {

        player.x = 202.5;
        player.y = 383;
    }
    // Check to see if player hits top of board
    if (player.y+20 <= 0) {
        addLevel(this);
        player.x = 202.5;
        player.y = 383;

        ctx.fillStyle = 'white';
        ctx.fillRect(0, 0, 505, 171);

        }
    };

var addLevel = function(){
    allEnemies.push(new Enemy(0, Math.random() * 184 + 50, 50));
    gameLevel = gameLevel + 1;
    console.log(gameLevel);
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
// Enemy randomly placed vertically within section of canvas
// Declare new score and gameLevel variables to store score and level
var allEnemies = [];
var player = new Player();
// var score = 0;
var gameLevel = 1;
var scoreDiv = document.getElementById("score");


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