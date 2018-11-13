// Enemies our player must avoid
class Enemy {
    constructor() {
        // The image/sprite for our enemies, this uses
        // a helper we've provided to easily load images
        this.sprite = 'images/enemy-bug.png';

        //Initial horizontal position of enemy (towards left)
        this.x = 0;
        //Inital vertical position of enemy (3 possibilities randomized)
        this.y = 83 * Math.round(Math.random()*2 + 1) - 20;
        //Initial speed of enemy (Possible values - 3-8, randomized)
        this.speed = Math.floor(Math.random()*5) + 3;
    }

    // Update the enemy's position, required method for game
    // Parameter: dt, a time delta between ticks
    update(dt) {
        //Move enemy towards right by speed distance
        this.x = this.x + this.speed;

        //If enemy crosses the game area, reset its position (randomised again)
        if (this.x >= 101*5) {
            this.x = 0;
            this.y = 83 * Math.round(Math.random()*2 + 1) - 20;
            this.speed = Math.floor(Math.random()*5) + 3;
        }

        //Check collision with the player
        if (this.x < player.x + 70 /* Player's width */ &&
            this.x + 70 /* Enemy's width */ > player.x &&
            this.y < player.y + 83 /* Player's height */ &&
            this.y + 75 /* Enemy's height */ > player.y) {
            //If player collides, reset player's position after 50 ms (to visualize that player actually moved there).
            setTimeout(() => {
                player.x = 101*2;
                player.y = 83*5 - 20;
            }, 50);
        }
    };

    // Draw the enemy on the screen, required method for game
    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    };
}
//Create 3 enemies on the screen
let allEnemies = [];
for (let i = 0; i < 3; ++i) {
    allEnemies.push(new Enemy());
}

//Player
class Player {
    constructor() {    
        // The image/sprite for player
        this.sprite = 'images/char-boy.png';

        //Initial position of player - 3rd horizontal cell and bottom-most cell
        this.x = 101*2;
        this.y = 83*5 - 20;
    }

    // Update the player's position, required method for game
    // Parameter: dt, a time delta between ticks
    update(dt) {
    };

    // Draw the enemy on the screen, required method for game
    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    };

    //Handle the input
    handleInput(key) {
        //console.log("Pressed " + key);

        //React upon arrow key press
        switch(key) {
            case 'left':
                //If possible, move player left by 1 cell
                if (this.x > 0)
                    this.x = this.x - 101;
                break;
            case 'right':
                //If possible, move player right by 1 cell
                if (this.x < 101*4)
                    this.x = this.x + 101;
                break;
            case 'up':
                //If possible, move player up by 1 cell
                if (this.y > 0)
                    this.y = this.y - 83;
                break;
            case 'down':
                //If possible, move player down by 1 cell
                if (this.y < 83*4)
                    this.y = this.y + 83;
                break;
        }
        //If player wins, reset player's position after 200ms (to visiualize player's position at the other side of lane).
        if (this.y < 0) {
            setTimeout(() => {
                this.y = 83*5 - 20;
                this.x = 101*2;
            }, 500);
        }
    }
}
//Create player's instance
let player = new Player();

// This listens for key presses and sends the keys to Player.handleInput() method
document.addEventListener('keyup', function(e) {
    let allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});