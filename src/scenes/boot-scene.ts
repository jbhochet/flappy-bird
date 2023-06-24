import { HEIGHT, WIDTH } from '../constant'

class BootScene extends Phaser.Scene {
    constructor() {
        super({
            key: 'BootScene',
        })
    }

    public preload(): void {
        const barHeight = 30
        const barWidth = 200

        const x = WIDTH / 2 - barWidth / 2
        const y = HEIGHT / 2 - barHeight / 2

        const progressBar = this.add.graphics()
        const progressBox = this.add.graphics()

        progressBox.fillStyle(0x222222, 0.8)
        progressBox.fillRect(x, y, barWidth, barHeight)

        this.load.image('icon', 'favicon.ico')
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

        this.load.on('progress', (value: number) => {
            progressBar.clear()
            progressBar.fillStyle(0xffffff, 1)
            progressBar.fillRect(x, y, barWidth * value, barHeight)
        })

        this.load.on('complete', () => {
            progressBar.destroy()
            progressBox.destroy()

            this.add.image(WIDTH / 2, HEIGHT / 2, 'icon')

            this.time.delayedCall(
                1000,
                () => {
                    this.scene.start('GameScene')
                },
                undefined,
                this
            )
        })
    }
}

export default BootScene
