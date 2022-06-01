// Game Name: Robot Runner
// Collaborators: Ethan Herrera, Horacio Castillo, and Matthew Herrera
// Completed 6/1/2022
// Creative Tilt:
// For our game we gave it a cool Robot theme where we were trying to make it as if the player was escaping something by
// making the Robot run on rooftops at sunset. Technically, I also think the implementation of the load screen was very useful
// as it creates a single place to load all assets. Then figuring out how to make the arcade physocs work properly is something
// I am proud of and the parallax scrolling added a nice amount of depth and intrest to the game without altering the gameplay.


'use strict';

// global variables
let cursors;
const SCALE = 0.5;
const tileSize = 35;

// main game object
let config = {
    type: Phaser.WEBGL,
    width: 840,
    height: 525,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: {
                x: 0,
                y: 0
            }
        }
    },
    scene: [ Load, Menu, Runner, GameOver]
};

let game = new Phaser.Game(config);
let borderUISize = game.config.height / 15;
let borderPadding = borderUISize / 3;

let keySPACE, keyUP, keyDOWN;
