#pragma strict

var customSkin:GUISkin;
var buttonW:int = 100;
var buttonH:int = 50;
var halfScreenW:float;
var halfButtonW:float;

function Start () {
	halfScreenW = Screen.width/2;
	halfButtonW	= buttonW/2;	
}

function OnGUI () {	
	GUI.skin = customSkin;
	if(GUI.Button(Rect(halfScreenW-halfButtonW,600,buttonW,buttonH),"Play Game"))
	{
		Application.LoadLevel("game");
	}
	
	if(GUI.Button(Rect(halfScreenW-halfButtonW-200,600,buttonW,buttonH),"Credits"))
	{
		Application.LoadLevel("credits");
	}
}