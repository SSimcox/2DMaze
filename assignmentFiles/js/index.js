/**
 * Created by Steven on 1/30/2017.
 */

window.onload = function() {

  /*****************************************
   *                                       *
       Input Handler
   *                                       *
   *****************************************/
  let InputMap = {
    _pressed: {},

    LEFT: 37,
    UP: 38,
    RIGHT: 39,
    DOWN: 40,

    W: 87,
    A: 65,
    S: 83,
    D: 68,

    I: 73,
    J: 74,
    K: 75,
    L: 76,

    P: 80,
    H: 72,
    Y: 89,
    B: 66,

    isDown: function (keyCode) {
      return this._pressed[keyCode];
    },

    onKeydown: function (event) {
      this._pressed[event.keyCode] = true;
    },

    onKeyup: function (event) {
      if (event.KeyCode in this._pressed) {
        delete this._pressed[event.keyCode];
      }
    }
  };


  /*****************************************
   *                                       *
     Game Objects Generator
   *                                       *
   *****************************************/
  let Maze = (function () {
    var canvas = document.getElementById("maze-canvas");

    /**
     * Generates a Maze with textures
     * Knows how to show shortest path, breadcrumbs, hint
     */
    function GenBoard(spec){
      var that = {};
      that.dimensions = spec.dimension;
      that.maze = genPaths(spec.dimension);

      that.draw = function(){
        context.save();
        for(let i = 0; i < spec.dimension; ++i){
          for(let j = 0; j < spec.dimension; ++j){
            that.maze[i][j].draw()
          }
        }
        context.stroke()
        context.restore()
      }
      return that;
    }

    /**
     * Generates a Player with its textures
     * @param spec
     * @constructor
     */
    function Player(spec){
      return spec
    }

    function render() {
      //backgroundImage.draw();
    }

    return {
      GenBoard: GenBoard,
      Player: Player,
      render: render
    }
  }());

  /*****************************************
   *                                       *
      Game Logic
   *                                       *
   *****************************************/
  let MazeGame = (function () {

    var startTime; // When the current maze was generated
    var lastTime; // Last Time that was used to publish current time to the screen
    var previousTick; // Previous clock tick

    var score = 0; // Score of current maze
    var scoreHistory = []; // Array of all previous scores

    var gameStarted = false; // Whether or not a game has started
    var player = Maze.Player({}); // The player object, knows how to update itself, render itself
    var maze = Maze.GenBoard({
      dimension: 5
    }); // The maze object, knows how to update itself, render itself

    function initialize() {
      window.addEventListener('keyup', function (event) {
        InputMap.onKeyup(event);
      }, false);
      window.addEventListener('keydown', function (event) {
        InputMap.onKeydown(event);
      }, false);
      Graphics.initialize();
      console.log(maze)
      requestAnimationFrame(gameLoop);
    }

    function start(){
      startTime = performance.now();
      previousTick = startTime;
      lastTime = startTime;
      var size = document.getElementById("maze-size-selection").value;
      maze = Maze.GenBoard({size: size})
      gameStarted = true;
    }

    function win(){
      var totalTime = performance.now() - startTime;
      var name;
      while(!name)
        name = prompt("Please Enter your name", "Name")
      scoreHistory.push({name: name, score: score, time: totalTime});
      updateScoreboard = true;
      gameStarted = false;
    }

    function gameLoop(currentTick) {

      //if (gameStarted) {
        update(currentTick);
        render();
        previousTick = currentTick;
      //}
      requestAnimationFrame(gameLoop)
    }

    function update(elapsedTime) {
      //player.update()

    }

    function render() {
      maze.draw();
    }

    return {
      initialize: initialize
    }

  }());

  MazeGame.initialize();
}