// Spaceship prefab
class Spaceship extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame, pointValue) {
        super(scene, x, y, texture, frame);
        scene.add.existing(this);                     
        this.points = pointValue;                     
        this.moveSpeed = 1000; 
    }

    update() {
        if(this.x <= 10) {
            this.setVelocityX=(-Phaser.Math.Between(200, 8000));
            console.log('Update');
        }
    }
}
