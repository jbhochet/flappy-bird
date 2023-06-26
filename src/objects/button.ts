class Button extends Phaser.GameObjects.Container {
    constructor(
        scene: Phaser.Scene,
        x: number,
        y: number,
        label: string,
        callback: Function
    ) {
        super(scene, x, y)

        let img = new Phaser.GameObjects.Image(scene, 0, 0, 'button')
        let text = new Phaser.GameObjects.Text(scene, 0, 0, label, {
            fontFamily: 'FlappyBird',
            fontSize: 32,
        })

        Phaser.Display.Align.In.TopCenter(text, img)

        this.add([img, text])

        img.setInteractive()

        img.on('pointerdown', () => {
            img.setTexture('button-pressed')
        })

        img.on('pointerup', () => {
            img.setTexture('button')
            callback()
        })

        scene.add.existing(this)
    }
}

export default Button
