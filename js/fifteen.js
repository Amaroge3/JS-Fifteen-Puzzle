"use strict";

var puzzleArea;
var children; 
var array;  

window.onload = function(){
puzzleArea = document.getElementById("puzzlearea");
var newDiv = document.createElement("div");
		var posLeft = 0;
		var posTop = 0;
		var count = 1;
		var x = 0;
		var y = 0; 
		puzzleArea.style.position = "relative"; 
		puzzleArea.style.width = "400px";
		puzzleArea.style.height = "400px";
		puzzleArea.style.margin = "auto";
		
		
		for (var i = 0; i < 4; i++){
			for (var j = 0; j < 4; j++){
				newDiv = document.createElement("div");
								
				puzzleArea.appendChild(newDiv); 
				newDiv.style.height = "100px";
				newDiv.style.width= "100px";
				newDiv.style.border = ".5px solid black";	
				newDiv.id = i + "_" + j;
				newDiv.style.position = "absolute" ;
				newDiv.style.left = posLeft + "px";
				newDiv.style.top = posTop + "px";
				newDiv.style.margin = "0";
				//add image
 				newDiv.style.backgroundImage = 'url(img/mario_pict.png)'; 
  				newDiv.style.backgroundPosition = x + "px" + " " + y + "px";
				//x pixels
				x -= 100;
				
				
				//click
				newDiv.onclick = move;

				//add numbers to the div elements
				if (count < 16){
				var par = document.createElement("p"); 
					par.innerHTML = count;
					count++;
					newDiv.appendChild(par);
					par.style.margin = "50%"; 

					newDiv.className = "puzzles";
					
				}
					posLeft += 100; //increase left position for next iteration

		}
		
		y -= 100; //increase y coordinates
		posLeft = 0;
		posTop = posTop + 100;
	}
	
	
	
	children = puzzleArea.children;

	
	/* edit empty div element */  
	children[15].id = "emp";
	children[15].style.backgroundColor = "white";
	children[15].style.backgroundImage = "none";
	children[15].style.borderRight = "none";
	children[15].style.borderBottom = "none";
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
	
	 				// children[0].style.backgroundPosition = "0px 0px";
// 					children[1].style.backgroundPosition = "-90px 0px";
// 	 				children[2].style.backgroundPosition = "-180px 0px";
// 	 				children[3].style.backgroundPosition = "-270px 0px";
// 
// 
// 	 				children[4].style.backgroundPosition = "0px -90px";
// 	 				children[5].style.backgroundPosition = "-90px -90px";
// 	 				children[6].style.backgroundPosition = "-180px -90px";
// 	 				children[7].style.backgroundPosition = "-270px -90px";


// puzzleArea.style.position = "relative"; 
// var element = document.getElementById("0_1");
// 				element.style.position = "absolute";
// 				element.style.left = "100px";
// 				element.style.top = "0";

	
hover();	
};

function hover(){
	
	for(var i = 0; i < 15; i++){
		children[i].onmouseover = function (){
		this.style.backgroundColor = "red"; };
	
		children[i].onmouseout = function(){
		this.style.backgroundColor = "white"; };
	}
}

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


