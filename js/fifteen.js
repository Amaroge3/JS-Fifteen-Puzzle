"use strict";

var puzzleArea;
var children; 
var $siblings;
window.onload = function(){
	
	puzzleArea = document.getElementById("puzzlearea");
	
	var newDiv;																	//variable to generate new div element
	var count = 1;
	var xBgPos = 0;
	var yBgPos = 0; 
		
// 	document.body.style.position = "relative"; 

	/* puzzle area dimensions and margin declarations */
	puzzleArea.style.position = "relative"; 
	puzzleArea.style.width = "400px";
	puzzleArea.style.height = "400px";
	puzzleArea.style.margin = "auto";
		
		
		for (var i = 0; i < 4; i++){
			for (var j = 0; j < 4; j++){
				newDiv = document.createElement("div");
								
				puzzleArea.appendChild(newDiv);											//add new div element to the DOM 
				newDiv.style.height = "98px";											//set up height of new div element
				newDiv.style.width= "98px";												//set up width of new div element
				newDiv.style.border = "1px solid black";								//set up border of .5 pixels solid black
				newDiv.id = j + "_" + i;												//declare id for the new div
				newDiv.style.margin = "0";												//declare the margin for new div element
				//add image
 				newDiv.style.backgroundImage = 'url(img/mario_pict.png)'; 				//add the background image of puzzle on each div element
  				newDiv.style.backgroundPosition = xBgPos + "px" + " " + yBgPos + "px";	//show the specified background position of x and y for each new div
				newDiv.style.display = "inline-block";									//set puzzles to inline block
				newDiv.style.verticalAlign = "top";										//remove space between div elements

				xBgPos -= 100;															//x pixels decrease for next background position iteration

				
				

			// 	add numbers to the div elements
				if (count < 16){
				var par = document.createElement("p"); 
					par.innerHTML = count;
					count++;
					newDiv.appendChild(par);
					par.style.margin = "50%"; 

					newDiv.className = "puzzles";
					newDiv.onclick = move;										//click action calls move function

				}
		}	
		yBgPos -= 100; 															//decrease y coordinates for background position on next iteration

	}
	
	children = puzzleArea.children;												//puzzle pieces nodes list
	$siblings = $(".puzzles").children();
	
	/* edit empty div element */  
	children[15].id = "emp";													//set empty div to empty
	children[15].style.backgroundColor = "white";								//set background color to white on empty div
	children[15].style.backgroundImage = "none";								//set background image to none on white div
	
	
	
hover();	

// var shuffleButton = document.getElementById("shufflebutton");
// shuffleButton.onclick = shuffle;
};

/*
	Hover function that changes the background color to red on the puzzles when hovering
*/
function hover(){
	/* when hovering on any of the puzzle pieces, the background changes to red and cursor changes to pointer */
	for(var i = 0; i < 15; i++){
		children[i].onmouseover = function (){							
		this.style.backgroundColor = "red";							
		this.style.cursor = "pointer";
		};
	
		/* when not hovering on any of the puzzle pieces, the background color changes back to white */
		children[i].onmouseout = function(){
		this.style.backgroundColor = "white"; 
		};
	}
}
/*
	Move function that moves the puzzle pieces when a puzzle piece is clicked
*/ 
function move(){
	findNeighbor(this);
}



