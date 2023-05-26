import {
    BACKGROUND_SPEED,
    FLOOR_SPEED,
    HEIGHT,
    PIPE_SPAWN_DELAY,
    PIPE_SPEED,
    WIDTH,
} from '../constant'
import Bird from '../objects/bird'
import Pipe from '../objects/pipe'
import Score from '../objects/score'

class GameScene extends Phaser.Scene {
    private background!: Phaser.GameObjects.TileSprite
    private floor!: Phaser.GameObjects.TileSprite
    private message!: Phaser.GameObjects.Image
    private gameover!: Phaser.GameObjects.Image
    private bird!: Bird
    private pipes!: Phaser.Physics.Arcade.Group
    private pipesTimer!: Phaser.Time.TimerEvent
    private emitter!: Phaser.GameObjects.Particles.ParticleEmitter
    private score!: Score

    constructor() {
        super({
            key: 'GameScene',
        })
    }

    preload() {
        this.load.image('background', 'background-day.png')
        this.load.image('floor', 'base.png')
        this.load.image('message', 'message.png')
        this.load.image('gameover', 'gameover.png')
        this.load.image('pipe', 'pipe-green.png')
        this.load.image('feather', 'feather.png')
        this.load.spritesheet('bird', 'redbird.png', {
            frameWidth: 34,
            frameHeight: 24,
        })
        this.load.audio('wing', ['audio/wing.ogg', 'audio/wing.wav'])
        this.load.audio('hit', ['audio/hit.ogg', 'audio/hit.wav'])
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
        this.floor.depth = 1
        this.physics.add.existing(this.floor, true)

        this.bird = new Bird(this, WIDTH / 5, HEIGHT / 2)
        this.bird.body.setAllowGravity(false)
        this.bird.setVisible(false)

        this.emitter = this.add.particles(0, 0, 'feather', {
            follow: this.bird,
            lifespan: 5000,
            gravityY: 150,
            emitting: false,
            scale: { min: 0.5, max: 1.5 },
            speed: { min: 159, max: 250 },
            rotate: { min: 0, max: 360 },
        })

        this.message = this.add.image(WIDTH / 2, HEIGHT / 2, 'message')

        this.gameover = this.add.image(WIDTH / 2, HEIGHT / 2, 'gameover')
        this.gameover.depth = 1
        this.gameover.setVisible(false)

        this.pipes = this.physics.add.group({
            velocityX: -PIPE_SPEED,
            allowGravity: false,
            immovable: true,
        })

        this.pipesTimer = this.time.addEvent({
            delay: PIPE_SPAWN_DELAY,
            loop: true,
            callback: this.addPipes,
            callbackScope: this,
            paused: true,
        })

        this.score = new Score(this, 10, 10)
        this.score.setDepth(1)

        // Handle input
        this.input.on('pointerdown', this.handleInput, this)
        this.input.keyboard?.on('keydown-SPACE', this.handleInput, this)
    }

    update(_time: number, delta: number): void {
        if (!this.gameover.visible) {
            this.background.tilePositionX += BACKGROUND_SPEED * delta
            this.floor.tilePositionX += FLOOR_SPEED * delta
        }

        this.pipes.getChildren().forEach((p) => {
            if (p instanceof Pipe) {
                if (p.x < -this.textures.get('pipe').getSourceImage().width / 2)
                    this.pipes.remove(p, true)
            }
        })

        this.physics.collide(
            this.bird,
            this.floor,
            this.handleCollision,
            undefined,
            this
        )

        this.physics.collide(
            this.bird,
            this.pipes,
            this.handleCollision,
            undefined,
            this
        )

        this.bird.body.checkWorldBounds()
    }

    handleInput() {
        if (this.message.visible) {
            this.message.setVisible(false)
            this.bird.setVisible(true)
            this.bird.body.setAllowGravity(true)
            this.pipesTimer.paused = false
        } else if (this.gameover.visible) {
            this.gameover.setVisible(false)
            this.bird.reset()
            this.bird.setVisible(true)
            this.score.reset()
            this.pipes.clear(true, true)
            this.pipes.setVelocityX(PIPE_SPEED)
            this.pipesTimer.paused = false
        }
        this.sound.play('wing')
        this.bird.jump()
    }

    handleCollision() {
        if (this.gameover.visible) return
        this.sound.play('hit')
        this.bird.setVisible(false)
        this.emitter.explode(100)
        this.gameover.setVisible(true)
        this.pipesTimer.paused = true
        this.pipes.setVelocityX(0)
    }

    addPipes() {
        const pipeImage = this.textures.get('pipe').getSourceImage()
        const x = WIDTH + pipeImage.width / 2
        const size = HEIGHT - this.textures.get('floor').getSourceImage().height
        const n = Math.floor(Math.random() * 5)
        const top = new Pipe(
            this,
            x,
            (n + 1) * (size / 8) - pipeImage.height / 2,
            true
        )
        const bottom = new Pipe(
            this,
            x,
            (n + 3) * (size / 8) + pipeImage.height / 2,
            false
        )
        this.pipes.addMultiple([top, bottom])
        this.score.increment()
    }
}

export default GameScene
