$(document).ready(function() {

var bomb_count = 10
var flag_count = bomb_count
var flag_spots = []
var board_length = 9

function victoryCheck(flag_spots, board){
	for (var p; p < flag_spots.length; p++){
		if (board[flag_spots[0]][flag_spots[1]] != 'x'){
			console.log('you lost, a bomb was not flagged')
			return false;
		}
		return true;
	}

}


function boardMaker(){
		var board =[]
		for (var i = 0; i < board_length; i++){
			var row = ["", "", "","","","","","",""];
			board.push(row);
		}
		board = addBombs(board);
		return board;
}

function allBombCounts(board){
	var bomb_board = board

	for (var i = 0; i < board_length; i++){
		for (var b = 0; b < board_length; b ++){
			var square = board[i][b];
			if (board[i][b] != 'x'){
			var bombs = adjacentBombs(unparseId([i, b]), board)

			bomb_board[i][b] = bombs}
		}
	}
	return bomb_board
}

function addBombs(board){
	for (var i = 0; i < bomb_count; i++){
		var bomb_coordinates = bomb_spot();
		board[bomb_coordinates[0]][bomb_coordinates[1]] = 'x'
	}
	return board;
}

function isBomb(id, board){
	var coordinates = parseId(id);
	if (board[coordinates[0]][coordinates[1]] == 'x'){
		return true;
	}
	return false;
}

function bomb_spot(){
    var x = Math.floor(Math.random() * 9);
    var y = Math.floor(Math.random() * 9);
    var bomb_coordinates = [x, y];
    return bomb_coordinates;
}

function parseId(id){
		var array = id.split(' ').map(Number); 
		return array;
}

function unparseId(id){
	var string = id.join(' ')
	return string;
}

function divAppend(id) {
     $('div.container').append('<div class="square" id="'+ id + '"></div>');         
} 

function bombAppend(id) {
     $('div.container').append('<div class="square" id="'+ id + '">' + 'x' + '</div>');         
} 

function idToDiv(id){
	//take id in string form and use div id selector to return that div element
	var target_div = $("[id='"+id+"']");
	addRevealClass(target_div);

	return target_div;
}


function flag(div){
	if (flag_count > 0) {
		$(div).addClass('flagged');
		flag_spots.push(parseId($(div).attr('id')));
		console.log(flag_spots)
		flag_count --;
	}else{
		alert("bummer, you're out of flags!")
	}
}

function addRevealClass(div){
	//console.log('trying to add reveal to ' + div)
	$(div).addClass('revealed');
}

function addBombCount(div, bombcount){
	console.log('bombcount is ' + bombcount)
	if (bombcount > 0){

	$(div).html('<p>'+ bombcount +'</p>');}
}

function boardRender(board){
		for (var i = 0; i < 9; i++){
			for (var y = 0; y < 9; y++) {

				var id = i.toString() + ' ' + y.toString();
				//console.log(id)
				
				//console.log(board[i][y])
				if (board[i][y] == 'x'){
					bombAppend(id);
				}
				else{
					divAppend(id);
				}
			}
		}
}

//input the square of the item being revealed
//go in all four directions and stop when you find a div
//that has adjacent bombs

function bigReveal(id, bomb_grid){
	var square = parseId(id);
	var row_above = (square[0]-1);
	var row_below = (square[0]+1);
	var column_before = (square[1]-1);
	var column_before = (square[1]+1);

	//its going to have to go row by row
}

function scanLeft(id, bomb_grid, board){
	var square = parseId(id);

	for (var y_axis = square[0]; y_axis < board_length; y_axis ++){
		for (var x_axis = square[1]; x_axis >= 0; x_axis --){
			var next_square = unparseId([y_axis, x_axis])

			if (bomb_grid[y_axis][x_axis] > 0){
				addBombCount(idToDiv(next_square) ,bomb_grid[y_axis][x_axis])
				addRevealClass(idToDiv(next_square))

				console.log('found boundary at ' + y_axis + " " + x_axis)
				return;	
			}
			else{
				addRevealClass(idToDiv(next_square));

			}
		}
	}	
}
function scanRight(id, bomb_grid, board){
	var square = parseId(id);

	for (var y_axis = square[0]; y_axis < board_length; y_axis ++){
		for (var x_axis = square[1]; x_axis < board_length; x_axis ++){

			var next_square = unparseId([y_axis, x_axis])

			if (bomb_grid[y_axis][x_axis] > 0){

				addBombCount(idToDiv(next_square) ,bomb_grid[y_axis][x_axis])
				addRevealClass(idToDiv(next_square))

				console.log('found boundary at ' + y_axis + " " + x_axis)
				return;	
			}
			else{
				//console.log('change class')
				addRevealClass(idToDiv(next_square));

			}
		}
	}	
}

function bombScan(row){
	//console.log('looking for bombs in ' + row)
	var bombs= 0
	for (var y = 0; y < row.length ; y++){
		if (row[y] == 'x'){
			bombs ++;
			//console.log('found bomb! bombs now ' + bombs);
		}
	}
	return bombs;	
}

function adjacentBombs(id, board){
	var square = parseId(id);
	var bombs = 0;
	var x_marker = square[0]
	var y_marker = (square[1])

	if (y_marker > 0) {
		var y_start = (y_marker-1);
	}else{
		var y_start = y_marker;
	}

	for (var x = (x_marker-1); x <= (x_marker + 1); x++){
		//go through each row and slice an array
		//console.log('x is ' + x)
		if ((x >= 0) && (x <(board.length))){
			//console.log('working on row ' + x)
			
			if (y_start < board.length-1){
				//console.log('slicing ' + (y_start) + "to " + (y_marker+1))

				var row = board[x].slice((y_start), (y_marker + 2))
				//console.log(row)

				bombs += bombScan(row);				
			}
			
		}
	}
	return bombs;	
		
}
	
function youLose(){
	alert('BOOOOOOM uh oh you lost')
}



b = boardMaker();

boardRender(b);
var boom = allBombCounts(b);

//right click to place flag
$(document).on("contextmenu", ".square", function(e){
   var div = event.target;
   if ($(div).attr('class') != (('square revealed')|| 'flagged')){
	   var id = div.id;
	   flag(div);
	   return false;
	}
});

//left click for reveal
$('div.container').on('click', 'div.square', function(){
		var div = event.target;
		var id = div.id;
		
		if ($(div).attr('class') != 'square flagged'){
			if (isBomb(id, b)) {
				youLose();
			}else{
				// addBombCount(div, (adjacentBombs(id, b)));
				//addRevealClass(div);
				scanRight(id, boom, b); 
				scanLeft(id, boom, b);
			}
	}});

});
