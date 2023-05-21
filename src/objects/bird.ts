import Phaser from 'phaser'
import { JUMP_FORCE } from '../constant'

class Bird extends Phaser.Physics.Arcade.Sprite {
    constructor(scene: Phaser.Scene, x: number, y: number) {
        super(scene, x, y, 'bird')
        this.anims.create({
            key: 'fly',
            frames: 'bird',
            duration: 500,
            repeat: -1,
        })
        this.anims.play('fly')
        scene.add.existing(this)
        scene.physics.add.existing(this)
    }

    jump(): void {
        this.setVelocityY(-JUMP_FORCE)
    }
}

export default Bird