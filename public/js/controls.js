export default class Controls {
  setupControls = (car) => {
    const onKeyDown = (e) => {
      if (e.keyCode === 37) {
        car.dir.x = 1;
      }

      if (e.keyCode === 39) {
        car.dir.x = -1;
      }

      if (e.keyCode === 38) {
        car.dir.y = 1;
      }

      if (e.keyCode === 40) {
        car.dir.y = -1;
      }

      if (e.keyCode === 32) {
        car.boost = 4;
      }
    };

    const onKeyUp = (e) => {
      if (e.keyCode === 37) {
        car.dir.x = 0;
      }

      if (e.keyCode === 39) {
        car.dir.x = 0;
      }

      if (e.keyCode === 38) {
        car.dir.y = 0;
      }

      if (e.keyCode === 40) {
        car.dir.y = 0;
      }
    };

    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("keyup", onKeyUp);
  };
}
