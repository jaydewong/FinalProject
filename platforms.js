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
var anim;
var progress;
var frameView;
var coins;
var platforms;
var player;
var cursors;
var score = 0; 


function preload ()
{
    this.load.image('sky', 'background.png');
    this.load.image('ground', 'fixedground.png');
    this.load.spritesheet('player1', 'pusheen1.png', { frameWidth: 46, frameHeight: 28 });
    this.load.spritesheet('player2', 'pusheen2.png', { frameWidth: 46, frameHeight: 28 });
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
    this.physics.world.setBoundsCollision(true,true,true,false);
    this.add.image(400, 300, 'sky').setScale(3);

    coins = this.physics.add.staticGroup();

    platforms = this.physics.add.group({
        gravityY: -300,
        velocityX: -180,
        'immovable': true,

    });
    platforms.create(600, 500, 'ground').setScale(0.75);
    platforms.create(200, 350, 'ground').setScale(0.5);
    platforms.create(850, 420, 'ground').setScale(0.75);
    platforms.create(400, 100, 'ground').setScale(0.5);
    platforms.create(700, 300, 'ground').setScale(0.75);
    platforms.create(690, 650, 'ground').setScale(0.5);
    platforms.create(400, 100, 'ground').setScale(0.75);

    for(var i = 0; i < Math.random()*9; i++){
        coins.create(Math.random()*800, Math.random()*600, 'coin').setScale(1.5).refreshBody();;
    }
    
    // coins.create(Math.random()*800, Math.random()*600, 'coin').setScale(1.5).refreshBody();;
    // coins.create(Math.random()*800, Math.random()*600, 'coin').setScale(1.5).refreshBody();;
    // coins.create(Math.random()*800, Math.random()*600, 'coin').setScale(1.5).refreshBody();;
    // coins.create(Math.random()*800, Math.random()*600, 'coin').setScale(1.5).refreshBody();;

    player = this.physics.add.sprite(100,300,'player1');
    this.physics.add.collider(player, platforms);
    player.setCollideWorldBounds(true);

     

    player.body.setGravityY(400);


    cursors = this.input.keyboard.createCursorKeys();


    this.anims.create({
        key: 'walk1',
        frames: this.anims.generateFrameNumbers('player1'),
        frameRate: 18,
        yoyo: true,
        repeat: -1
    });

    this.anims.create({
        key: 'walk2',
        frames: this.anims.generateFrameNumbers('player2'),
        frameRate: 18,
        yoyo: true,
        repeat: -1
    });
    
    this.anims.create({
        key: 'idle',
        frames: [{ key: 'player2', frame: 0}],
        frameRate: 18,
    });

    this.anims.create({
        key: 'spin',
        frames: this.anims.generateFrameNumbers('coin'),
        frameRate: 10,
        yoyo: true,
        repeat: -1
    });

    scoreText = this.add.text(16, 16, 'score: 0', { fontSize: '32px', fill: '#000' });
    coins.playAnimation('spin');
    this.physics.add.collider(coins, platforms);
    this.physics.add.overlap(player, coins, collectcoins, null, this);
}


function update ()
{
    // console.log(player.x + ',' + player.y);
    if(player.y > 600){
        score = 0;
        this.scene.restart();
    }
    if (cursors.left.isDown)
        {
            player.setVelocityX(-200);
            player.anims.play('walk1', true);
        }
        else if (cursors.right.isDown)
        {
            player.setVelocityX(200);
            player.anims.play('walk2', true);

        }
        else
        {
            player.setVelocityX(0);
            player.anims.play('idle');
        }
 
        if (cursors.up.isDown && player.body.touching.down)
        {
            player.setVelocityY(-550);
        }

        
    for(var i = 0; i < platforms.children.entries.length; i++){
        if(platforms.children.entries[i].x < -100){
            platforms.children.entries[i].x = 900;
            platforms.children.entries[i].y = Math.random()*300 + 150;
        }
    }
    
    
}

function collectcoins (player,coin)
{
    coin.disableBody (true,true);
    score += 1;
    scoreText.setText('score:' + score);
    console.log(score);
}