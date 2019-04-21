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
var coins;
var platforms;
var player;
var cursors;
var pX = 600;
var pY = 400;
var boards; 


function preload ()
{
    this.load.image('sky', 'background.png');
    this.load.image('ground', 'fixedground.png');
    this.load.spritesheet('player', 'Pusheen1.png', { frameWidth: 46, frameHeight: 28 });
    this.load.spritesheet('coin', 'Coin1.png', { frameWidth: 13, frameHeight: 13 });
}

function updateFrameView ()
{
    frameView.clear();
    frameView.fillRect(player.frame.cutX, 0, 46, 28);
    frameView.fillRect(coins.frame.cutX, 0, 13, 13);
}

function update ()
{
    updateFrameView();
}


function create ()

{   
    this.add.image(400, 300, 'sky').setScale(3);

    coins = this.physics.add.staticGroup();

    platforms = this.physics.add.group({
        gravityY:-300,
        velocityX: -200,
        'immovable': true,

    });
    platforms.create(600, 500, 'ground').setScale(0.75);
    platforms.create(200, 350, 'ground').setScale(0.75);
    platforms.create(850, 420, 'ground').setScale(0.75);
    platforms.create(400, 100, 'ground').setScale(0.75);
    
    coins.create(400, 420, 'coin').setScale(1.5).refreshBody();;
    coins.create(600, 340, 'coin').setScale(1.5).refreshBody();;
    coins.create(50, 190, 'coin').setScale(1.5).refreshBody();;
    coins.create(750, 160, 'coin').setScale(1.5).refreshBody();;

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

    this.anims.create({
        key: 'spin',
        frames: this.anims.generateFrameNumbers('coin'),
        frameRate: 10,
        yoyo: true,
        repeat: -1
    });

    coins.playAnimation('spin');
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

        if (cursors.up.isDown)
        {
            player.setVelocityY(-250);
        }

        
    for(var i = 0; i < platforms.children.entries.length; i++){
        if(platforms.children.entries[i].x < -10){
            platforms.children.entries[i].x = 800;
            platforms.children.entries[i].y = Math.random()*600 + 150;
        }
    }
    
    
}