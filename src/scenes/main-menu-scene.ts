import Phaser from 'phaser'
import { HEIGHT, WIDTH } from '../constant'
import Button from '../objects/button'

class MainMenuScene extends Phaser.Scene {
    constructor() {
        super({
            key: 'MainMenuScene',
        })
    }

    public create(): void {
        const background = this.add.image(WIDTH / 2, HEIGHT / 2, 'background')
        const floor = this.add.image(0, 0, 'floor')
        const title = this.add.text(0, 0, 'Flappy Bird', {
            fontFamily: 'FlappyBird',
            fontSize: 64,
            shadow: {
                offsetX: -5,
                offsetY: 5,
                fill: true,
            },
        })
        const btnPlay = new Button(this, 0, 0, 'Play', () => {
            this.scene.start('GameScene')
        })

        const offset = 110

        // Center title
        Phaser.Display.Align.In.Center(title, background, 0, -offset)

        // Center button and label
        Phaser.Display.Align.In.Center(btnPlay, background, 0, offset)

        // Center floor at bottom
        Phaser.Display.Align.In.BottomCenter(floor, background)
    }
}

export default MainMenuScene
