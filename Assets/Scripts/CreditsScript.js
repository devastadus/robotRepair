#pragma strict

var halfScreenW:float;
var halfScreenH:float;
function Start () {
	halfScreenW = Screen.width/2;
	halfScreenH	= Screen.height/2;
}

function OnGUI () {	
	GUI.Box(Rect(halfScreenW,halfScreenH,200,50), "Made By Scott!!!!");
}