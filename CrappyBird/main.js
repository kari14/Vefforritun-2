var game = new Phaser.Game(800, 600);
var highScore = 0;
var timer;
var music;
var currScore;
var crash;
var jumpSound;
var muteButton;
var isMute = false;
var check = false;
var birdy;
var background;
var foreground;
var cloud;

//The begining state.
var startState = {
    preload: function() {
        game.load.image('title', 'assets/title.png');
        game.load.image('background', 'assets/background.png');
        game.load.image('bird', 'assets/bird.png'); 
        game.load.image('foreground', 'assets/foreground.png');
        game.load.image('cloud', 'assets/cloud.png');
    },
    
    create: function() {
        background = game.add.tileSprite(0,0, 800, 600, 'background');
        foreground = game.add.tileSprite(0,0, 800, 600, 'foreground');
        cloud = game.add.tileSprite(0,0, 800, 600, 'cloud');
        this.bird = game.add.sprite(350, 245, 'bird');
        bird = this.bird;
        game.physics.arcade.enable(this.bird);

        var title = game.add.tileSprite(0,0,800,600, 'title');
        var spaceKey = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
        
        spaceKey.onDown.add(changeToMain, this);
    },
    
    update: function() {
        var animation = game.add.tween(this.bird);

        if(check) {
            animation.to({angle: -20});
            check = false;
        }
        else {
            animation.to({angle: 20});
            check = true;
        }

        animation.start(); 
        background.tilePosition.x -= 2;
        foreground.tilePosition.x -=8;
        cloud.tilePosition.x -= 4;
        
    },

};

function changeToMain() {
    game.state.start('main');
};

function changeToStart() {
    game.state.start('start');
}

//end state which displays the score.
var endState = {
    preload: function() {
        game.load.image('end', 'assets/end.png');
        game.load.image('play', 'assets/play.png');
    },

    create: function() {
        background = game.add.tileSprite(0,0 , 800, 600, 'end');
        var button = game.add.button(game.world.centerX - 95, 400, 'play', changeToMain, this);
        var style = { font: "30px Arial", fill: "#ffffff" };
        game.add.text(250, 200, 'Your score: ' + currScore, style);
        game.add.text(250, 250, 'High score: ' + highScore, style);
        var spaceKey = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
        spaceKey.onDown.add(changeToStart, this);
    }
};

function mute(){
    if(isMute) {
        music.play();
        isMute = false;
    }
    else {
       music.stop();
       isMute = true;
    }
}
//Main state which is basicly the game.
var mainState = {
    preload: function() { 
        game.load.image('background', 'assets/background.png');
        game.load.image('bird', 'assets/bird.png'); 
        game.load.image('pipe', 'assets/pipe.png');
        game.load.image('hole', 'assets/hole.png');
        game.load.image('muteButton', 'assets/mutebutton.png');
        game.load.image('foreground', 'assets/foreground.png');
        game.load.image('cloud', 'assets/cloud.png');
        game.load.audio('jump', 'assets/jump.wav');
        game.load.audio('song', 'assets/badmusic.mp3');
        game.load.audio('crash', 'assets/dead.mp3');
    },
    
    create: function() { 
        background = game.add.tileSprite(0,0, 800, 600, 'background');
        foreground = game.add.tileSprite(0,0, 800, 600, 'foreground');
        cloud = game.add.tileSprite(0,0, 800, 600, 'cloud');
        muteButton = game.add.button(40, 20, 'muteButton', mute, this);

        game.physics.startSystem(Phaser.Physics.ARCADE);

        this.bird = game.add.sprite(350, 245, 'bird');

        game.physics.arcade.enable(this.bird);

        this.bird.body.gravity.y = 1000;  

        var spaceKey = game.input.keyboard.addKey(
                Phaser.Keyboard.SPACEBAR);
        spaceKey.onDown.add(this.jump, this);  

        if(music === undefined) {
            music = game.add.audio('song');
            music.loopFull();
            jumpSound = game.add.audio('jump');
            crash = game.add.audio('crash');
        }

        this.score = 0;
        this.labelScore = game.add.text(20, 20, "0", { font: "30px Arial", fill: "#ffffff" }); 

        this.pipes = game.add.group(); 
        this.holes = game.add.group();
        this.timer = game.time.events.loop(2000, this.addRowOfPipes, this); 
        this.check = false;
    },

    update: function() {
        background.tilePosition.x -= 2;
        if (this.bird.y < 0 || this.bird.y > 490) {
            this.restartGame();
        }

        game.physics.arcade.overlap(this.bird, this.pipes, this.restartGame, null, this);
        
        game.physics.arcade.overlap(this.bird, this.holes, this.updateScore, null, this);


        if (this.bird.angle < 20) {
            this.bird.angle += 1;
        }

        background.tilePosition.x -= 2;
        foreground.tilePosition.x -=8;
        cloud.tilePosition.x -= 4;
    },

    updateScore: function() {
        if(this.check === false) {
            this.score += 1;
            this.labelScore.text = this.score;
        }
        this.check = true;
    },

    jump: function() {
        this.bird.body.velocity.y = -350;
        var animation = game.add.tween(this.bird);

        if(!isMute) {
            jumpSound.play();
        }

        animation.to({angle: -20}, 100);

        animation.start(); 
    },

    restartGame: function() {
        if(!isMute) {
            crash.play();
        }
        game.state.start('end');

        if(highScore < this.score) {
            highScore = this.score;
        }
        currScore = this.score;
    },

    addOnePipe: function(x, y, hole) {
        if(!hole) {      
            var pipe = game.add.sprite(x, y, 'pipe');

            this.pipes.add(pipe);

            game.physics.arcade.enable(pipe);

            pipe.body.velocity.x = -200; 

            pipe.checkWorldBounds = true;
            pipe.outOfBoundsKill = true;
        }
        else {
            var hole = game.add.sprite(x, y, '');
            this.holes.add(hole);
            game.physics.arcade.enable(hole);
            hole.body.velocity.x = -200;
        }
        this.check = false;

    },

    addRowOfPipes: function() {
        var hole = Math.floor(Math.random() * 6) + 1;

        for (var i = 0; i < 10; i++) {
            if (i != hole && i != hole + 1) {
                this.addOnePipe(800, i * 60 + 10, false);   
            }
            else {
                this.addOnePipe(800, i*60 +10, true);
            }
        }
    },
};

game.state.add('start', startState);  
game.state.add('main', mainState);  
game.state.add('end', endState);

game.state.start('start');


