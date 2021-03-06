// Enemies our player must avoid
var Enemy = function(x,y) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.x = x;
    this.y = y;
    this.width = 40;
    this.height = 30;
    //Generate random number for enemy speed
    var randomSpeed = (Math.random() * (350 - 100) + 100);
    this.speed = randomSpeed;
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    if (this.x < 505) {
        this.x += this.speed * dt;
    } else {
        this.x = -25;
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function(x,y) {
    //image for player character
    this.sprite = 'images/char-cat-girl.png';
    this.x = x;
    this.y = y;
    this.width = 30;
    this.height = 30;
};

Player.prototype.update = function() {
    if (this.y < 0) {
        alert("You Win!");
        this.reset();
    }
    player.detectCollision();
};

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.handleInput = function(dir) {
    if (dir == 'left' && this.x > 0) { this.x -= 100; }
    if (dir == 'right' && this.x < 350) { this.x += 100; }
    if (dir == 'up' && this.y > 0) { this.y -= 100; }
    if (dir == 'down' && this.y < 400 ) { this.y += 100; }
};

//Collision Algorithm
function collides(a,b) {
    return a.x < b.x + b.width &&
       a.x + a.width > b.x &&
       a.y < b.y + b.height &&
       a.y + a.height > b.y;
}

//Detect Collision
Player.prototype.detectCollision = function() {
    allEnemies.forEach(function(enemy) {
        if (collides(enemy, player)) {
            player.reset();
        }
    });
};

//Reset Player to start
Player.prototype.reset = function() {
    this.y = 425;
    this.x = 200;
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
var allEnemies = [];
for (var i = 0; i < 4; i++) {
    var x = i * -15;
    var y = (i * 100) + (30 / i);
    allEnemies[i] = new Enemy(x,y);
}

// Place the player object in a variable called player
var player = new Player(200, 425);


// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
