class GameOver extends Phaser.Scene {
    constructor() {
        super("gameoverScene");
    }
    create() {
        
        this.menuscreen = this.add.tileSprite(0, 0, 840, 525, 'gameoverbackground').setOrigin(0, 0);
        // define keys
        keyUP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
        keyDOWN = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN);
    }

    update() {
        if (Phaser.Input.Keyboard.JustDown(keyUP)) {
            this.scene.start('runnerScene');
        }
        if (Phaser.Input.Keyboard.JustDown(keyDOWN)) {
            this.scene.start('menuScene');
        }
    }
}
