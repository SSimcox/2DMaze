/**
 * Created by Steven on 2/22/2017.
 */


/*****************************************
 *                                       *
 Graphics API
 *                                       *
 *****************************************/
let Graphics = (function () {
  let context = null;

  /**
   * Sets up seamless image for use on all tiles
   */
  let seamlessTileImage = new Image()
  let seamlessReady = false
  seamlessTileImage.onload = () => {
    seamlessReady = true
  }
  seamlessTileImage.src = "./images/Clouds.png"
  /**
   * Initializes the canvas and rendering context, creates our clear scenario
   */
  function initialize() {
    let canvas = document.getElementById('maze-canvas');
    context = canvas.getContext('2d');

    CanvasRenderingContext2D.prototype.clear = function () {
      this.save();
      this.setTransform(1, 0, 0, 1, 0, 0);
      this.clearRect(0, 0, canvas.width, canvas.height);
      this.restore();
    };
  }


  function Cell(spec){
    var that = {},
      image = seamlessTileImage


    that.draw = function(){
      context.strokeStyle='rgb(0,0,0)'
      if(seamlessReady) {
        context.drawImage(image,
          spec.x * (context.canvas.width / spec.dimensions),
          spec.y * (context.canvas.height / spec.dimensions),
          context.canvas.height / spec.dimensions,
          context.canvas.width / spec.dimensions
        )

        if (spec.cell.n == "open") {
          context.beginPath();
          context.moveTo(
            spec.x * context.canvas.width / spec.dimensions,
            spec.y * context.canvas.height / spec.dimensions
          )
          context.lineTo(
            (spec.x + 1) * context.canvas.width / spec.dimensions,
            spec.y * context.canvas.height / spec.dimensions)
        }
        if (spec.cell.e == "open") {
          context.beginPath();
          context.moveTo(
            (spec.x + 1) * context.canvas.width / spec.dimensions,
            spec.y * context.canvas.height / spec.dimensions
          )
          context.lineTo(
            (spec.x + 1) * context.canvas.width / spec.dimensions,
            (spec.y + 1) * context.canvas.height / spec.dimensions)
        }
        if (spec.cell.s == "open") {
          context.beginPath();
          context.moveTo(
            spec.x * context.canvas.width / spec.dimensions,
            (spec.y + 1) * context.canvas.height / spec.dimensions
          )
          context.lineTo(
            (spec.x + 1) * context.canvas.width / spec.dimensions,
            (spec.y + 1) * context.canvas.height / spec.dimensions)
        }
        if (spec.cell.w == "open") {
          context.beginPath();
          context.moveTo(
            spec.x * context.canvas.width / spec.dimensions,
            spec.y * context.canvas.height / spec.dimensions
          )
          context.lineTo(
            spec.x * context.canvas.width / spec.dimensions,
            (spec.y + 1) * context.canvas.height / spec.dimensions)
        }
      }
    }

    return that
  }

  /**
   * Generator for texture objects
   */
  function Texture(spec) {
    var that = {},
      ready = false,
      image = new Image();

    image.onload = () => {
      ready = true;
    };
    image.src = spec.imageSource;

    that.update = function () {
      //spec.rotation += 0.01;
    }

    that.moveLeft = function (elapsedTime) {
      spec.center.x -= (spec.speed * (elapsedTime / 1000));
    };

    that.moveRight = function (elapsedTime) {
      spec.center.x += (spec.speed * (elapsedTime / 1000));
    };

    that.rotateLeft = function (elapsedTime) {
      spec.rotation -= (spec.rotateRate * (elapsedTime / 1000));
    };

    that.rotateRight = function (elapsedTime) {
      spec.rotation += (spec.rotateRate * (elapsedTime / 1000));
    };

    that.draw = function () {
      if (ready) {
        context.save();

        context.translate(spec.center.x, spec.center.y);
        context.rotate(spec.rotation);
        context.translate(-spec.center.x, -spec.center.y);

        context.drawImage(
          image,
          spec.center.x - spec.width / 2,
          spec.center.y - spec.height / 2,
          spec.width, spec.height);

        context.restore();
      }
    }

    return that;
  }

  return {
    Cell,
    initialize: initialize,
    Texture: Texture
  };

}());