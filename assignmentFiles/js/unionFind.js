/**
 * Created by Steven on 9/30/2016.
 */


var dimension = 5;
var maze = [];
var paths = [];

class Cell {
  constructor(val) {
    this.value = val;
    this.group = this
  }
}

function find(c) {
  if (c.group.value === c.value) {
    return c
  }
  else {
    var parent = find(c.group);
    c.group = parent;
    return parent
  }
}

function union(c, d) {
  var a = find(c);
  var b = find(d);
  b.group = a;
  return b
}

function printMaze(dimension) {
  var str = "";
  for (let i = 0; i < dimension; ++i) {
    for (let j = 0; j < dimension; ++j) {
      str += maze[i * dimension + j].value + "," + maze[i * dimension + j].group.value + " "
    }
    console.log(str);
    str = ""
  }
}

function printMazePath(dimension) {
  var str = "";
  for (let i = 0; i < dimension; ++i) {
    for (let j = 0; j < dimension; ++j) {
      str += i * dimension + j + " ";
      if (i * dimension + j < 10) str += " ";
      if (paths[i * dimension + j].e === "open")
        str += " - ";
      else
        str += "   "
    }
    str += "\n";
    for (let j = 0; j < dimension; ++j) {
      if (paths[i * dimension + j].s === "open")
        str += "|     ";
      else {
        str += "      "
      }
    }
    str += "\n"
  }
  console.log(str)
}

function makePath(r, s) {
  if (find(maze[r]) === find(maze[s])) return;
  if (r < s) {
    if (r == s - 1) {
      if (paths[r].e == "closed") {
        maze[find(maze[s]).value] = union(maze[r], maze[s]);
        paths[r].e = "open";
        paths[s].w = "open";
      }
    }
    else {
      if (paths[r].s == "closed") {
        maze[find(maze[s]).value] = union(maze[r], maze[s]);
        paths[r].s = "open";
        paths[s].n = "open";
      }
    }
  }
  else {
    if (s == r - 1) {
      if (paths[s].e == "closed") {
        maze[find(maze[s]).value] = union(maze[r], maze[s]);
        paths[s].e = "open";
        paths[r].w = "open";
      }
    }
    else {
      if (paths[s].s == "closed") {
        maze[find(maze[s]).value] = union(maze[r], maze[s]);
        paths[s].s = "open"
        paths[r].n = "open"
      }
    }
  }
}

function fillPath() {
  var dimension = Math.pow(maze.length, .5);
  for (let i = 0; i < dimension; ++i) {
    for (let j = 0; j < dimension; j++) {
      if (j < dimension - 1)
        if (find(maze[i * dimension + j]) != find(maze[i * dimension + j + 1]))
          makePath(i * dimension + j, i * dimension + j + 1, maze, paths);
      if (i < dimension - 1)
        if (find(maze[i * dimension + j]) != find(maze[(i + 1) * dimension + j]))
          makePath(i * dimension + j, (i + 1) * dimension + j, maze, paths)
    }
  }
}

function genPaths(dimension) {
  maze = [];
  paths = [];
  for (let i = 0; i < Math.pow(dimension, 2); ++i) {
    var c = new Cell(i);
    maze.push(c);
    paths.push([]);
    paths[i].e = "closed";
    paths[i].s ="closed";
    paths[i].w ="closed";
    paths[i].n ="closed";
  }

  for (let i = 0; i < Math.pow(dimension, 3) - 1; ++i) {
    var r = Math.floor(Math.random() * Math.pow(dimension, 2));
    var s = 0;
    do {
      s = Math.floor(Math.random() * 4);
      switch (s) {
        case 0:
          s = r - dimension;
          break;
        case 1:
          s = r + 1;
          if (s % dimension == 0)
            s = -1;
          break;
        case 2:
          s = r + dimension;
          break;
        case 3:
          s = r - 1;
          if (r % dimension == 0)
            s = -1;
          break;
        default:
          s = -1;
          break;
      }
    } while (s < 0 || s >= Math.pow(dimension, 2));
    makePath(r, s, maze, paths)
  }

  fillPath(maze, paths);

  printMazePath(maze, paths)

  let that = []
  for(let i = 0; i < dimension; ++i){
    that[i] = [];
    for(let j = 0; j < dimension; ++j){
      that[i].push(Graphics.Cell({
        x: j, y: i, cell: paths[i*dimension + j], dimensions: dimension
      }))
    }
  }

  console.log(that);
  return that
}

