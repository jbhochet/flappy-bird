class Button extends Phaser.GameObjects.Image {
    constructor(scene: Phaser.Scene, x: number, y: number, callback: Function) {
        super(scene, x, y, 'button')

        scene.add.existing(this)

        this.setInteractive()

        this.on('pointerdown', () => {
            this.setTexture('button-pressed')
        })

        this.on('pointerup', () => {
            this.setTexture('button')
            callback()
        })
    }
}

export default Button
