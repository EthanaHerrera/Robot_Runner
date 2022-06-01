class Load extends Phaser.Scene {
    constructor() {
        super('loadScene');
    }

    preload() {
        // set load path
        this.load.path = 'assets/';
        // take care of all of our asset loading now

        // Atlas
        this.load.atlas('robot_atlas', 'robotmap.png', 'robotmap.json');

        // Images
        this.load.image('playbackground', 'background.png');
        this.load.image('groundScroll', 'ground.png');
        this.load.image('gameoverbackground', 'gameoverbackground.png');
        this.load.image('menubackground', 'menubackground.png');
        this.load.image('ship', 'smallship.png');
        this.load.image('FarCity', 'farCity_Bg.png');
        this.load.image('CloseCity', 'closeCity_Bg.png');
        this.load.image('Sunset', 'sunset_Bg.png');
        this.load.image('Clouds', 'clouds_Bg.png');

        // Sounds
        this.load.audio('startgame', 'startgame.mp3');
        this.load.audio('backgroundmusic', 'backgroundmusic.mp3');
        this.load.audio('jumpsound', 'jumpsound.mp3');
        this.load.audio('gameoversound', 'gameoversound.wav');
    }

    create() {
        this.anims.create({ 
            key: 'run_left', 
            frames: this.anims.generateFrameNames('robot_atlas', {
                prefix: 'run_left_',
                start: 1,
                end: 11,
                suffix: '',
                zeroPad: 4 
            }), 
            frameRate: 30,
            repeat: -1 
        });

        this.anims.create({ 
            key: 'jump_left', 
            frames: this.anims.generateFrameNames('robot_atlas', {
                prefix: 'jump_left_',
                start: 1,
                end: 15,
                suffix: '',
                zeroPad: 4 
            }), 
            frameRate: 30,
            repeat: -1 
        });
        
        this.scene.start('menuScene');
    }
}
