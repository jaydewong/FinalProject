var config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 300 },
            debug: true
        }
    },
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};



var game = new Phaser.Game(config);
var anim;
var progress;
var frameView;
var platforms;
var player;
var cursors;


function preload ()
{
    this.load.image('sky', 'background.png');
    this.load.image('ground', 'fixedground.png');
    this.load.spritesheet('player', 'Pusheen1.png', { frameWidth: 46, frameHeight: 28 });
}

function updateFrameView ()
{
    frameView.clear();
    frameView.fillRect(player.frame.cutX, 0, 46, 28);
}

function update ()
{
    updateFrameView();
}


function create ()

{   
    this.add.image(400, 300, 'sky').setScale(3);
    platforms = this.physics.add.staticGroup();

    platforms.create(400, 568, 'ground').setScale(4).refreshBody();
    platforms.create(600, 400, 'ground');
    platforms.create(50, 250, 'ground');
    platforms.create(750, 220, 'ground');

    player = this.physics.add.sprite(100,300,'player');
    player.setBounce(0.2);
    player.setCollideWorldBounds(true);
    player.body.setGravityY(400);


    cursors = this.input.keyboard.createCursorKeys();

    this.physics.add.collider(player, platforms);

    this.anims.create({
        key: 'walk',
        frames: this.anims.generateFrameNumbers('player'),
        frameRate: 18,
        yoyo: true,
        repeat: -1
    });
    
    this.anims.create({
        key: 'idle',
        frames: [{ key: 'player', frame: 0}],
        frameRate: 18,
    });
}

function generatePlatforms(){
    
}

function update ()
{
    if (cursors.left.isDown)
        {
            player.setVelocityX(-160);
            player.anims.play('walk', true);
        }
        else if (cursors.right.isDown)
        {
            player.setVelocityX(160);
            player.anims.play('walk', true);

        }
        else
        {
            player.setVelocityX(0);
            player.anims.play('idle');
        }

        if (cursors.up.isDown) //&& if player.body.touching.down
        {
            player.setVelocityY(-250);
        }
}