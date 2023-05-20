import './style.css'
import Phaser from 'phaser'
import { HEIGHT, WIDTH } from './constant'
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
    scene: [GameScene],
}

new Phaser.Game(config)
