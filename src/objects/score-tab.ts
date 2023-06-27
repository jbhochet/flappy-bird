import { getBestScore } from '../utils/data'

class ScoreTab extends Phaser.GameObjects.Container {
    constructor(scene: Phaser.Scene, x: number, y: number, score: number) {
        super(scene, x, y)

        const best = getBestScore()

        const box = new Phaser.GameObjects.Image(scene, 0, 0, 'score-box')

        const style: Phaser.Types.GameObjects.Text.TextStyle = {
            fontFamily: 'FlappyBird',
            fontSize: 32,
            align: 'center',
        }

        const scoreText = new Phaser.GameObjects.Text(
            scene,
            0,
            0,
            `Score\n${score}`,
            style
        )

        const bestText = new Phaser.GameObjects.Text(
            scene,
            0,
            0,
            `Best\n${best}`,
            style
        )

        const offset = 20

        Phaser.Display.Align.In.LeftCenter(scoreText, box, -offset)

        Phaser.Display.Align.In.RightCenter(bestText, box, -offset)

        this.add([box, scoreText, bestText])

        scene.add.existing(this)
    }
}

export default ScoreTab
