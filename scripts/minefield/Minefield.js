// Copyright (c) 2021 Curtis Reynolds
'use strict';

import FieldGenerator from "./FieldGenerator.js";
export default class Minefield{

    constructor(size = 10, mines = 10, muted){

        //grab board size and mine count
        this.size = size;
        this.mineCount = mines;
        this.totalMines = this.mineCount;

        //The field of squares
        this.field = []; // turn this into a 2d array of squares

        //How many mines are flagged and covered
        this.minesFlagged;
        this.tilesCovered;

        //Timer time and if it's paused
        this.time = 0;
        this.paused = false;
        //If it's the first tile clicked, used for preventing hitting a mine on first move
        this.firstClick = true;
        //If audio is musted
        this.muted = muted;

        //All objects
        this.boardGenerator = new FieldGenerator(size, mines);
        this.rightClickSound = new buzz.sound("./Audio/zapsplat_multimedia_button_press_plastic_click_002_36869.mp3");
        this.clickSound = new buzz.sound("./Audio/zapsplat_multimedia_button_press_plastic_click_003_36870.mp3");
        this.explosionSound = new buzz.sound("./Audio/zapsplat_explosions_punchy_explosion_with_short_tail_006_62170.mp3");

        //Starts the game and resets field
        this.ResetField();
    }

    //Controls the timer logic. Stops on pause/game over. 
    Timer(){
        let timer = window.setInterval( () =>{
            if(!this.gameOver && !this.paused){
                this.time++;
                document.querySelector("#timer")
                    .innerHTML = this.time;
            }else{
                //window.clearInterval(timer);
            }
        }, 1000);
        
    }

    //Resets all variables for new game
    ResetField(){
        //reset mine count
        this.mineCount = this.totalMines;
        //reset timer
        this.time = 0;
        //generate new field
        this.field = this.boardGenerator.GenerateBoard(this.size,this.mineCount);
        //update click handlers on new field
        this.updateCellHandlers();
        //set game over to be false
        this.gameOver = false;
        //enable first click
        this.firstClick = true;
        //Set bomb count in top right
        document.querySelector("#bomb-count")
            .innerHTML = this.mineCount;
    }

    //Update cell handlers for all squares after generation
    updateCellHandlers(){
        //Apply click handlers on all squares
        document.querySelectorAll(".square")
            .forEach(element =>{
                //Adds left click event handler
                element.addEventListener('click', event =>{
                        //If the game is not over or the tile is flagged click.
                        if(event.button === 0 && !this.gameOver && !this.field[element.dataset.rows][element.dataset.collums].ReturnFlag()){
                            element.classList.add("grid-clicked"); 
                            //Checks for a mine and loses the game if there is. Unless its first click.
                            if(this.field[element.dataset.rows][element.dataset.collums].ReturnMine()){
                                if(this.firstClick){
                                    //Places a new mine on the board in a location other than where the player clicked
                                    this.boardGenerator.placeNewMine();
                                    //Remove mine from square and recalculate grid adjacency
                                    this.field[element.dataset.rows][element.dataset.collums].hasMine = false;
                                    this.boardGenerator.RecalculateGrid();
                                    this.CheckAdjacent(element.dataset.rows, element.dataset.collums, element);
                                    //Can no longer trigger this again
                                    this.firstClick = false;
                                    return;
                                }
                                //Plays audio
                                if(!this.muted){
                                    this.explosionSound.play();
                                }
                                //Set game to loss condition.
                                this.gameOver = true;
                                this.SetLossScore();
                                element.classList.add("grid-with-mine"); 
                                //Reveals all mines
                                this.RevealMines(element.dataset.rows,element.dataset.collums)
                                return;
                            }
                            //Sets first click to false when no mine present
                            if(this.firstClick){
                                this.firstClick = false;
                            }
                            //plays audio
                            if(!this.muted){
                                this.clickSound.play();
                            }
                            //Checks adjacency and sets image for square
                            this.CheckAdjacent(element.dataset.rows, element.dataset.collums, element);
                        }
                })
                //Adds right click event handler. Intercepts contextmenu event to apply flaga
                element.addEventListener('contextmenu', event =>{
                    if(event.button === 2 && !this.gameOver){
                        //plays audio
                        if(!this.muted){
                            this.rightClickSound.play();
                        }
                        //Trigger to either remove or set flag
                        this.SetFlag(element.dataset.rows, element.dataset.collums);

                    }
                    //intercept of default context menu popup
                    event.preventDefault();
            });
        })
    }
    
