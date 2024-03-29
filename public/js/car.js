class Car {
  canvas = null;

  color = "#ff0000";
  width = 40;
  height = 20;
  dir = { x: 0, y: 0 };
  speed = 1;
  maxSpeed = 3;
  angle = 0;
  turnSpeed = 800;
  baseColor = "#ff0000";
  shadeColor = "#ff0000";
  trail = [];
  addTrail = false;

  constructor(canvas, color) {
    this.canvas = canvas;
    this.color = color;

    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
  }

  update = () => {
    if (Math.abs(this.speed) > 0.2) {
      this.angle -= this.dir.x / this.turnSpeed;
    }

    if (this.dir.y === -1) {
      this.speed += 1;
    }

    if (this.dir.y === 1) {
      this.speed -= 1;
    }

    if (this.speed > this.maxSpeed) {
      this.speed = this.maxSpeed;
    }

    if (this.speed < -this.maxSpeed) {
      this.speed = -this.maxSpeed;
    }

    this.x += Math.cos(this.angle) * this.speed;
    this.y += Math.sin(this.angle) * this.speed;

    if (this.addTrail) {
      this.trail.push({
        x: this.x,
        y: this.y,
        angle: this.angle,
      });
      this.addTrail = false;
    } else {
      this.addTrail = true;
    }

    if (this.trail.length > 150) {
      this.trail.shift();
    }

    if (this.x > canvas.width) {
      this.x = 0;
    }

    if (this.x < 0) {
      this.x = canvas.width;
    }

    if (this.y > canvas.height) {
      this.y = 0;
    }

    if (this.y < 0) {
      this.y = canvas.height;
    }

    this.speed *= 0.9;
  };
}

export default Car;
