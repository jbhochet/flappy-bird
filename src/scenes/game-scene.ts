import { BACKGROUND_SPEED, FLOOR_SPEED, HEIGHT, WIDTH } from '../constant'

class GameScene extends Phaser.Scene {
    private background!: Phaser.GameObjects.TileSprite
    private floor!: Phaser.GameObjects.TileSprite

    constructor() {
        super({
            key: 'GameScene',
        })
    }

    preload() {
        this.load.image('background', 'background-day.png')
        this.load.image('floor', 'base.png')
    }

    create() {
        this.background = this.add.tileSprite(
            WIDTH / 2,
            HEIGHT / 2,
            0,
            0,
            'background'
        )
        this.floor = this.add.tileSprite(
            WIDTH / 2,
            HEIGHT - this.textures.get('floor').getSourceImage().height / 2,
            0,
            0,
            'floor'
        )
    }

    update(_time: number, delta: number): void {
        this.background.tilePositionX += BACKGROUND_SPEED * delta
        this.floor.tilePositionX += FLOOR_SPEED * delta
    }
}

export default GameScene
