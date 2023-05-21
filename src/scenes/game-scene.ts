import { BACKGROUND_SPEED, HEIGHT, WIDTH } from '../constant'

class GameScene extends Phaser.Scene {
    private background!: Phaser.GameObjects.TileSprite

    constructor() {
        super({
            key: 'GameScene',
        })
    }

    preload() {
        this.load.image('background', 'background-day.png')
    }

    create() {
        this.background = this.add.tileSprite(
            WIDTH / 2,
            HEIGHT / 2,
            0,
            0,
            'background'
        )
    }

    update(_time: number, delta: number): void {
        this.background.tilePositionX += BACKGROUND_SPEED * delta
    }
}

export default GameScene
