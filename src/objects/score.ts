import Phaser from 'phaser'

/**
 * Represents a score
 */
class Score extends Phaser.GameObjects.Text {
    private score: number

    constructor(scene: Phaser.Scene, x: number, y: number) {
        super(scene, x, y, '0', {
            fontSize: 25,
        })
        this.score = 0
        scene.add.existing(this)
    }

    /**
     * Updates display
     */
    private refresh(): void {
        this.setText(this.score.toString())
    }

    /**
     * Increments the score by one
     */
    public increment(): void {
        this.score += 1
        this.refresh()
    }

    /**
     * Resets the score to zero
     */
    public reset(): void {
        this.score = 0
        this.refresh()
    }
}

export default Score
