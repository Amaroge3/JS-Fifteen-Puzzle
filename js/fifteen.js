"use strict";

var puzzleArea;
var children; 
var $siblings;
window.onload = function(){
	
	puzzleArea = document.getElementById("puzzlearea");
	
	var newDiv;																			//variable to generate new div element
	var count = 1;
	var xBgPos = 0;
	var yBgPos = 0; 
	
	var shuffleButton = document.getElementById("shufflebutton");						//shuffle button


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

			xBgPos -= 100;	//x pixels decrease for next background position iteration

				

		// 	add numbers to the div elements
			if (count < 16){
			var par = document.createElement("p"); 
				par.innerHTML = count;
				count++;
				newDiv.appendChild(par);
				par.style.margin = "50%"; 

				newDiv.className = "puzzles";
				newDiv.onclick = move;	//click action calls move function

			}
		}	
		yBgPos -= 100; 	//decrease y coordinates for background position on next iteration

	}
	
	children = puzzleArea.children;	//puzzle pieces nodes list
	
	/* edit empty div element */  
	children[15].id = "emp";														//set empty div to empty
	children[15].style.backgroundColor = "white";									//set background color to white on empty div
	children[15].style.backgroundImage = "none";									//set background image to none on white div
	
	
	
	hover();																		//call the hover function
	
	shuffleButton.onclick = shuffle;												//when shuffle button clicks, call shuffle function



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

var up = $(element).prevAll().eq(3) || null,	right = $(element).next() || null,
	down = $(element).nextAll().eq(3) || null,	left = $(element).prev() || null,			
	upRight = $(up).next() || null,				downRight = down.next() || null,
	downLeft = $(down).prev() || null, 			upLeft = $(up).prev() || null;

	//if left corner is selected
	switch (element) {
	case children[0]:
 			
		if ( isEmptyElement(right) ){						//if right element empty
			swapRight(element, right);   					//swap element right
		}
		else if ( isEmptyElement(down) ){					//if down element empty
			swapDown(element, down, "before", downRight);	//swap element down
		}
	break;

	//if right corner is selected
	case children[3]:
		
		if ( isEmptyElement(left) ){						//if left element empty			
		swapLeft(element, left);							//swap element left 
		}
		else if ( isEmptyElement(down) ){					//if down element empty
			swapDown(element, down, "before", downRight);	//swap element down
		}
	break;

	//if left bottom corner is selected
	case children[12]:
	
		if ( isEmptyElement(right) ){						//if right element empty
			swapRight(element, right);						//swap element right
		}
		else if ( isEmptyElement(up) ){						//if up element empty
			swapUp(element, up, "before", upRight); 		//swap element up
		}	
	break;

	//if right bottom corner is selected when puzzle piece is not empty
	case children[15]:
	
		if ( isEmptyElement(left) ){						//if left element empty
			swapLeft(element, left);   						//swap element left
		}
		else if ( isEmptyElement(up) ){						//if up element empty 
			swapUp(element, up, "after", upLeft);			//swap element up
		}	
	break;
	
	//if middle top elements are selected
	case children[1]:
	case children[2]:

		if ( isEmptyElement(left) ){						//if left element empty
			swapLeft(element, left);						//swap element left
		}
		else if ( isEmptyElement(right) ){					//if right element empty
			swapRight(element,right);						//swap element down
		}
		else if ( isEmptyElement(down) ){					//if down element empty	
			swapDown(element, down, "before", downRight);	//swap element down			
			}
		break;

	//if middle right elements are selected
	case children[7]:
	case children[11]:
		
		if ( isEmptyElement(up) ){							//if top element empty
			swapUp(element, up, "after", upLeft);			//swap element up

		}
		else if ( isEmptyElement(left) ){					//if left element empty
			swapLeft( element, left );						//swap element left
		}
		else if ( isEmptyElement(down) ){					//if down element empty
			swapDown(element, down, "after", downLeft); 	//swap element down
		}
	break;

	//if middle left elements are selected
	case children[4]:
	case children[8]: 
	
		if ( isEmptyElement(up) ){ 							//if top element empty
			swapUp(element, up, "before", upRight);			//swap element up
		}
		else if ( isEmptyElement(right) ){					//if right element empty
			swapRight(element,right);						//swap element right
		}
		else if ( isEmptyElement(down) ){					//if down element empty
			swapDown(element, down, "before", downRight);   //swap element down	
		}
	
	break;

	//if bottom middle elements are selected
	case children[14]:
	case children[13]:
			
		if ( isEmptyElement(left) ){						//if left is empty
			swapLeft(element, left);  						//swap element left
		}
		else if ( isEmptyElement(up) ){						//if top element is empty
			swapUp(element, up, "before", upRight);			//swap element up
		}
		else if ( isEmptyElement(right) ){					//if right element is empty
			swapRight(element, right);						//swap right
		}			
	break;
	
	//all other elements (middle)    
	default: 
		
		if ( isEmptyElement(up) ){							//if up element empty 
			swapUp(element, up, "before", upRight);
		}
		else if ( isEmptyElement(right) ){					//if right element empty
			swapRight(element, right);						//swap right element
		}
		else if ( isEmptyElement(left) ){					//if left element empty
			swapLeft(element, left);						//swap left element
		}
		else if ( isEmptyElement(down) ){					//if down element empty 
			swapDown(element, down, "before", downRight);   //swap element down	
	
		}			
	
	}
					
}


