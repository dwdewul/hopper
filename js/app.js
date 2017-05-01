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
    checkCollision(this);
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
var Player = function(x=202.5, y=400, speed=50) {
    this.x = x;
    this.y = y;
    this.speed = speed;
    this.sprite = 'images/char-boy.png';
};

Player.prototype.update = function() {
    loseGame(lives, allEnemies);
};

// Draw the player on the screen, required method for game
// Display score
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);

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

/*
This function sees if the player has any more lives, and if they do not,
then they are prompted to reload the page.
*/
var loseGame = function(lives, enemies){
    if(lives == 0){
        var msg = "You lost! Time to play again!";
        if(confirm(msg)){
            location.reload();
        }else{
            lives = 0;
            score();
        }
    }
}

/*
This function checks to see if the player had collided with either an
enemy or the top row; if they hit the top row then the game adds another level
*/
var checkCollision = function(anEnemy) {
    // Check for collision between enemy and player
    if (
        player.y + 131 >= anEnemy.y + 90
        && player.x + 25 <= anEnemy.x + 88
        && player.y + 73 <= anEnemy.y + 135
        && player.x + 76 >= anEnemy.x + 11) {

        player.x = 202.5;
        player.y = 383;
        lives-=1;
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

// Function for adding another level, and therefor another bug to the screen
var addLevel = function(){
    allEnemies.push(new Enemy(0, Math.random() * 184 + 50, 50));
    gameLevel = gameLevel + 1;
    console.log(gameLevel);
};

// This function returns the score
var score = function(gameLevel=0, lives=0){
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
var levelDiv = document.getElementById("level");
var scoreDiv = document.getElementById("score");
var livesDiv = document.getElementById("lives");

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