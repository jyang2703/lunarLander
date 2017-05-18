



var gameArea = document.getElementById('canvas');
var gameRect = gameArea.getBoundingClientRect();
var gameAreaHeight = Math.round(gameRect.bottom - gameRect.top);
var gameAreaWidth = Math.round(gameRect.right - gameRect.left);


var flame = document.getElementById('flame');
flame.style.position = "absolute"
flame.style.zIndex = "1";
flame.style.display = "none";

var spaceship = document.getElementById('spaceship');
spaceship.style.position = "absolute";
spaceship.style.zIndex = "1";
spaceship.style.display = "block";

var target = document.getElementById('target');
target.style.position = "absolute"
target.style.zIndex = "1";


var blowup = document.getElementById('blowup');
blowup.style.position = "absolute"
blowup.style.zIndex = "1";
blowup.style.display = "none";

var landerX = 0;
var landerY = 0;
var landerDX = 0;
var landerDY = 0;
var landerWidth = 110;

var targetX = 0;
var targetY = 0; 
var crashed = false;
var moving = false;
var id = setInterval(frame, 40);

var flameX;
var flameY;

function checkForTargetWin(){
	var didIWin = false;

	if(Math.abs(landerX - targetX) < 15){
		if(((targetY + 5) - (landerY + 80)) < 10){
			if(Math.abs(landerDY) < 5){
				didIWin = true;
			}
		}
	}

	return didIWin;

}

function setFlamePosition(){

	flameX = landerX + 40;
	flameY = landerY + 80;
	flame.style.top = flameY + 'px';
	flame.style.left = flameX + 'px';

}

function showFlame(){
	flame.style.display = "block";
}

function hideFlame(){
	flame.style.display = "none";
}
function setLanderAndTarget(){

	crashed = false
	spaceship.style.display = "block";
	blowup.style.display = "none";
	flame.style.display = "none";

	landerY = 0;
	landerX = Math.round(gameAreaWidth/2) - Math.round(landerWidth/2);
	spaceship.style.left = landerX + 'px';
	spaceship.style.top = landerY + 'px';

	targetY = gameAreaHeight - 95;
	targetX = Math.round(Math.random() * (gameAreaWidth - landerWidth)); 

	target.style.left = targetX + 'px';
	target.style.top = targetY + 'px';
}


function resetAnimation(){
	landerDY = 0;
	landerDX = 0;
	setLanderAndTarget();



}
 

function startAnimation(){
	landerDY = 6;
	moving = true;

}
function moveLander(){

	if(moving === true){

		if(checkForTargetWin() === false){
			landerX += landerDX;
			landerY += landerDY;
			landerDY += 1;

			if ( landerX <= 0 && landerDX < 0) {
				landerX = 0;
				landerDX = 0;
			}

			if( (landerX > gameAreaWidth - landerWidth) && landerDX > 0){
				landerX = gameAreaWidth - landerWidth;
				landerDX = 0;
			}
			
			if(landerY >= gameAreaHeight - landerWidth){
				landerY = gameAreaHeight - landerWidth;
				if (landerDY > 4) {
					crashed = true;
					landerDX = 0;
				}


				landerDY = 0;
				landerDX = 0;



			}


			if(crashed === false){

			spaceship.style.left = landerX + 'px';
			spaceship.style.top = landerY + 'px';
			setFlamePosition();

			} else {
				moving = false;
				spaceship.style.display = "none";
				blowup.style.left = landerX + 'px';
				blowup.style.top = landerY + 'px';
				blowup.style.display = "block";
				flame.style.display = "none";
			}
		} else {
			flame.style.display = "none";
			moving = false;
			alert("you won");
		}
	}
}


function frame() {
	moveLander();
}


setLanderAndTarget();
//showFlame();

document.getElementById('resetButton').onclick = resetAnimation;
document.getElementById('startButton').onclick = startAnimation;

document.onkeydown = function(e){


	//37 = left
	//38 = up
	//39 = right
	//40= down
	//32 = spacebar
	//if([32,37, 38, 39, 40].indexOf(e.keyCode) > -1){
	//	e.preventDefault();
	//}

	switch(e.keyCode){

		case 32:

			crashed = false;
			resetAnimation();
			startAnimation();


		break;

		case 37:

			landerDX += -1;
			showFlame();


		break;

		case 38:

			landerDY -=10;
			showFlame();


		break;

		case 39:

			landerDX += 1;
			showFlame();


		break;

		case 40:


		break;


	}


};

document.onkeyup = function(e) {

	//if([32,37, 38, 39, 40].indexOf(e.keyCode) > -1){
	//	e.preventDefault();

	//}

	switch(e.keyCode) {

		case 32: 

		break;

		case 37: 

			//landerDX = 0;
			hideFlame();


		break;

		case 38:

			hideFlame(); 

		break;

		case 39:

			//landerDX = 0;
			hideFlame(); 

		break;

		case 40: 

		break;

	}





};
