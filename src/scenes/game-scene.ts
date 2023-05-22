import { BACKGROUND_SPEED, FLOOR_SPEED, HEIGHT, WIDTH } from '../constant'
import Bird from '../objects/bird'

class GameScene extends Phaser.Scene {
    private background!: Phaser.GameObjects.TileSprite
    private floor!: Phaser.GameObjects.TileSprite
    private message!: Phaser.GameObjects.Image
    private bird!: Bird

    constructor() {
        super({
            key: 'GameScene',
        })
    }

    preload() {
        this.load.image('background', 'background-day.png')
        this.load.image('floor', 'base.png')
        this.load.image('message', 'message.png')
        this.load.spritesheet('bird', 'redbird.png', {
            frameWidth: 34,
            frameHeight: 24,
        })
    }

    create() {
        // Add elements to the scene
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
        this.physics.add.existing(this.floor, true)

        this.message = this.add.image(WIDTH/2, HEIGHT/2, 'message')

        this.bird = new Bird(this, WIDTH / 5, HEIGHT / 2)
        this.bird.body.setAllowGravity(false)

        // Handle input
        this.input.on('pointerdown', this.handleInput, this)
        this.input.keyboard?.on('keydown-SPACE', this.handleInput, this)
    }

    update(_time: number, delta: number): void {
        this.background.tilePositionX += BACKGROUND_SPEED * delta
        this.floor.tilePositionX += FLOOR_SPEED * delta

        this.physics.collide(this.bird, this.floor)
        this.bird.body.checkWorldBounds()
    }

    handleInput() {
        if(this.message.visible) {
            this.message.setVisible(false)
            this.bird.body.setAllowGravity(true)
        }
        this.bird.jump()
    }
}

export default GameScene
