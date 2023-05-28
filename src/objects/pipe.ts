import Phaser from 'phaser'

/**
 * Reoresents a pipe
 */
class Pipe extends Phaser.Physics.Arcade.Image {
    declare body: Phaser.Physics.Arcade.Body

    constructor(scene: Phaser.Scene, x: number, y: number, reverse: boolean) {
        super(scene, x, y, 'pipe')

        if (reverse) this.setAngle(180)

        scene.add.existing(this)
        scene.physics.add.existing(this)
    }
}

export default Pipe