function findNeighbor(element){

	children = puzzleArea.children;

	//if left corner is selected
	if ( element === children[0] ){
		//local variable for position of elements around current element selected
		var right = $(element).next(),
     		down = $(element).next().next().next().next(),
			downRight = $(down).next();
			
			if ( isEmptyElement(right) ){				//if right element empty
			swapRight(element, right);   				//swap right
			}
			else if ( isEmptyElement(down) ){			//if down element empty
			swapDown(element, down, downRight); 
			}
	}
	//if right corner is selected
	else if ( element === children[3] ){
		
		var left = $(element).prev(),
     		down = $(element).next().next().next().next(),
			downLeft = $(down).prev();
		
		if ( isEmptyElement(left) ){
			swapLeft(element, left);   //swap right
			}
			else if ( isEmptyElement(down) ){
				$(element).before(down);
				$(downLeft).after(element);
			}
	}
	//if left bottom corner is selected
	else if ( element === children[12] ) {
		var right = $(element).next(),
     		up = $(element).prev().prev().prev().prev(),
			upRight = $(up).next();
			
			if ( isEmptyElement(right) ){
			swapRight(element, right);   //swap right
			}
			else if ( isEmptyElement(up) ){
			swapUp(element, up, upRight); 
			}	
	}
	//if right bottom corner is selected when puzzle piece is not empty
	else if ( element === children[15] ) {
		var left = $(element).prev(),
     		up = $(element).prev().prev().prev().prev(),
     		upLeft = up.prev(),
     		downLeft = $(element).prev();
		
			if ( isEmptyElement(left) ){
			swapLeft(element, left);   //swap right
			}
			else if ( isEmptyElement(up) ){

				$(element).before(up);
				$(upLeft).after(element);	
			}	
	}
	//if middle top elements are selected
	else if (element === children[1] || element === children[2]){
		var up = $(element).prev().prev().prev().prev(),
			upLeft = $(up).prev(),
			left = $(element).prev(),
			right = $(element).next(),
			down = $(element).next().next().next().next(),
			downLeft = $(down).prev();
		
		if ( isEmptyElement(left) ){
				swapLeft(element, left);
				}
				else if ( isEmptyElement(right) ){
					swapRight(element,right);
				}
				else if ( isEmptyElement(down) ){
				$(element).before(down); //swap up element to current position  
				$(downLeft).after(element);			
				}
	}
	//if middle right elements are selected
	else if (element === children[7] || element === children[11]){
		var up = $(element).prev().prev().prev().prev(),
			upLeft = $(up).prev(),
			left = $(element).prev(),
			down = $(element).next().next().next().next(),
			downLeft = $(down).prev();
		
		if ( isEmptyElement(up) ){
					$(element).before(up);
					$(upLeft).after(element);
				}
				else if ( isEmptyElement(left) ){
					swapLeft( element, left );
				}
				else if ( isEmptyElement(down) ){
				$(element).before(down);
				$(downLeft).after(element);	
				}
	}
	
	//if middle left elements are selected
	else if (element === children[4] || element === children[8]){
		var up = $(element).prev().prev().prev().prev(), 
			upRight = $(up).next(),
			left = $(element).prev(), 
			right = $(element).next(), 
			down = $(element).next().next().next().next(),
			downLeft = $(down).prev();
		
		if ( isEmptyElement(up) ){ 
			$(element).before(up);
			$(upRight).before(element);		
			}
			else if ( isEmptyElement(right) ){
				swapRight(element,right);
			}
			else if ( isEmptyElement(down) ){
			$(element).before(down); //swap up element to current position  
			$(downLeft).after(element);			
			}
	}	
	
	//if bottom middle elements are selected
	else if (element === children[14] || element === children[13]){
		//local variables for positions
		var up = $(element).prev().prev().prev().prev(),
			right = $(element).next(),
			left = $(element).prev(),
			upRight = $(up).next();
			
			if ( isEmptyElement(left) ){				//if left is empty
				swapLeft(element, left);  				//swap element left
			}
			else if ( isEmptyElement(up) ){				//if top element is empty
				$(element).before(up);
				$(upRight).before(element);				//swap up element with selected
			}
			else if ( isEmptyElement(right) ){
			swapRight(element, right);   //swap right
			}			
	}
	
	//all other elements (middle)    
	else {
	
	
		var up = $(element).prev().prev().prev().prev(),
			right = $(element).next(),
			down = $(element).next().next().next().next(), 
			downRight = down.next(),
			left = $(element).prev(),
			upRight = $(up).next();
			
			
			if ( isEmptyElement(up) ){					//if up element empty 
				$(element).before(up);					//swap up element 
				$(upRight).before(element);
			}
			else if ( isEmptyElement(right) ){			//if right element empty
				swapRight(element, right);  			//swap right element
			}
			else if ( isEmptyElement(left) ){			//if left element empty
				swapLeft(element, left);				//swap left element
			}
			else if ( isEmptyElement(down) ){			//if down element empty 
				$(element).before(down);				//swap down element
				$(downRight).before(element);	
			}			
	}

					
}



function isEmptyElement(element){
			
			if ($(element).attr("id") === "emp"){
				return true;
			}
			else {
				return false;
			}
}

// function shuffle(){
// }

function swapUp(currentElement, upElement, currentElementTo){
	$(currentElement).before(upElement); //swap up element to current position  
	$(currentElementTo).before(currentElement);//swap current element up
}

function swapRight(currentElement, toPos){
				$(currentElement).before(toPos);   //swap right
}

function swapDown(currentElement, downElement, currentElementTo){
	$(currentElement).before(downElement); //swap up element to current position  
	$(currentElementTo).before(currentElement);//swap current element up
}
function swapLeft(currentElement, toPos){
		$(toPos).before(currentElement);
}