    //Checks to see how many adjacent mines at a square and sents the background image acordingly
    CheckAdjacent(row, col){
        const id = `square-${row}-${col}`;
        //Adds style
        document.querySelector(`#${id}`).classList.add("grid-with-number");
        //if flagged returns
        if(this.field[row][col].ReturnFlag()){
            return
        }
        //Gets number and sets it
        switch(this.field[row][col].returnAdjacent()){
            case 0:
                if(!this.field[row][col].ReturnUncovered()){
                    this.UncoverAdjacentEmpty(row,col);
                }
                break;
            case 1:
                this.field[row][col].Uncover();
                document.querySelector(`#${id}`).classList.add("one"); 
                break;
            case 2:
                this.field[row][col].Uncover();
                document.querySelector(`#${id}`).classList.add("two"); 
                break;
            case 3:
                this.field[row][col].Uncover();
                document.querySelector(`#${id}`).classList.add("three"); 
                break;
            case 4:
                this.field[row][col].Uncover();
                document.querySelector(`#${id}`).classList.add("four"); 
                break;
            case 5:
                this.field[row][col].Uncover();
                document.querySelector(`#${id}`).classList.add("five"); 
                break;
            case 6:
                this.field[row][col].Uncover();
                document.querySelector(`#${id}`).classList.add("six"); 
                break;
            case 7:
                this.field[row][col].Uncover();
                document.querySelector(`#${id}`).classList.add("seven"); 
                break;
            case 8:
                this.field[row][col].Uncover();
                document.querySelector(`#${id}`).classList.add("eight"); 
                break;
        }
        //check to see if all mines are flagged and tiles are revealed
        this.CheckForWin();
    }

    //Removes clear tiles
    UncoverAdjacentEmpty(row, col){
        //if not flagged and uncovered continues
        if(!this.field[row][col].ReturnUncovered() && !this.field[row][col].ReturnFlag()){

            //Sets field as uncovered
            this.field[row][col].Uncover();

            //Gets field and displays it.
            const id = `square-${row}-${col}`;
            let object = document.querySelector(`#${id}`);
            object.classList.add("grid-with-number");
            object.classList.add("grid-clicked");
            object.classList.add("empty");
    
            //Checks cardinal directions and recursivly loops until all clear tiles are revealed
            //Check cell on left
            if(col != 0)
            {
                //continues recursive loop with cell to the left
                this.CheckAdjacent(row,col-1);
            }
            //Check cell on right
            if(col != this.size -1)
            {
                this.CheckAdjacent(row,parseInt(col)+1);
            }
            //Check cell on top
            if(row != 0)
            {
                this.CheckAdjacent(row-1,col);    
            }
            //Check cell on bottom
            if(row != this.size -1)
            {
                this.CheckAdjacent(parseInt(row)+1,col);    
            }
        
        }
    }

    //Loops through field and reveals all mines when lost
    RevealMines(row, col){
        for (let i = 0; i < this.size; i++){
            for(let j = 0; j < this.size; j++){
               if(this.field[i][j].ReturnMine()){
                const id = `square-${i}-${j}`;
                //If the mine is flagged show flagged mine art
                   if(this.field[i][j].ReturnFlag()){
                    document.querySelector(`#${id}`).classList.remove("grid-right-clicked");
                    document.querySelector(`#${id}`).classList.add("grid-with-flagged_mine");
                    }
                //Just display nromal mine art
                document.querySelector(`#${id}`).classList.add("grid-clicked");
                document.querySelector(`#${id}`).classList.add("grid-with-mine");   
               }
            }
        }
    }

    //Set or remove flag depending on state
    SetFlag(row, col){
        const id = `square-${row}-${col}`;
        //Checks if flag is uncovered because you can't flag revealed tiles
        if(!this.field[row][col].ReturnUncovered()){
            //if not flagged sets flag and decreases overall flag count then check for a win
            if(!this.field[row][col].ReturnFlag()){
                    document.querySelector(`#${id}`).classList.add("grid-right-clicked");
                    this.mineCount -=1;
                    document.querySelector("#bomb-count").innerHTML = (this.mineCount);
                    this.field[row][col].SetFlag(true);
                    this.CheckForWin();
                return;
            }
            //if it is flagged remove the flag and increase the flag count then check for a win
            document.querySelector(`#${id}`).classList.remove("grid-right-clicked");
            this.mineCount +=1;
            document.querySelector("#bomb-count").innerHTML = (this.mineCount);
            this.field[row][col].SetFlag(false);
            this.CheckForWin();
        }
    }

    //Checks to see if all mines are flagged and if all tiles are revealed
    CheckForWin(){
        this.minesFlagged = 0;
        this.tilesCovered = 0;

        if(this.mineCount == 0){
            for (let i = 0; i < this.size; i++){
                for(let j = 0; j < this.size; j++){
                    //If square is flagged and has a mine increase mines-flagged count
                    if(this.field[i][j].ReturnMine() && this.field[i][j].ReturnFlag()){
                       this.minesFlagged += 1;
                    }
                    //if not uncovered increase tiles covered count
                    if(!this.field[i][j].ReturnUncovered()){
                        this.tilesCovered += 1;
                        console.log(this.tilesCovered);
                    }
                }
            }
        }
        //if all of the mines are flagged and no non-mine tiles are covered you win the game
        if(this.minesFlagged == this.totalMines && this.tilesCovered == this.totalMines){
            this.SetWinScore();
            this.gameOver = true;
        }
    }

    //Sets top banner to show you win and trigger game end and show quit button
    SetWinScore(){
        document.querySelector("#end-game")
            .innerHTML = "You won!";       
        document.querySelector("#quit-button")
            .classList.remove("hidden");           
    }

    //Sets top banner to show you lost and trigger game end and show quit button
    SetLossScore(){
        document.querySelector("#end-game")
            .innerHTML = "You lost";
        document.querySelector("#quit-button")
            .classList.remove("hidden");  
    }
}