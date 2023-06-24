import './style.css'
import Phaser from 'phaser'
import { HEIGHT, WIDTH } from './constant'
import BootScene from './scenes/boot-scene'
import GameScene from './scenes/game-scene'

const config: Phaser.Types.Core.GameConfig = {
    mode: Phaser.AUTO,
    width: WIDTH,
    height: HEIGHT,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 200 },
        },
    },
    scene: [BootScene, GameScene],
    scale: {
        mode: Phaser.Scale.ScaleModes.FIT,
        autoCenter: Phaser.Scale.Center.CENTER_BOTH,
    },
}

new Phaser.Game(config)
