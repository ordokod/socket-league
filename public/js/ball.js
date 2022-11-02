export default class Ball {
  canvas = null;
  cars = [];
  x = 0;
  y = 0;
  speed = 0;
  radius = 10;
  angle = 0;

  constructor(canvas, cars) {
    this.canvas = canvas;
    this.x = canvas.width / 2;
    this.y = canvas.height / 2;
    this.speed = 0;
    this.radius = 12;
    this.angle = 0;
  }

  update = (cars) => {
    this.x += Math.cos(this.angle) * this.speed;
    this.y += Math.sin(this.angle) * this.speed;

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

    if (this.speed > this.maxSpeed) {
      this.speed = this.maxSpeed;
    } else if (this.speed < -this.maxSpeed) {
      this.speed = -this.maxSpeed;
    }

    if (!this.cars) return;

    cars.forEach((car) => {
      if (
        this.x + this.radius > car.x - car.width / 2 &&
        this.x - this.radius < car.x + car.width / 2 &&
        this.y + this.radius > car.y - car.height / 2 &&
        this.y - this.radius < car.y + car.height / 2
      ) {
        this.angle = car.angle;
        if (car.speed > 0) {
          this.speed = car.speed + 5;
        } else {
          this.speed = car.speed - 5;
        }
      }
    });

    this.speed *= 0.99;
  };
}
