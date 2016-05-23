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
		
// 	document.body.style.position = "relative"; 

	/* puzzle area dimensions and margin declarations */
	puzzleArea.style.position = "relative"; 
	puzzleArea.style.width = "400px";
	puzzleArea.style.height = "400px";
	puzzleArea.style.margin = "auto";
		
		
	for (var i = 0; i < 4; i++){
		for (var j = 0; j < 4; j++){
			
			newDiv = document.createElement("div");
						
			puzzleArea.appendChild(newDiv);		//add new div element to the DOM 
			newDiv.style.height = "98px";	//set up height of new div element
			newDiv.style.width= "98px";		//set up width of new div element
			newDiv.style.border = "1px solid black";	//set up border of .5 pixels solid black
			newDiv.id = j + "_" + i;	//declare id for the new div
			newDiv.style.margin = "0";	//declare the margin for new div element
			//add image
			newDiv.style.backgroundImage = 'url(img/mario_pict.png)'; 	//add the background image of puzzle on each div element
			newDiv.style.backgroundPosition = xBgPos + "px" + " " + yBgPos + "px";	//show the specified background position of x and y for each new div
			newDiv.style.display = "inline-block";	//set puzzles to inline block
			newDiv.style.verticalAlign = "top";		//remove space between div elements

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
	children[15].id = "emp";	//set empty div to empty
	children[15].style.backgroundColor = "white";	//set background color to white on empty div
	children[15].style.backgroundImage = "none";	//set background image to none on white div
	
	
	
	hover();
var $element = $(children[15]).next().next();
console.log($element);
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

var up = $(element).prevAll().eq(3) || null,	right = $(element).next() || null,
	down = $(element).nextAll().eq(3) || null,	left = $(element).prev() || null,			
	upRight = $(up).next() || null,				downRight = down.next() || null,
	downLeft = $(down).prev()|| null, 			upLeft = $(up).prev() || null;

	//if left corner is selected
	switch (element) {
	case children[0]:
 			
			if ( isEmptyElement(right) ){	//if right element empty
			swapRight(element, right);   	//swap right
			}
			else if ( isEmptyElement(down) ){	//if down element empty
			swapDown(element, down, downRight); 
			}
	break;

	//if right corner is selected
	case children[3]:
		
		if ( isEmptyElement(left) ){
			swapLeft(element, left);   //swap right
			}
			else if ( isEmptyElement(down) ){
				$(element).before(down);
				$(downLeft).after(element);
			}
	break;

	//if left bottom corner is selected
	case children[12]:
		
			if ( isEmptyElement(right) ){	//if right element empty
			swapRight(element, right);		//swap right
			}
			else if ( isEmptyElement(up) ){	
			swapUp(element, up, upRight); 
			}	
	break;

	//if right bottom corner is selected when puzzle piece is not empty
	case children[15]:
	
			if ( isEmptyElement(left) ){	//if left element empty
				swapLeft(element, left);   		//swap left
			}
			else if ( isEmptyElement(up) ){	//if up element empty 

				$(element).before(up);

					//swap element up
				$(upLeft).after(element);	
			}	
	break;
	
	//if middle top elements are selected
	case children[1]:
	case children[2]:

		if ( isEmptyElement(left) ){
			swapLeft(element, left);
			}
			else if ( isEmptyElement(right) ){
				swapRight(element,right);
			}
			else if ( isEmptyElement(down) ){
				$(element).before(down);			//swap element down  
				$(downLeft).after(element);						
			}
		break;

	//if middle right elements are selected
	case children[7]:
	case children[11]:
		
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
	break;

	//if middle left elements are selected
	case children[4]:
	case children[8]: 
	
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
	
	break;

	//if bottom middle elements are selected
	case children[14]:
	case children[13]:
			
		if ( isEmptyElement(left) ){		//if left is empty
			swapLeft(element, left);  		//swap element left
		}
		else if ( isEmptyElement(up) ){		//if top element is empty
			$(element).before(up);
			$(upRight).before(element);		//swap up element with selected
		}
		else if ( isEmptyElement(right) ){	//if right element is empty
			swapRight(element, right);			//swap right
		}			
	break;
	
	//all other elements (middle)    
	default: 
		//local variables for possible positions to move to
			
			
		if ( isEmptyElement(up) ){			//if up element empty 
			$(element).before(up);			//swap up element 
			$(upRight).before(element);
		}
		else if ( isEmptyElement(right) ){	//if right element empty
			swapRight(element, right);		//swap right element
		}
		else if ( isEmptyElement(left) ){	//if left element empty
			swapLeft(element, left);		//swap left element
		}
		else if ( isEmptyElement(down) ){	//if down element empty 
			$(element).before(down);		//swap down element
			$(downRight).before(element);	
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

function shuffle(element){
children = puzzleArea.children;

	//if left corner is selected
	switch (element) {
	case children[0]:
		
	break;

	case children[3]:
	
	break;

	case children[12]:
		
	break;

	case children[15]:
			
	break;
	
	case children[1]:
	case children[2]:
		
	break;

	case children[7]:
	case children[11]:
		
	break;

	case children[4]:
	case children[8]: 
	
	break;

	case children[14]:
	case children[13]:		
			
		
	break;
	
	default: 
			
			
		
	
	}

}

function swapUp(currentElement, upElement, currentElementTo){
	
	$(currentElement).before(upElement);			//swap up element to current position  
	$(currentElementTo).before(currentElement);		//swap current element up
}

function swapRight(currentElement, toPos){
	$(currentElement).before(toPos);	//swap right
}

function swapDown(currentElement, downElement, currentElementTo){
	$(currentElement).before(downElement);			//swap up element to current position  
	$(currentElementTo).before(currentElement);		//swap current element up
}
function swapLeft(currentElement, toPos){			
	$(toPos).before(currentElement);			//swap element to the left of current element  
}






