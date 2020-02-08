var cols,rows;
var w = 30;
var grid = [];
//Current is the current cell
var current;
var stack = [];

function setup(){
  createCanvas(600,600);
  cols = floor(width/w);
  rows = floor(height/w);

  for(var j = 0; j < rows; j++){
  	for(var i = 0; i < cols; i++){
  		var cell = new Cell(i,j);
  		grid.push(cell);
  	}
  }

  current = grid[0];
}

function draw(){
  background(51);

  for(var i = 0; i < grid.length; i++){
  	grid[i].show();
  }

  current.visited = true;
  current.highlight();
  var next = current.checkNeighbors();

  if(next){
  	next.visited = true;
    
    stack.push(current);

    removeWalls(current, next);

  	current = next;
  }

  else if(stack.length > 0){
	current = stack.pop();
  }
}

function index(i, j){
	if(i < 0 || j < 0 || i >cols-1 || j > rows-1){
		return -1;
	}
	return i + j * cols;
}

function Cell(i,j){
	this.i = i;
	this.j = j;
	//top, right, bottom, left
	this.walls = [true, true, true, true];
	this.visited = false;

	this.checkNeighbors = function(){
		var neighbors = [];
		//Using a two-dimentional array
		var top = grid[index(i, j-1)];
		var right = grid[index(i+1, j)];
		var bottom = grid[index(i, j+1)];
		var left = grid[index(i-1, j)];

		if(top && !top.visited){
			neighbors.push(top);
		}
		if(right && !right.visited){
			neighbors.push(right);
		}
		if(bottom && !bottom.visited){
			neighbors.push(bottom);
		}
		if(left && !left.visited){
			neighbors.push(left);
		}
		if(neighbors.length > 0){
			var r = floor(random(0, neighbors.length))
			return neighbors[r];
		}
		else{
			return undefined;
		}
	}

	this.highlight = function(){
		var x = this.i*w;
		var y = this.j*w;
		noStroke();
		fill(0, 0, 255, 100);
		rect(x, y, w, w);
	}

	this.show = function(){
		var x = this.i*w;
		var y = this.j*w;
		stroke(255);

		if(this.walls[0]){
		    line(x,  y,  x+w,  y);
	    }  
		if(this.walls[1]){
		    line(x+w,  y,  x+w,  y+w);
		}
		if(this.walls[2]){
			line(x+w,  y+w,  x,  y+w);
		}
		if(this.walls[3]){
			line(x,  y+w,  x,  y);
		}

        if(this.visited){
        	noStroke();
        	fill(255, 0, 255, 100);
        	rect(x,y,w,w);
        }
	}
}

function removeWalls(a, b){
	var x = a.i - b.i;
	if(x === 1){
		a.walls[3] = false;
		b.walls[1] = false;
	}
	else if(x === -1){
		a.walls[1] = false;
		b.walls[3] = false;
	}
	var y = a.j - b.j;
	if(y === 1){
		a.walls[0] = false;
		b.walls[2] = false;
	}
	else if(y === -1){
		a.walls[2] = false;
		b.walls[0] = false;
	}
}
