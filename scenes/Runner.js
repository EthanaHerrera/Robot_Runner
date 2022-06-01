class Runner extends Phaser.Scene {
    constructor() {
        super('runnerScene');
    }
    create() {
        // variables and settings
        this.JUMP_VELOCITY = -500;
        this.MAX_JUMPS = 4;
        this.SCROLL_SPEED = 2;
        this.physics.world.gravity.y = 2600;

        // add background
        this.sunset = this.add.tileSprite(0, 0, game.config.width, game.config.height, 'Sunset').setOrigin(0).setScale(7);

        // add parralax scolling
        this.clouds = this.add.tileSprite(0, 0, game.config.width, game.config.height, 'Clouds').setOrigin(0).setScale(7);
        this.far = this.add.tileSprite(0, 0, game.config.width, game.config.height, 'FarCity').setOrigin(0).setScale(7);
        this.close = this.add.tileSprite(0, 0, game.config.width, game.config.height, 'CloseCity').setOrigin(0).setScale(7);
 
        // make ground tiles group
        this.ground = this.add.group();
        for(let i = 0; i < game.config.width; i += tileSize) {
            let groundTile = this.physics.add.sprite(i, game.config.height - tileSize, 'robot_atlas').setScale(SCALE).setOrigin(0);
            groundTile.body.immovable = true;
            groundTile.body.allowGravity = false;
            this.ground.add(groundTile);
        }

        this.ship1 = this.physics.add.sprite(800, 1058, 'ship');
        this.ship1.body.setAllowGravity(false).setVelocityX(-Phaser.Math.Between(200, 800));
        this.ship2 = this.physics.add.sprite(1500, 2116, 'ship');
        this.ship2.body.setAllowGravity(false).setVelocityX(-Phaser.Math.Between(200, 800));
        this.ship3 = this.physics.add.sprite(1000, 397, 'ship');
        this.ship3.body.setAllowGravity(false).setVelocityX(-Phaser.Math.Between(200, 800));

        // put another tile sprite above the ground tiles
        this.groundScroll = this.add.tileSprite(0, game.config.height-tileSize, game.config.width, tileSize, 'groundScroll').setOrigin(0);

        // set up my robot
        this.robot = this.physics.add.sprite(120, game.config.height/2-tileSize *2, 'robot_atlas');

        this.score = 0;

        let scoreConfig = {
            fontFamily: 'Courier',
            fontSize: '28px',
            backgroundColor: '#FFFFFF',
            color: '#843605',
            align: 'center',
            padding: {
            top: 10,
            bottom: 10,
            },
            fixedWidth: 120
        };

        this.scoreRight = this.add.text(700, 50, this.formatClock(this.score), scoreConfig);

        this.scoreEvent = this.time.addEvent({delay: 1000, callback: () => {this.score += 1000; this.scoreRight.text = this.formatClock(this.score);}, scope: this, loop: true});

        // set up Phaser-provided cursor key input
        cursors = this.input.keyboard.createCursorKeys();

        // add physics collider
        this.physics.add.collider(this.robot, this.ground);

        this.loopingAudio = this.sound.add("backgroundmusic");
        // Set looping to true in the sound config object and play the audio
        this.loopingAudio.play({
            loop: true
        });
    }

    update() {
        // update tile sprites (tweak for more "speed")
        this.groundScroll.tilePositionX += this.SCROLL_SPEED;

        // make background layers scroll
        this.clouds.tilePositionX -= this.SCROLL_SPEED/10;
        this.far.tilePositionX -= this.SCROLL_SPEED/9;
        this.close.tilePositionX -= this.SCROLL_SPEED/6;
        

		// check if robot is grounded
	    this.robot.isGrounded = this.robot.body.touching.down;

	    // if so, we have jumps to spare
	    if(this.robot.isGrounded) {
            this.robot.anims.play('run_left', true);
	    	this.jumps = this.MAX_JUMPS;
	    	this.jumping = false;
	    } else {
            this.sound.play('jumpsound');
	    	this.robot.anims.play('jump_left');
	    }

        // allow steady velocity change up to a certain key down duration
	    if(this.jumps > 0 && Phaser.Input.Keyboard.DownDuration(cursors.up, 150)) {
	        this.robot.body.velocity.y = this.JUMP_VELOCITY;
	        this.jumping = true;
	    }

        // finally, letting go of the UP key subtracts a jump
	    if(this.jumping && Phaser.Input.Keyboard.UpDuration(cursors.up)) {
	    	this.jumps--;
	    	this.jumping = false;
	    }

        // update spaceship speed
        this.ship1.update();
        this.ship2.update();
        this.ship3.update();


        // wrap physics object(s) .wrap(gameObject, padding)
        this.physics.world.wrap(this.ship1, this.ship1.width/2);
        this.physics.world.wrap(this.ship2, this.ship2.width*10);
        this.physics.world.wrap(this.ship3, this.ship3.width*2);

        // Check for Collision on ships
        if(this.checkCollision(this.robot, this.ship1)) {
            this.sound.stopAll();  
            this.sound.play('gameoversound');
            this.shipExplode();
        }
        if(this.checkCollision(this.robot, this.ship2)) {
            this.sound.stopAll();  
            this.sound.play('gameoversound');
            this.shipExplode();
        }
        if(this.checkCollision(this.robot, this.ship3)) {
            this.sound.stopAll();  
            this.sound.play('gameoversound');
            this.shipExplode();
        }
    }

    checkCollision(robot, ship) {
        // simple AABB checking
        if (robot.x < ship.x + ship.width && 
            robot.x + robot.width > ship.x && 
            robot.y < ship.y + ship.height &&
            robot.height + robot.y > ship. y) {
                return true;
        } else {
            return false;
        }
    }

    shipExplode() {
        this.scene.start('gameoverScene');
    }

    formatClock(milliseconds) {
        let seconds = milliseconds/1000;
        seconds = seconds.toString().padStart(2, "0");
        return `${seconds}`;
    }
}