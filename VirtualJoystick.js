class VirtualJoystickGraphic {
  constructor(scene, x, y) {
    this.scene = scene;
    this.x = x;
    this.y = y;
    this.baseCircle = null;
    this.stickCircle = null;
    this.dragging = false;
    this.draw();
  }

  draw() {
    this.baseCircle = this.scene.add
      .circle(this.x, this.y, 50, 0x888888)
      .setAlpha(0.5);
    this.stickCircle = this.scene.add
      .circle(this.x, this.y, 25, 0xcccccc)
      .setAlpha(0.5)
      .setInteractive();

    this.scene.input.setDraggable(this.stickCircle);
    this.stickCircle.on("dragstart", (pointer, dragX, dragY) => {
      this.dragging = true;
    });

    this.stickCircle.on("drag", (pointer, dragX, dragY) => {
      let distance = Phaser.Math.Distance.Between(this.x, this.y, dragX, dragY);
      if (distance < 50) {
        this.stickCircle.x = dragX;
        this.stickCircle.y = dragY;
      } else {
        let angle = Phaser.Math.Angle.Between(this.x, this.y, dragX, dragY);
        this.stickCircle.x = this.x + 50 * Math.cos(angle);
        this.stickCircle.y = this.y + 50 * Math.sin(angle);
      }
    });

    this.stickCircle.on("dragend", (pointer, dragX, dragY) => {
      this.dragging = false;
      this.stickCircle.x = this.x;
      this.stickCircle.y = this.y;
    });
  }

  show() {
    this.baseCircle.setAlpha(1);
    this.stickCircle.setAlpha(1);
  }

  hide() {
    this.baseCircle.setAlpha(0);
    this.stickCircle.setAlpha(0);
  }
}

export default VirtualJoystickGraphic;
