var cols,rows;
var w = 40;
var grid = [];
//Current is the current cell
var current;

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
  current.checkNeighbors();
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
		var right = grid[i][j-1];
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
        	fill(255, 0, 255, 100);
        	rect(x,y,w,w);
        }
	}
}