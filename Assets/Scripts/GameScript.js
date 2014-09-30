#pragma strict

import System.Collections.Generic;

var cols:int =4;
var rows:int = 4;
var totalCards:int = 16;
var matchesNeededToWin:int= totalCards *0.5;
var matchesMade:int = 0;
var cardW:int=100;
var aCards:List.<Card>;
var aGrid:Card[,];
var aCardsFlipped:List.<Card>;
var playerCanClick:boolean;
var playerHasWon:boolean = false;

var customSkin:GUISkin; 
function Start () {
	playerCanClick = true;
	aCards = new List.<Card>();
	aGrid = new Card[rows,cols];	
	aCardsFlipped = new List.<Card>();
	BuildDeck();
	for(var i:int=0; i<rows;++i)
	{
		for(var j:int=0; j<cols; ++j){
			var someNum:int = Random.Range(0,aCards.Count);
			aGrid[i,j] = aCards[someNum];
			aCards.RemoveAt(someNum);
		}
	}
}

class Card extends System.Object 
{
	var isFaceUp:boolean = false;
	var isMatched:boolean = false;
	var img:String;
	var id:int;
	
	function Card(img:String,id:int)
	{
		this.img = img;
		this.id = id;
	}
}

function OnGUI () 
{	
	GUI.skin = customSkin;	
	GUILayout.BeginArea(Rect(0,0,Screen.width,Screen.height));	
	if(playerHasWon)
		BuildWinPrompt();
	BuildGrid();
	GUILayout.EndArea();
	//print("building grid!!");
}

function BuildDeck()
{
	var totalRobots:int = 4;
	var card:Card;
	var id:int =0;	
	for(var i:int=0; i<totalRobots; ++i){
		var aRobotParts:List.<String> = new List.<String>();
		aRobotParts.Add("Head");
		aRobotParts.Add("Arm");
		aRobotParts.Add("Leg");
		for(var j:int=0; j<2;++j){
			var someNum:int = Random.Range(0, aRobotParts.Count);
			var theMissingPart:String = aRobotParts[someNum];
			aRobotParts.RemoveAt(someNum);
			
			card = new Card("robot" + (i+1) + "Missing" + theMissingPart,id);
			aCards.Add(card);
			
			
			card = new Card("robot"+ (i+1)+ theMissingPart,id);
			aCards.Add(card);	
			++id;
		}
	}
}

function BuildGrid()
{
	GUILayout.BeginVertical();
	GUILayout.FlexibleSpace();
	for(var i:int=0; i<rows;++i)
	{
		GUILayout.BeginHorizontal();
		GUILayout.FlexibleSpace();
		for(var j:int=0; j<cols;++j){
			var card:Card = aGrid[i,j];
			var img:String;
			if(card.isMatched){
				img = "blank";
			}
			else{
				if(card.isFaceUp)
				img = card.img;
			else
				img = "wrench";			
			}
			GUI.enabled = !card.isMatched;
			
			if(GUILayout.Button(Resources.Load(img),GUILayout.Width(cardW))){
				if(playerCanClick){
					FlipCardFaceUp(card);
					//Debug.Log(img);
				}				
			}		
			GUI.enabled = true;
		}
		GUILayout.FlexibleSpace();
		GUILayout.EndHorizontal();
	}
	GUILayout.FlexibleSpace();
	GUILayout.EndVertical();
}

function FlipCardFaceUp(card:Card){
	card.isFaceUp = true;
	if(aCardsFlipped.IndexOf(card) <0)
		aCardsFlipped.Add(card);
	
	if(aCardsFlipped.Count == 2){
		playerCanClick = false;
		
		yield WaitForSeconds(1);
		
		if(aCardsFlipped[0].id == aCardsFlipped[1].id){
			aCardsFlipped[0].isMatched = true;
			aCardsFlipped[1].isMatched = true;
			
			matchesMade++;
			if(matchesMade >= matchesNeededToWin)
				playerHasWon = true;
			
		}
		else{
			aCardsFlipped[0].isFaceUp = false;
			aCardsFlipped[1].isFaceUp = false;		
		}				
		aCardsFlipped = new List.<Card>();
		playerCanClick = true;
		
	}	
}

function BuildWinPrompt(){
	var winPromptW:int = 120;
	var winPromptH:int = 90;
	
	var halfScreenW:float = Screen.width/2;
	var halfScreenH:float = Screen.height/2;
	
	var halfPromptW:int = winPromptW/2;
	var halfPromptH:int = winPromptH/2;
	
	GUI.BeginGroup(Rect(halfScreenW-halfPromptW,halfScreenH-halfPromptH,winPromptW,winPromptH));
	GUI.Box(Rect(0,0,winPromptW,winPromptH), " A Winner is YOU!!");
	
	var buttonW:int = 80;
	var buttonH:int = 20;
	
	if(GUI.Button(Rect(halfPromptW-(buttonW/2),halfPromptH-(buttonH/2),buttonW,buttonH),"Play Again"))
	{
		Application.LoadLevel("Title");
	}	
	GUI.EndGroup();	
}