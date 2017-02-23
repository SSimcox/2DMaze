/**
 * Created by Steven on 2/13/2017.
 */
'use strict';


let Graphics = (function () {
  let context = null;

  function initialize() {
    let canvas = document.getElementById('canvas-main');
    context = canvas.getContext('2d');

    CanvasRenderingContext2D.prototype.clear = function() {
      this.save();
      this.setTransform(1, 0, 0, 1, 0, 0);
      this.clearRect(0, 0, canvas.width, canvas.height);
      this.restore();
    };
  }

  function Rectangle(spec) {
    let that = {};

    that.update = function() {
      spec.rotation += 0.01;
    };

    that.draw = function() {
      context.save();

      context.translate(spec.corner.x + spec.size.w / 2, spec.corner.y + spec.size.h / 2);
      context.rotate(spec.rotation);
      context.translate(-(spec.corner.x + spec.size.w / 2), -(spec.corner.y + spec.size.h / 2));

      context.fillStyle = spec.fillStyle;
      context.fillRect(spec.corner.x, spec.corner.y, spec.size.w, spec.size.h);

      context.strokeStyle = spec.strokeStyle;
      context.strokeRect(spec.corner.x, spec.corner.y, spec.size.w, spec.size.h);

      context.restore();
    }

    return that;
  }

  function Triangle(spec) {
    var that = {};

    that.update = function() {
      spec.rotation += 0.015;
    };

    that.draw = function() {
      context.save();

      context.translate(spec.center.x, spec.center.y);
      context.rotate(spec.rotation);
      context.translate(-spec.center.x, -spec.center.y);

      context.beginPath();
      context.moveTo(spec.pt1.x, spec.pt1.y);
      context.lineTo(spec.pt2.x, spec.pt2.y);
      context.lineTo(spec.pt3.x, spec.pt3.y);
      context.closePath();

      context.fillStyle = spec.fillStyle;
      context.fill();

      context.strokeStyle = spec.strokeStyle;
      context.lineWidth = spec.lineWidth;
      context.stroke();

      context.restore();
    };

    return that;
  }

  function Texture(spec) {
    var that = {},
      ready = false,
      image = new Image();

    image.onload = () => {
      ready = true;
    };
    image.src = spec.imageSource;

    that.update = function() {
      //spec.rotation += 0.01;
    }

    that.moveLeft = function(elapsedTime) {
      spec.center.x -= (spec.speed * (elapsedTime / 1000));
    };

    that.moveRight = function(elapsedTime) {
      spec.center.x += (spec.speed * (elapsedTime / 1000));
    };

    that.rotateLeft = function(elapsedTime) {
      spec.rotation -= (spec.rotateRate * (elapsedTime / 1000));
    };

    that.rotateRight = function(elapsedTime) {
      spec.rotation += (spec.rotateRate * (elapsedTime / 1000));
    };

    that.draw = function() {
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

  function beginRender() {
    context.clear();
  }

  return {
    beginRender: beginRender,
    initialize: initialize,
    Rectangle: Rectangle,
    Triangle: Triangle,
    Texture: Texture
  };
}());


  function update() {
    backgroundImage.update();
  }

  function render() {
    Graphics.beginRender();
    backgroundImage.draw();
  }

  function gameLoop(time) {
    elapsedTime = time - previousTime;
    previousTime = time;

    update(time);
    render();

    requestAnimationFrame(gameLoop);
  }

  function keyDown(e) {
    if (inputDispatch.hasOwnProperty(e.key)) {
      inputDispatch[e.key](elapsedTime);
    }
  }

  that.initialize = function() {
    Graphics.initialize();

    window.addEventListener('keydown', keyDown);

    inputDispatch['a'] = backgroundImage.moveLeft;
    inputDispatch['d'] = backgroundImage.moveRight;
    inputDispatch['q'] = backgroundImage.rotateLeft;
    inputDispatch['e'] = backgroundImage.rotateRight;

    gameLoop();
  }

  return that;
}());

