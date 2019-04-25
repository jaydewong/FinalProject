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
var highscore = 0; 


function preload ()
{
    this.load.image('sky', 'background.png');
    this.load.image('ground', 'fixedground.png');

    this.load.spritesheet('left', 'pusheen1.png', { frameWidth: 46, frameHeight: 28 });
    this.load.spritesheet('right', 'pusheen2.png', { frameWidth: 46, frameHeight: 28 });
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
    highscoreText = this.add.text(16, 8, 'score: 0', { fontSize: '17px', fill: '#000' });
    highscoreText.setText('highest score: ' + highscore);

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

    for(var i = 0; i < Math.random()*10 + 2; i++){
        coins.create(Math.random()*800, Math.random()*500, 'coin').setScale(1.5).refreshBody();
    }
    
    player = this.physics.add.sprite(100,300,'left');
    this.physics.add.collider(player, platforms);
    player.setCollideWorldBounds(true);

     

    player.body.setGravityY(400);


    cursors = this.input.keyboard.createCursorKeys();


    this.anims.create({
        key: 'left',
        frames: this.anims.generateFrameNumbers('left'),
        frameRate: 18,
        yoyo: true,
        repeat: -1
    });

    this.anims.create({
        key: 'right',
        frames: this.anims.generateFrameNumbers('right'),
        frameRate: 18,
        yoyo: true,
        repeat: -1
    });
    this.anims.create({
        key: 'idle',
        frames: [{ key: 'right', frame: 0}],
        frameRate: 18,
    });

    this.anims.create({
        key: 'spin',
        frames: this.anims.generateFrameNumbers('coin'),
        frameRate: 10,
        yoyo: true,
        repeat: -1
    });

    scoreText = this.add.text(16, 30, 'score: 0', { fontSize: '32px', fill: '#000' });
    coins.playAnimation('spin');
    this.physics.add.collider(coins, platforms);
    this.physics.add.overlap(player, coins, collectcoins, null, this);
}


function update ()
{
    // console.log(player.x + ',' + player.y);
    if(player.y > 600){
        if(score > highscore){
            highscore = score;
        }
        score = 0;
        this.scene.stop();
        this.scene.start('lose');
    }
    if (cursors.left.isDown)
        {
            player.setVelocityX(-200);
            player.anims.play('left', true);
        }
        else if (cursors.right.isDown)
        {
            player.setVelocityX(200);
            player.anims.play('right', true);

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
    coins.remove(coin);
    score += 1;
    for(var i = 1; i < Math.random()*4; i++){
        coins.create(Math.random()*800, Math.random()*500, 'coin').setScale(1.5).refreshBody();
        coins.playAnimation('spin');
    }

    scoreText.setText('score:' + score);

}

game.scene.add('lose', {
    create: function() {
        console.log('lose scene create');
        this.add.image(400,300, 'sky').setScale(3);
        this.add.text(150, 200, 'You Lose!', { fontSize: '100px', fill: '#fff' });

        let restartButton = this.add.text(500, 500, 'Play Again', { fontSize: '32px', fill: '#fff' });
        restartButton.setInteractive();
        let game = this;
        restartButton.on('pointerdown', function() {
            game.scene.stop();
            game.scene.start('default');
        });
    }
});