/* helper function to determine if neighboring element has an id of "emp" */
function isEmptyElement(element){
			
	if ($(element).attr("id") === "emp"){
		return true;
	}
	else {
		return false;
	}
}

/* shuffle function that is called when a click on the shuffle button occurs */
function shuffle(){
	var emptyElement = document.getElementById('emp');
	
	shufflePuzzles(emptyElement);
}

/* The shuffle function that shuffles all the puzzles. 
* @param element - The empty element that is passed in by the shuffle function with no arguments.  
*/
function shufflePuzzles(element){
	children = puzzleArea.children;

		var randNum = 0;
		var i = 0;
	
	//move puzzle pieces 500 times to empty square
	while ( i < 500 ){
		
	var up = $(element).prevAll().eq(3) || null,	right = $(element).next() || null,
		down = $(element).nextAll().eq(3) || null,	left = $(element).prev() || null,			
		upRight = $(up).next() || null,				downRight = down.next() || null,
		downLeft = $(down).prev() || null, 			upLeft = $(up).prev() || null;
	
		switch (element) {
			
			/* upper left corner puzzle */
			case children[0]:
				
				randNum = Math.floor(Math.random() * 2 + 1);		//generate random number from 1 to 2
				if( randNum == 1 ){									//if random number == 1
					swapRight(element, right);						//swap empty element right
				}
				else {
					swapDown(element, down, "before", downRight);	//swap empty element down   
				}
			break;
			
			/* upper right corner puzzle */
			case children[3]:
				
				randNum = Math.floor(Math.random() * 2 + 1);		//generate random number from 1 to 2
				if( randNum == 1 ){									//if random number == 1
					swapLeft(element, left);						//swap empty puzzle left
				}
				else {
					swapDown(element, down, "after", downLeft); 	//swap empty element down   
				}
			break;
			
			/* left lower corner puzzle */
			case children[12]:
				
				randNum = Math.floor(Math.random() * 2 + 1);		//generate random number from 1 to 2
				if( randNum == 1 ){									//if random number == 1
					swapRight(element, right);						//swap empty element right
				}
				else {
					swapUp(element, up, "before", upRight);			//swap empty element up
				}
			break;
			
			/* right lower corner puzzle */
			case children[15]:
				
				randNum = Math.floor(Math.random() * 2 + 1);		//generate random number from 1 to 2
				if ( randNum == 1 ){								//if random number == 1
					swapLeft(element,left);							//swap empty puzzle left
				}
				else {
					swapUp(element, up, "after", upLeft); 			//swap empty element up
				}
			break;
			
			/* upper middle puzzles */
			case children[1]:
			case children[2]:
				
				randNum = Math.floor(Math.random() * 3 + 1);		//generate random number from 1 to 3
				if ( randNum == 1 ){								//if random number == 1
					swapLeft(element, left);						//swap empty puzzle left
				}	
				else if ( randNum == 2 ){							//if random number == 2 
					swapDown(element, down, "before", downRight); 	//swap empty element down
				}
				else {												//if random number == 3 
					swapRight(element, right);						//swap empty element right
				}
			break;
			
			/* right middle puzzles */
			case children[7]:										
			case children[11]:
				
				randNum = Math.floor(Math.random() * 3 + 1);		//generate random number from 1 to 3
				if ( randNum == 1 ){								//if random number == 1
					swapUp(element, up, "after", upLeft);			//swap empty element up
					}
				else if ( randNum == 2 ){							//if random number == 2
					swapDown(element, down, "after", downLeft);		//swap empty element down
				}
				else{												//if random number == 3
					swapLeft(element, left);						//swap empty element left
				}
			break;
			
		/* left middle puzzles */
		case children[4]:
		case children[8]: 
			randNum = Math.floor(Math.random() * 3 + 1);			//generate random number from 1 to 3
			if ( randNum == 1 ){									//if random number == 1
				swapUp(element, up, "before", upRight);				//swap empty element up
			}
			else if ( randNum == 2 ){								//if random number == 2
				swapRight(element, right);							//swap empty element right
			}
			else {													//if random number == 3
				swapDown(element, down, "before", downRight);		//swap empty element down    
			}
		break;
		
		/* bottom middle puzzles */
		case children[14]:
		case children[13]:		
			randNum = Math.floor(Math.random() * 3 + 1);			//generate random number from 1 to 3
			if ( randNum == 1 ){									//if random number == 1
				swapUp(element, up, "before", upRight);				//swap empty element up
			}
			else if ( randNum == 2 ){								//if random number == 2
				swapRight(element, right);							//swap empty element right
			}
			else {													//if random number == 3
				swapLeft(element, left);							//swap empty element left
			}		
		
		break;
	
		/* middle puzzles */
		default: 
			randNum = Math.floor(Math.random() * 3 + 1);			//generate random number from 1 to 3
			if ( randNum == 1 ){									//if random number == 1
				swapUp(element, up, "before", upRight);				//swap empty element up
			}
			else if ( randNum == 2 ){								//if random number == 2
				swapRight(element, right);							//swap empty element right
			}
			else {													//if random number == 3
				swapDown(element, down, "before", downRight);		//swap empty element down
			}	
		}
	
	element = document.getElementById('emp');					//get the empty puzzle piece on each iteration
	children = puzzleArea.children;								//update elements on each iteration

	i++;
	
	}

}


