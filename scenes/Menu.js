class Menu extends Phaser.Scene {
    constructor() {
        super("menuScene");
    }
    create() {        
        this.menuscreen = this.add.tileSprite(0, 0, 840, 525, 'menubackground').setOrigin(0, 0);

        keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
    }

    update() {
        if (Phaser.Input.Keyboard.JustDown(keySPACE)) {
          this.sound.play('startgame');
          this.scene.start('runnerScene');
        }
    }
}
