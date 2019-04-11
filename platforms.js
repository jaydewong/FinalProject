var config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 300 },
            debug: false
        }
    },
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};



var game = new Phaser.Game(config);
var platforms;
var player;
var cursors;


function preload ()
{
    this.load.image('sky', 'background.png');
    this.load.image('ground', 'whiteground.png');
    this.load.image('player', 'pusheen.gif');
    
}

function create ()
{   
    this.add.image(400, 300, 'sky').setScale(3);
    platforms = this.physics.add.staticGroup();

    platforms.create(400, 568, 'ground').setScale(4).refreshBody();
    platforms.create(600, 400, 'ground');
    platforms.create(50, 250, 'ground');
    platforms.create(750, 220, 'ground');

    player = this.physics.add.sprite(100,490,'player');
    player.setBounce(0.2);
    player.setCollideWorldBounds(true);
    player.body.setGravityY(400);


    cursors = this.input.keyboard.createCursorKeys();

    this.physics.add.collider(player, platforms);

}

function generatePlatforms(){
    
}

function update ()
{
    if (cursors.left.isDown)
        {
            player.setVelocityX(-160);
        }
        else if (cursors.right.isDown)
        {
            player.setVelocityX(160);

        }
        else
        {
            player.setVelocityX(0);

        }

        if (cursors.up.isDown) //&& if player.body.touching.down
        {
            player.setVelocityY(-250);
        }
}