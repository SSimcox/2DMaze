/**
 * Created by Steven on 1/30/2017.
 */

let MyGame = (function() {
  let that = {};
  let previousTime = performance.now();
  let elapsedTime = 0;
  let inputDispatch = {};
  let canvas = document.getElementById("maze-canvas");

  let backgroundImage = Graphics.Texture({
    imageSource: './images/forest.jpeg',
    center: {x: canvas.width / 2, y: canvas.height / 2},
    width: canvas.width,
    height: canvas.height,
    rotation: 0,
    speed: 300, // pixels per second
    rotateRate: 3.14159 // radians per second
  });
}())

MyGame.backgroundImage.draw();