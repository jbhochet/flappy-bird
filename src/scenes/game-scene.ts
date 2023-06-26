import {
    BACKGROUND_SPEED,
    FLOOR_SPEED,
    HEIGHT,
    PIPE_SPAWN_DELAY,
    PIPE_SPEED,
    WIDTH,
} from '../constant'
import Bird from '../objects/bird'
import Button from '../objects/button'
import Pipe from '../objects/pipe'
import Score from '../objects/score'
import ScoreTab from '../objects/score-tab'
import { getBestScore, setBestScore } from '../utils/data'

/**
 * Represents the main scene of the game
 */
class GameScene extends Phaser.Scene {
    private background!: Phaser.GameObjects.TileSprite
    private floor!: Phaser.GameObjects.TileSprite
    private message!: Phaser.GameObjects.Image
    private bird!: Bird
    private pipes!: Phaser.Physics.Arcade.Group
    private pipesTimer!: Phaser.Time.TimerEvent
    private emitter!: Phaser.GameObjects.Particles.ParticleEmitter
    private score!: Score
    private gameover!: boolean

    constructor() {
        super({
            key: 'GameScene',
        })
    }

    create() {
        this.gameover = false

        // Add background
        this.background = this.add.tileSprite(
            WIDTH / 2,
            HEIGHT / 2,
            0,
            0,
            'background'
        )
        // Add floor
        this.floor = this.add.tileSprite(0, 0, 0, 0, 'floor')
        this.floor.depth = 1
        Phaser.Display.Align.In.BottomCenter(this.floor, this.background)
        this.physics.add.existing(this.floor, true)

        // Add bird
        this.bird = new Bird(this, 0,0)
        this.bird.body.setAllowGravity(false)
        Phaser.Display.Align.In.LeftCenter(this.bird, this.background, -20)

        // Add particles emitter
        this.emitter = this.add.particles(0, 0, 'feather', {
            follow: this.bird,
            lifespan: 5000,
            gravityY: 150,
            emitting: false,
            scale: { min: 0.5, max: 1.5 },
            speed: { min: 159, max: 250 },
            rotate: { min: 0, max: 360 },
        })

        // Add message image
        this.message = this.add.image(WIDTH / 2, HEIGHT / 2, 'message')

        // Create and setup pipes group
        this.pipes = this.physics.add.group({
            velocityX: -PIPE_SPEED,
            allowGravity: false,
            immovable: true,
        })

        // Creation of the timer that will create pipes
        this.pipesTimer = this.time.addEvent({
            delay: PIPE_SPAWN_DELAY,
            loop: true,
            callback: this.addPipes,
            callbackScope: this,
            paused: true,
        })

        this.score = new Score(this, 10, 10)
        this.score.setDepth(1)
        Phaser.Display.Align.In.TopCenter(this.score, this.background, 0, -20)

        // Handle input
        this.input.on('pointerdown', this.handleInput, this)
        this.input.keyboard?.on('keydown-SPACE', this.handleInput, this)
    }

    update(_time: number, delta: number): void {
        // Stops floor and background scrolling when the game is lost
        if (!this.gameover) {
            this.background.tilePositionX += BACKGROUND_SPEED * delta
            this.floor.tilePositionX += FLOOR_SPEED * delta
        }

        // Removes pipes outside the screen
        this.pipes.getChildren().forEach((p) => {
            if (p instanceof Pipe) {
                if (p.x < -this.textures.get('pipe').getSourceImage().width / 2)
                    this.pipes.remove(p, true)
            }
        })

        // Checks for collisions with the floor
        this.physics.collide(
            this.bird,
            this.floor,
            this.handleCollision,
            undefined,
            this
        )

        // Check pipe collisions
        this.physics.collide(
            this.bird,
            this.pipes,
            this.handleCollision,
            undefined,
            this
        )

        // Prevents the bird from leaving the screen
        this.bird.body.checkWorldBounds()
    }

    /**
     * Handle user inputs
     */
    handleInput() {
        if (this.message.visible) {
            // The game starts for the first time
            this.message.setVisible(false)
            this.bird.body.setAllowGravity(true)
            this.pipesTimer.paused = false
        }
        // Makes the bird jump
        this.sound.play('wing')
        this.bird.jump()
    }

    /**
     * Ends the game in a collision
     */
    handleCollision() {
        if (this.gameover) return

        // stop the game
        this.gameover = true
        this.sound.play('hit')
        this.bird.setVisible(false)
        this.emitter.explode(100)
        this.pipesTimer.paused = true
        this.pipes.setVelocityX(0)
        this.score.setVisible(false)

        // store score if it is the best
        const best = getBestScore()
        const score = this.score.getScore()
        if (score > best) setBestScore(score)

        // show gameover and score
        let gameoverImg = this.add.image(0, 0, 'gameover')

        let scoreTab = new ScoreTab(this, 0, 0, this.score.getScore())

        let btnOk = new Button(this, 0, 0, 'Ok', () => {
            this.scene.start('MainMenuScene')
        })
        btnOk.setDepth(1)

        // align gameover image
        Phaser.Display.Align.In.TopCenter(gameoverImg, this.background, 0, -50)
        // align display score
        Phaser.Display.Align.In.Center(scoreTab, this.background, 0, 0)
        // align button
        Phaser.Display.Align.In.BottomCenter(btnOk, this.background, 0, -100)
    }

    /**
     * Adds two pipes
     */
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
        Phaser.Display.Align.In.TopCenter(this.score, this.background, 0, -20)
    }
}

export default GameScene
