#pragma strict
var clockIsPaused : boolean = false;
var starTime : float;
var timeRemaining : float;
var percent:float;
var clockBG:Texture2D;
var clockFG:Texture2D;
var clockFGMaxWidth:float;
var rightSide:Texture2D;
var leftSide:Texture2D;
var back:Texture2D;
var blocker:Texture2D;
var shiny:Texture2D;
var finished:Texture2D;

function Awake () {
	//starTime = Time.time + 120.0;
	starTime = Time.time + 5.0; // test time
	timeRemaining = starTime - Time.time;
	clockFGMaxWidth = clockFG.width;
}

function Update () {
	if(!clockIsPaused)
		//paused DoCountdown();
		DoCountdown();
}

function OnGUI(){
	var newBarWidth:float = (percent/100) * clockFGMaxWidth;
	var isPastHalfway:boolean = percent <50;
	var clockRect:Rect = Rect(0, 0, 128, 128);
	var rot:float = (percent/100) *360;
	//Debug.Log(rot);
	var centerPoint:Vector2 = Vector2(64,64);
	var startMatrix:Matrix4x4 = GUI.matrix;	
	GUI.DrawTexture(clockRect, back, ScaleMode.StretchToFill, true, 0);	
	if(isPastHalfway){
		GUIUtility.RotateAroundPivot(-rot-180,centerPoint);
		GUI.DrawTexture(clockRect,leftSide,ScaleMode.StretchToFill,true,0);
		GUI.matrix = startMatrix;
		GUI.DrawTexture(clockRect,blocker,ScaleMode.StretchToFill,true,0);				
	} else {
		GUIUtility.RotateAroundPivot(-rot,centerPoint);
		GUI.DrawTexture(clockRect,rightSide,ScaleMode.StretchToFill,true,0);
		GUI.matrix = startMatrix;
		GUI.DrawTexture(clockRect,leftSide,ScaleMode.StretchToFill,true,0);
	}
	if(percent <0){
		GUI.DrawTexture(clockRect, finished, ScaleMode.StretchToFill, true, 0);		
	}
	GUI.DrawTexture(clockRect,shiny,ScaleMode.StretchToFill,true,0);
	//Debug.Log(newBarWidth);
	var gap:int = 20;
	GUI.BeginGroup (new Rect(Screen.width - clockBG.width - gap,gap,clockBG.width,clockBG.height));
	GUI.DrawTexture (Rect(0,0,clockBG.width,clockBG.height),clockBG);
		GUI.BeginGroup(new Rect(5,6,newBarWidth,clockFG.height));
		GUI.DrawTexture(Rect(0,0,clockFG.width,clockFG.height),clockFG);
		GUI.EndGroup();
	GUI.EndGroup();
}

function DoCountdown(){
	timeRemaining = starTime - Time.time;
	percent = timeRemaining / starTime *100;
	ShowTime();
	if(timeRemaining < 0)
	{
		timeRemaining = 0;
		
		clockIsPaused = true;
		TimeIsUp();		
	}
	//Debug.Log("time remaining = "+timeRemaining);

}

function PauseClock(){
	clockIsPaused = true;
}

function UnpauseClock(){
	clockIsPaused = false;
}

function ShowTime(){
	var minutes : int;
	var seconds : int;
	var timeStr : String;
	
	minutes = timeRemaining /60;
	seconds = timeRemaining % 60;
	timeStr = minutes.ToString() +":" + seconds.ToString();	
	//Debug.Log("time str "+ timeStr); 
	
	guiText.text = timeStr;

}

function TimeIsUp(){
	Debug.Log("time is up!!");

}