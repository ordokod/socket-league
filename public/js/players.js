import Car from "./car.js";
export default class Players {
  constructor(canvas) {
    /* const player = {
      id: Date.now(),
      color: "#7ec850",
      car: new Car(canvas, "#7ec850"),
    };

    player.car.dir = { x: 6, y: 1 }; */

    this.players = [];

    const socket = io();

    socket.on("new-player", (player) => {
      player.car = new Car(canvas, player.color);
      this.players.push(player);
    });

    socket.on("player-move", (player) => {
      const playerIndex = this.players.findIndex((p) => p.id === player.id);

      if (playerIndex === -1) return;

      this.players[playerIndex].car.dir = player.dir;
    });
  }

  add(player) {
    this.players.push(player);
  }

  get() {
    return this.players;
  }
}
