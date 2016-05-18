"use strict";

var puzzleArea;
var children; 
var array;  

window.onload = function(){
	
	puzzleArea = document.getElementById("puzzlearea");
	
	var newDiv;																	//variable to generate new div element
	var posLeft = 0;																													
	var posTop = 0;
	var count = 1;
	var x = 0;
	var y = 0; 
	
	/* puzzle area dimensions and margin declarations */
	puzzleArea.style.position = "relative"; 
	puzzleArea.style.width = "400px";
	puzzleArea.style.height = "400px";
	puzzleArea.style.margin = "auto";
		
		
		for (var i = 0; i < 4; i++){
			for (var j = 0; j < 4; j++){
				newDiv = document.createElement("div");
								
				puzzleArea.appendChild(newDiv);									//add new div element to the DOM 
				newDiv.style.height = "100px";									//set up height of new div element
				newDiv.style.width= "100px";									//set up width of new div element
				newDiv.style.border = ".5px solid black";						//set up border of .5 pixels solid black
				newDiv.id = i + "_" + j;										//declare id for the new div
				newDiv.style.position = "absolute" ;							//set up the position to absolute
				newDiv.style.left = posLeft + "px";								//declare position left for each new div element
				newDiv.style.top = posTop + "px";								//declare position top for each new div element
				newDiv.style.margin = "0";										//declare the margin for new div element
				//add image
 				newDiv.style.backgroundImage = 'url(img/mario_pict.png)'; 		//add the background image of puzzle on each div element
  				newDiv.style.backgroundPosition = x + "px" + " " + y + "px";	//show the specified background position of x and y for each new div
				
				x -= 100;														//x pixels decrease for next background position iteration

				
				
				//click
				newDiv.onclick = move;											//click action calls move function

				//add numbers to the div elements
				if (count < 16){
				var par = document.createElement("p"); 
					par.innerHTML = count;
					count++;
					newDiv.appendChild(par);
					par.style.margin = "50%"; 

					newDiv.className = "puzzles";
					
				}
					posLeft += 100; 											//increase left position for next iteration

		}
		
		
		posLeft = 0;
		posTop = posTop + 100;
	
		y -= 100; 																//decrease y coordinates for background position on next iteration

	}
	
	children = puzzleArea.children;												//puzzle pieces nodes list

	
	/* edit empty div element */  
	children[15].id = "emp";													//set empty div to empty
	children[15].style.backgroundColor = "white";								//set background color to white on empty div
	children[15].style.backgroundImage = "none";								//set background image to none on white div
	children[15].style.borderRight = "none";									//set empty div to have no border right
	children[15].style.borderBottom = "none";									//set empty div to no border bottom
	var element = document.getElementById("emp");
	console.log(element.id);
// 	
// 	array = new Array(4); 
// 	var loopCount = 0;
// 	for (var i = 0; i < 4; i++){
// 		array[i] = new Array(4); 		
// 		for (var j = 0; j < 4; j++){
// 			array[i][j] = children[loopCount];
// 			loopCount+=1;
// 		}
// 	}
	



// puzzleArea.style.position = "relative"; 
// var element = document.getElementById("0_1");
// 				element.style.position = "absolute";
// 				element.style.left = "100px";
// 				element.style.top = "0";

	
hover();	
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
	var elemX;
	var elemY;

	var topElem;
	var rightElem;
	var bottomElem;
	var leftElem;

	var selectedElement;
		selectedElement = document.elementFromPoint(this.offsetLeft + this.parentNode.getBoundingClientRect().left, this.offsetTop + this.parentNode.getBoundingClientRect().top);


	elemX = parseInt(selectedElement.style.left);
	elemY = parseInt(selectedElement.style.top);
	console.log(document.elementFromPoint((elemX + selectedElement.parentNode.getBoundingClientRect().left), 
				(elemY +selectedElement.parentNode.getBoundingClientRect().top) ));
			console.log(this.offsetLeft);
		console.log(this.offsetTop);

    
    }


