var angle = 0;
var deltaAngle = 1;
var sign = 1;
var portionCounter = 0;
var portionValue   = 300;
var waitValue      = 300;

topicElement = document.getElementById( 'innerTopic' );

var rotation = function() {
	
	if ( portionCounter < portionValue ) {
		angle = sign * deltaAngle * Math.pow( Math.E, -portionCounter / 100 );
		topicElement.style.transform = 'rotateX(' + ( angle ) + 'deg)';
	}	
	else if ( portionCounter == portionValue ) {
		topicElement.style.transform = 'rotateX(0deg)';
	}

	sign = -sign;
	portionCounter += 1;
	if ( portionCounter > ( portionValue + waitValue ) ) {
		portionCounter = 0;
	}	
}
setInterval( rotation, 10 );


