var matrix = [];
var MAX_ROW = 6;
var MAX_COL = 7;
var MAX_CON = 4;

var colMultiplier;
var rowMultiplier;

var PLAYER1 = 1;
var PLAYER2 = 2;
var player_toggle;

function initializeGame() {
	for (col = 0; col < MAX_COL; col++) {
		matrix[col] = [];
		
		for (row = 0; row < MAX_ROW; row++) {
			matrix[col][row] = 0;
		}
	}
	
	player_toggle = true;
	document.getElementById("console").innerHTML = "PLAYER 1's TURN";
}

function placeChip( column ) {
	for (row = 0; row < MAX_ROW; row++) {
		if ( matrix[column][row] == 0 ) {
			var matrixDiv = document.getElementById("row" + column + row );
			
			if (player_toggle) {
				matrix[column][row] = PLAYER1;
				matrixDiv.style.backgroundImage = "url(images/Connect4RedChip.png)";
				document.getElementById("console").innerHTML = "PLAYER 2's TURN";
				document.getElementById("console").style.color = "yellow";
			} else {
				matrix[column][row] = PLAYER2;
				matrixDiv.style.backgroundImage = "url(images/Connect4YellowChip.png)";
				document.getElementById("console").innerHTML = "PLAYER 1's TURN";
				document.getElementById("console").style.color = "red";
			}
			
			checkWinner();
			player_toggle = !player_toggle;
			
			break;
		}
	}
}

function checkWinner() {
	var result;
	var colTotal = ( MAX_COL - MAX_CON ) + 1;
	var rowTotal = ( MAX_ROW - MAX_CON ) + 1;

	/* HORIZONTAL CHECKING */
	result = checkBoard(0, colTotal, MAX_ROW, 0);
    
    /* VERTICAL CHECKING */
    if ( !result )
    	result = checkBoard(0, MAX_COL, rowTotal, 1);
    
    /* DIAGONAL CHECKING REVERSE */
    if ( !result )
    	result = checkBoard(( MAX_COL - MAX_CON ), colTotal, rowTotal, 2);
    
    /* DIAGONAL CHECKING */
    if ( !result )
    	result = checkBoard(0, colTotal, rowTotal, 3);
 
   	displayWinner( result );
}

function displayWinner( result ) {
	if ( result ) {
   		var displayWinner = document.getElementById("displayWinner");
   		displayWinner.style.display = "block";
   		
   		if (player_toggle) {
			displayWinner.style.backgroundImage = "url(images/Connect4Player1.png)";
		} else {
			displayWinner.style.backgroundImage = "url(images/Connect4Player2.png)";
		}
		
		document.getElementById("console").innerHTML = "";
   	}
}

function checkBoard( colStart, colTotal, rowTotal, mode ) {
	var result = false;
	
	/* ASSIGN MULTIPLIER */
	assignMultiplier( mode );

	for (var ctr = 0; ctr < colTotal; ctr++) {
		var col = colStart + ctr;
		
		for (var row = 0; row < rowTotal; row++) {
			var pre_val = 0;
			
			for (var ctr3 = 0; ctr3 < MAX_CON; ctr3++) {
				var xCol = col + ( ctr3 * colMultiplier );
				var yRow = row + ( ctr3 * rowMultiplier );

				if ( matrix[xCol][yRow] == 0 ) {
					result = false;
					break;
				}
				
				if ( ctr3 == 0 ) {
					/* RETRIEVE THE FIRST VALUE OF SET */
					pre_val = matrix[xCol][yRow];
				} else {
					if ( pre_val ==  matrix[xCol][yRow] ) {
						result = true;
					} else {
						result = false;
						break;
					}
				}
			}
			
			if ( result ) {
				return result;
			}
		}
	}
	
	return result;
}

function assignMultiplier( mode ) {
	colMultiplier = 1;
	rowMultiplier = 1;
	
	switch (mode) {
		/* HORIZONTAL CHECKING */
		case 0:
			rowMultiplier = 0;
			break;
		/* VERTICAL CHECKING */
		case 1:
			colMultiplier = 0;
			break;
		/* DIAGONAL CHECKING REVERSE */
		case 2:
			colMultiplier = -1;
			break;
		/* DIAGONAL CHECKING */
		default:
			/* retention */
			break;
	}
}
