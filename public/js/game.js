import Ball from "./ball.js";
import Players from "./players.js";
class Game {
  canvas = null;
  ctx = null;
  cars = [];
  ball = null;

  constructor(canvasId) {
    this.canvas = document.getElementById(canvasId);

    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;

    this.ctx = this.canvas.getContext("2d");

    this.ball = new Ball(this.canvas, this.players);

    const players = new Players(this.canvas);
    this.players = players.get();
  }

  start = () => {
    this.loop();
  };

  loop = () => {
    this.ctx.fillStyle = "#7ec850";
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

    if (!this.ball) return;
    if (!this.players) return;

    this.players.forEach((player) => {
      player.car.update();
      this.drawCar(player.car);
    });

    this.ball.update(this.players.map((p) => p.car));

    this.checkCollisions();
    this.render();

    requestAnimationFrame(this.loop);
  };

  drawCar = (car) => {
    this.ctx.save();
    this.ctx.translate(car.x, car.y);
    this.ctx.rotate(car.angle);
    this.ctx.fillStyle = car.color;

    this.ctx.strokeRect(-car.width / 2, -car.height / 2, car.width, car.height);
    this.ctx.fillRect(-car.width / 2, -car.height / 2, car.width, car.height);

    this.ctx.fillStyle = "#333";
    this.ctx.fillRect(
      -car.width / 2 + car.width / 3.5,
      -car.height / 2 + car.height / 10,
      car.width / 5,
      car.height - car.height / 5
    );

    this.ctx.fillRect(
      -car.width / 2 + car.width / 1.15,
      -car.height / 2 + car.height / 10,
      car.width / 12,
      car.height - car.height / 5
    );

    this.ctx.restore();
  };

  drawBall = (ball) => {
    this.ctx.fillStyle = "#555";
    this.ctx.beginPath();
    this.ctx.arc(ball.x, ball.y, ball.radius, 0, 2 * Math.PI);
    this.ctx.fill();
  };

  checkCollision = (car1, car2) => {
    if (
      car1.x + car1.width / 2 > car2.x - car2.width / 2 &&
      car1.x - car1.width / 2 < car2.x + car2.width / 2 &&
      car1.y + car1.height / 2 > car2.y - car2.height / 2 &&
      car1.y - car1.height / 2 < car2.y + car2.height / 2
    ) {
      return true;
    }
    return false;
  };

  checkCollisions = () => {
    for (let i = 0; i < this.players.length; i++) {
      for (let j = i + 1; j < this.players.length; j++) {
        if (this.checkCollision(this.players[i].car, this.players[j].car)) {
          this.players[i].car.speed = -this.players[i].car.speed * 2;
          this.players[j].car.speed = -this.players[j].car.speed * 2;
        }
      }
    }
  };

  render = () => {
    this.drawBall(this.ball);
  };
}

const game = new Game("canvas");
game.start();

const output = document.getElementById("turnspeed-output");
output.innerHTML = "TURN SPEED: 0.1";

document.getElementById("turnspeed").addEventListener("change", (e) => {
  game.players.forEach((player) => {
    player.car.turnSpeed = parseFloat(e.target.value);
  });
  output.innerHTML = "TURN SPEED: " + e.target.value;
});