/*
* Helper function to swap elements up in the DOM.
* @param currentElement - The current element to be passed in to swap
* @param beforeOrAfter - A string that equals either "before" or "after" that is passed in to indicate which
*						 direction the currentElement should be when manipulating the DOM.
* @param currentElementTo - The element to insert before or after to in the DOM.   
*/
function swapUp(currentElement, upElement, beforeOrAfter, currentElementTo){
	/* swap current element before the currentElementTo */
	if (beforeOrAfter === "before"){
		$(currentElement).before(upElement);					//swap up element to current position  
		$(currentElementTo).before(currentElement);				//swap current element up
	}
	/* swap current element after the currentElementTo */
	else if (beforeOrAfter === "after"){
		$(currentElement).before(upElement);					//swap up element to current position  
		$(currentElementTo).after(currentElement);				//swap current element up
	}
}

/*
* Helper function to swap element to the right in the DOM.
* @param currentElement - The element that is to be shifted to the right
*/
function swapRight(currentElement, toPos){
	$(currentElement).before(toPos);							//swap currentElement right
}

/*
* Helper function to swap elements down in the DOM.
* @param currentElement - The current element to be passed in to swap
* @param beforeOrAfter - A string that equals either "before" or "after" that is passed in to indicate which
*						 direction the currentElement should be when manipulating the DOM.
* @param currentElementTo - The element to insert before or after to in the DOM.   
*/
function swapDown(currentElement, downElement, beforeOrAfter, currentElementTo){
	if (beforeOrAfter === "before"){
		$(currentElement).before(downElement);					//swap down element to current position  
		$(currentElementTo).before(currentElement);				//swap current element down
	}
	else if (beforeOrAfter === "after"){
		$(currentElement).before(downElement);					//swap down element to current position 
		$(currentElementTo).after(currentElement);				//swap current element down  
	}
}

/*
* Helper function to swap element to the left in the DOM.
* @param currentElement - The element that is to be shifted to the left
*/
function swapLeft(currentElement, toPos){			
	$(toPos).before(currentElement);							//swap currentElement left
}






